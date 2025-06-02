# LuminaGlow 

**A global destination for beauty where elegance meets technology.**  
This group project showcases a full-stack cosmetics website built using **React JSX** and **FastAPI with Python**, allowing users to browse beauty products, add items to their cart, and place orders with a selected payment method.

---

## Features

-  Browse a list of curated beauty products  
-  Add/remove products from the shopping cart  
- Select a payment mode: Cash, Credit Card, Mobile Money  
- Place an order and get a summary of selected items  
- Backend orders stored in a SQLite database  
- CLI tool for viewing and creating orders (admin-level)

---

## Tech Stack

- **Frontend**: React (JSX), Vite, Tailwind CSS  
- **Backend**: FastAPI, Python  
- **Database**: SQLite (via SQLAlchemy ORM)  
- **CLI**: Typer + Rich  
- **Config**: Pipenv + dotenv  
- **Deployment**: Local, Vercel-ready (for frontend)

---

## Folder Structure
LuminaGlow/
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ProductList.jsx
│ │ │ └── Cart.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── vite.config.js
│
├── backend/
│ ├── app/
│ │ ├── db.py
│ │ └── models.py
│ ├── main.py
│ └── .env
│
├── cli.py
├── Pipfile
└── README.md

## 📦 Setup Instructions

# Backend
cd backend
python3 -m venv venv

pipenv install
pipenv run uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev

## License
This project is licensed under the terms described in [MIT LICENSE](./LICENSE).