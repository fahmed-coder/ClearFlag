from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import sqlite3

app = Flask(__name__)
CORS(app)

DB_NAME = "database.db"

def get_db():
    return sqlite3.connect(DB_NAME)

# ---------------- UPLOAD CSV ----------------
@app.route("/api/upload", methods=["POST"])
def upload_csv():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    df = pd.read_csv(file)

    # Flag logic
    df["flagged"] = df.apply(
        lambda x: "YES" if (x["amount"] >= 2000 or x["country"] != "Canada") else "NO",
        axis=1
    )

    db = get_db()
    df.to_sql("transactions", db, if_exists="replace", index=False)
    db.close()

    return jsonify({"status": "success"})

# ---------------- GET TRANSACTIONS ----------------
@app.route("/api/transactions", methods=["GET"])
def get_transactions():
    db = get_db()
    df = pd.read_sql("SELECT * FROM transactions", db)
    db.close()

    return jsonify(df.to_dict(orient="records"))

# ---------------- EXPLAIN TRANSACTION ----------------
@app.route("/api/explain/<int:tid>", methods=["GET"])
def explain_transaction(tid):
    db = get_db()
    df = pd.read_sql("SELECT * FROM transactions", db)
    db.close()

    tx = df[df["transaction_id"] == tid]

    if tx.empty:
        return jsonify({"error": "Transaction not found"}), 404

    tx = tx.iloc[0]

    if tx["flagged"] == "NO":
        return jsonify({"reasons": []})

    reasons = []

    if tx["amount"] >= 2000:
        reasons.append("Transaction amount is significantly higher than normal")

    if tx["country"] != "Canada":
        reasons.append("Transaction occurred outside Canada")

    return jsonify({
        "transaction_id": int(tx["transaction_id"]),
        "reasons": reasons
    })

if __name__ == "__main__":
    app.run(debug=True)