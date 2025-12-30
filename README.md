# ⌚ Tick-Tock Store

> A modern luxury watch e-commerce platform built with **Vue 3** + **Vite** + **Firebase**

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js) ![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)

## ✨ What's Inside

🛍️ **Browse & Shop** - Search, filter, and sort luxury watches with real-time updates  
🎨 **Beautiful UI** - Dark theme with smooth animations and video hero section  
🔐 **Secure Auth** - Firebase authentication with role-based access control  
⚡ **Admin Panel** - Full product management (CRUD) with image uploads  
📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

## 🚀 Quick Start

```sh
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

**Requirements**: Node.js (v20.19+)

## 🛠️ Built With

- **Frontend**: Vue 3 (Composition API) · Vite · Pinia · Vue Router
- **UI/Styling**: Bootstrap 5 · Sass · Bootstrap Icons
- **Backend**: Firebase (Auth & Firestore) · Axios API calls
- **Media**: Cloudinary (Image hosting)
- **Extras**: SweetAlert2 · JWT Authentication

## 📂 Project Structure

```
src/
├── views/          # Pages (Home, Products, Auth)
├── components/     # Reusable components (Header, ProductCard)
├── store/          # Pinia state (auth, theme)
├── router/         # Vue Router config
├── apiEndpoints/   # API calls & endpoints
└── utility/        # Helpers (Firebase, Cloudinary, Alerts)
```

## 🔑 Key Features

**For Users**
- Smart search & category filtering
- Sort by price, name, or bestsellers
- Detailed product views with pricing
- Secure sign up/sign in

**For Admins**
- Create, edit, delete products
- Upload images to Cloudinary
- Manage inventory with search & pagination
- Protected admin routes

## 🌐 API Integration

The application connects to a backend API hosted at:
```
https://watch-store-3xeh.onrender.com/api
```

**Endpoints**: Login · Register · Products (CRUD)

## 💡 Recommended Setup

**IDE**: [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension

**Note**: Configure your Firebase & Cloudinary credentials in `src/utility/` before deployment.

## 📄 License

Private project - Not for public distribution

---

Built with ❤️ using modern Vue 3 ecosystem
