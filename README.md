# ClearFlag

ClearFlag is a full-stack web application designed to analyze bank transactions and clearly explain why certain transactions may be flagged as unusual.
The goal of the project is not to block transactions, but to provide transparency and human-readable explanations for flagged activity.

This project was built to simulate how backend systems handle structured financial data, apply validation rules, and expose results through a clean API and user interface.

⸻

Why this project exists

While many systems can detect unusual transactions, users are often left wondering why something was flagged. ClearFlag focuses on the explanation layer — helping users understand the reasoning behind flagged transactions using simple, deterministic rules instead of black-box models.

The project emphasizes:

	•	data validation
	•	backend logic
	•	explainability
	•	system flow from input to output

⸻

What the application does:

	1.	A user enters basic identification details (name and bank)
	2.	The user uploads a CSV file containing transaction data
	3.	The backend processes the file and applies rule-based checks (e.g., high amount, international transaction)
	4.	Transactions are stored and marked as flagged or not flagged
	5.	Each flagged transaction can be expanded to view a clear explanation of why it was identified as unusual

⸻

Technology Stack

Frontend:

	•	HTML
	•	CSS
	•	JavaScript
(Deployed using GitHub Pages)

Backend:

	•	Python
	•	Flask (REST API)
	•	SQLite

Deployment:

	•	Backend hosted on Render
	•	Frontend hosted on GitHub Pages

⸻

System Architecture (High Level):

	•	The frontend and backend are fully decoupled
	•	The frontend communicates with the backend via REST endpoints
	•	Uploaded CSV files are processed server-side
	•	Results are returned as structured JSON and rendered dynamically
	•	The database is created automatically when the backend runs

This mirrors how many real-world internal tools are structured.

⸻

Sample CSV Format

ClearFlag expects a CSV file with the following columns:

    transaction_id,  amount,  location,  country,  time,  merchant
    1,               120.50,   Toronto,  Canada,  10:30,   Grocery
    2,               3200.00,  London,    UK,     14:45,  Electronics

Also A sample format is also shown directly in the application interface.

Flagging Logic (Simplified)

A transaction is flagged if:

	•	The transaction amount is greater than or equal to 2000
	•	OR the transaction occurs outside Canada

Each flag produces a specific explanation rather than a generic warning.

⸻

What this project demonstrates:

	•	Working with structured data inputs
	•	Backend validation and rule-based decision logic
	•	REST API design and consumption
	•	Basic database persistence using SQLite
	•	Frontend–backend integration
	•	Deployment of a full-stack application
	•	Writing code that prioritizes clarity and maintainability

⸻

How to run locally:

	1.	Clone the repository
	2.	Install Python dependencies
	3.	Run the Flask server
	4.	Open the frontend in a browser
	5.	Upload a CSV file following the provided format

Detailed steps are intentionally kept simple to reflect how internal tools are typically run.

⸻

Notes:

This project was built as a learning-focused, realistic system, not as a production banking application.
The emphasis is on logic, explainability, and system flow, rather than advanced machine learning or external APIs.

⸻

Author

Created by a Software Engineering student (Faiz Ahmed)as a personal project to demonstrate backend logic, system analysis, and full-stack development skills in a co-op-ready context.
