# TradeGrid: Enterprise-Grade E-Commerce Platform

**Developers Hub Corporation** | **Submitted By:** Rabia Abid

## 📖 Project Overview
TradeGrid is a scalable, decoupled full-stack e-commerce web application designed with a microservices-inspired architecture. It separates the client-side presentation layer from the backend business logic, ensuring high performance, maintainability, and seamless scalability. The system handles end-to-end e-commerce operations, from secure user authentication to dynamic product filtering and persistent cart management, all while maintaining low-latency database queries and optimized API payloads.

## 🚀 Live Deployments
* **Frontend Client:** https://ecommerce-fullstack-design-dun.vercel.app/
* **Backend REST API:** https://ecommerce-backend-vlna.onrender.com 

## ✨ Core Features Implemented

### 1. User Authentication & Security
* Secure login and registration flows.
* Protected API endpoints with strict Cross-Origin Resource Sharing (CORS) configurations to prevent unauthorized access.

### 2. Dynamic Product & Inventory Management
* Real-time product rendering fetched via RESTful APIs.
* Dynamic category filtering (e.g., "Interior", "Electronics") handled at the API level for faster client-side rendering.
* Admin capability to seamlessly insert and manage new product records and image mappings.

### 3. Client-Side State Management
* Persistent shopping cart functionality utilizing browser local storage, ensuring users do not lose their selected items upon page refresh or session expiry.
* Responsive, mobile-first grid layouts for optimal user experience across all devices.

### 4. Infrastructure & DevOps Optimizations
* **Database Connection Pooling:** Implemented SQLAlchemy with `pool_size=10` and `max_overflow=20` to efficiently manage concurrent database requests and prevent connection timeouts.
* **Payload Compression:** Integrated FastAPI GZip Middleware to compress JSON responses, reducing network bandwidth usage by up to 70% and drastically improving client load times.
* **Automated Keep-Alive Architecture:** Engineered a cron-job polling mechanism targeting the `/products/` endpoint to bypass cloud free-tier limitations, preventing backend server cold starts and database power-offs.

## 💻 Technology Stack

**Frontend Architecture:**
* **Framework:** React.js (Bootstrapped with Vite for instant server start and HMR)
* **Routing:** React Router DOM (v6)
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

**Backend Architecture:**
* **Framework:** FastAPI (Python)
* **ASGI Server:** Uvicorn
* **Database ORM:** SQLAlchemy
* **Deployment:** Render

**Database Layer:**
* **Engine:** MySQL (Hosted via Aiven Cloud)
* **Security:** Enforced SSL (`ssl-mode=REQUIRED`) for all database transactions.

## 🛠️ Local Setup & Execution Guide

### 1. Database Configuration
To run this application locally with your own MySQL instance:
1. Ensure XAMPP/MySQL service is running on `127.0.0.1`.
2. Create a `.env` file in the root of the backend directory.
3. Configure your local database connection string: 
   `DATABASE_URL=mysql+pymysql://root:@localhost:3306/ecommerce`

### 2. Backend Initialization
Navigate to the backend directory and execute:
```bash
# Initialize and activate the virtual environment
python -m venv .venv
source .venv/Scripts/activate  # Windows users

# Install dependencies
pip install -r requirements.txt

# Boot the ASGI development server
uvicorn main:app --reload