# 🛍️ OLX IITG - IITG Marketplace

**OLX IITG** is a campus-centric buy-and-sell platform designed for students at IIT Guwahati. It enables users to post ads, browse second-hand products, and connect with peers—all within a secure, student-only environment.

---

## 🚀 Features

- 📦 Post and manage product listings
- 🖼️ Upload product images and set categories
- 🔍 Browse, search, and filter products
- 🔐 Firebase email-based authentication
- 👤 View your posted items in a dashboard
- 🧼 Clean and responsive UI (Tailwind + Material UI)

---

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS, Material UI
- **Routing**: React Router
- **Authentication**: Firebase Auth (Email/Password)
- **Storage**: Firebase Firestore

---

## Folder Structure
olx-iitg/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── LoginScreen.js
│ │ │ └── SignupScreen.js
│ │ ├── ProductCard.js
│ │ ├── ProductList.js
│ │ ├── Header.js
│ │ ├── MyProducts.js
│ │ └── DeleteConfirmationModal.js
│ ├── pages/
│ │ ├── SellProductForm.js
│ │ ├── ProductDetailPage.js
│ │ └── ProfileScreen.js
│ ├── firebase/
│ │ └── FirebaseContext.js
│ ├── App.js
│ ├── index.js
│ └── index.css
├── screenshots/
│ ├── signin.png
│ ├── home.png
│ └── sellpage.png
├── .env
├── .gitignore
├── README.md
├── package.json
└── package-lock.json


## 📦 Installation

Clone the repository and run locally:

```bash
git clone https://github.com/your-username/olx-iitg.git
cd olx-iitg
npm install
npm start
