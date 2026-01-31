const API_URL = "https://clearflag.onrender.com/api";

let fullName = "";
let bankName = "";

function showView(id) {
  document.querySelectorAll(".view").forEach(v =>
    v.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

/* IDENTIFICATION */
function goToUpload() {
  fullName = fullName || document.getElementById("fullName").value.trim();
  bankName = bankName || document.getElementById("bankName").value.trim();

  if (!fullName || !bankName) {
    alert("Please enter full name and bank name.");
    return;
  }

  document.getElementById("userInfo").innerText =
    `${fullName} — ${bankName}`;

  showView("view-upload");
}

/* UPLOAD */
function uploadCSV() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please select a CSV file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      return res.json();
    })
    .then(() => loadResults())
    .catch(err => {
      console.error(err);
      alert("Unable to upload file. Please try again later.");
    });
}

function backToIdentity() {
  showView("view-identity");
}

function backToUpload() {
  showView("view-upload");
}

/* RESULTS */
function loadResults() {
  document.getElementById("userInfoResults").innerText =
    `${fullName} — ${bankName}`;

  fetch(`${API_URL}/transactions`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load transactions");
      }
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      const tbody = document.querySelector("#transactionsTable tbody");
      tbody.innerHTML = "";

      data.forEach(tx => {
        const row = document.createElement("tr");
        if (tx.flagged === "YES") row.classList.add("flagged");

        row.innerHTML = `
          <td>${tx.transaction_id}</td>
          <td>$${tx.amount}</td>
          <td>${tx.location}</td>
          <td>${tx.country}</td>
          <td>${tx.time}</td>
          <td>${tx.flagged}</td>
          <td>
            ${tx.flagged === "YES"
              ? `<button class="primary-btn" onclick="explain(${tx.transaction_id})">Explain</button>`
              : "-"}
          </td>
        `;
        tbody.appendChild(row);
      });

      showView("view-results");
    })
    .catch(err => {
      console.error(err);
      alert("Unable to load transaction results.");
    });
}

/* EXPLANATION */
function explain(id) {
  fetch(`${API_URL}/explain/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to load explanation");
      }
      return res.json();
    })
    .then(data => {
      const text = `
This transaction was identified as unusual based on your banking activity.

Reasons:
• ${data.reasons.join("\n• ")}

For your protection, please contact ${bankName} support to confirm whether this transaction was authorized by you.
      `;

      document.getElementById("modalText").innerText = text;
      document.getElementById("modal").style.display = "block";
    })
    .catch(err => {
      console.error(err);
      alert("Unable to load explanation.");
    });
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* START */
showView("view-identity");