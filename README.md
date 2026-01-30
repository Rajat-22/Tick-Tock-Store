<div align="center">

# ⌚ Tick-Tock Store

**A premium luxury watch e-commerce platform built with Vue 3**

![Vue 3](https://img.shields.io/badge/Vue.js-3.5.18-4FC08D?style=flat-square&logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-7.0.6-646CFF?style=flat-square&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-7952B3?style=flat-square&logo=bootstrap)
![Pinia](https://img.shields.io/badge/Pinia-3.0.3-FFD859?style=flat-square)

</div>

---

## 📋 Overview

A full-featured e-commerce application for luxury timepieces featuring real-time search, advanced filtering, role-based authentication, and a complete admin dashboard for product management.

---

## ✨ Features

### 👤 User Features
- 🔍 Real-time search across all products
- 🏷️ Filter by category (Analog, Digital, Mechanical, Automatic, Smartwatches)
- 📊 Sort by price/name (ascending/descending)
- 💎 Product detail modals with pricing & descriptions
- 🔐 Secure JWT-based authentication

### 👨‍💼 Admin Features
- ✏️ Full CRUD operations for products
- 📸 Image upload via Cloudinary integration
- 📋 Sortable & searchable product table
- 🔒 Protected routes with role-based access control
- 📄 Pagination for efficient data display

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Core** | Vue 3 (Composition API), Vite 7, Pinia 3 |
| **Routing** | Vue Router 4 with navigation guards |
| **UI** | Bootstrap 5, SCSS, Bootstrap Icons |
| **HTTP** | Axios with JWT authentication |
| **State** | Pinia with persistedstate plugin |
| **Utilities** | SweetAlert2, JWT-decode, Cloudinary |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Requirements**: Node.js `v20.19.0+` or `v22.12.0+`

---

## 📁 Project Structure

```
src/
├── views/
│   ├── auth/           # SignIn, SignUp, AccessDenied, NotFound
│   ├── home/           # Home, ContactUs
│   └── product/        # ProductList (admin), ProductUpdate
├── components/
│   ├── layout/         # Header, Footer, WatchIcon
│   └── product/        # ProductCard, ProductDetail
├── store/
│   ├── authStore.js    # JWT auth state (token, user, isAdmin)
│   └── themeStore.js   # Theme persistence (dark mode)
├── router/
│   └── route.js        # Routes + admin guards
├── apiEndpoints/
│   └── apiEndpoints.js # Axios instance + API calls
├── constants/
│   ├── productConstant.js  # Categories, sort options
│   └── routerName.js       # Centralized route names
├── utility/
│   └── alert.js        # SweetAlert2 helpers
└── assets/styles/
    └── global.scss     # CSS variables, themes, animations
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/login` | User login | - |
| `POST` | `/auth/register` | User registration | - |
| `GET` | `/product` | Fetch all products | - |
| `GET` | `/product/:id` | Get single product | ✅ |
| `POST` | `/product` | Create product | ✅ Admin |
| `PUT` | `/product/update/:id` | Update product | ✅ Admin |
| `DELETE` | `/product/:id` | Delete product | ✅ Admin |

---

### Product Management Flow

1. **Browse**: Home page displays all products with filters
2. **Admin Login**: JWT token stored in Pinia + localStorage
3. **CRUD**: Admin panel at `/product-list` with create/edit/delete
4. **Image Upload**: FormData sent to API, Cloudinary handles storage

---

## 💡 Development Setup

**Recommended IDE**: [VS Code](https://code.visualstudio.com/) with [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

**Disable Vetur** if installed (conflicts with Volar for Vue 3)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit changes
4. Open a Pull Request


---

## 📄 License

This repository is open-source and suitable for learning, portfolio projects, and production-ready extensions.

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author & Maintainer

**Rajat Sharma**
GitHub: [@Rajat-22](https://github.com/Rajat-22)

---

⭐ If you find this project helpful, don’t forget to star the repository!

---

<div align="center">

**Built with ❤️ using Vue 3 + Vite**

</div>
