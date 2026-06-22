# Full-Stack E-Commerce Web Application

**DevelopersHub Corporation** |**Submitted By:** Rabia Abid 

## Project Overview
This is a full-stack e-commerce web application featuring a modern, responsive user interface and a robust, optimized backend REST API. It includes product browsing, dynamic filtering by category, cart management via local storage, and secure user authentication.

## Live Deployments
* **Frontend Application:** https://ecommerce-fullstack-design-dun.vercel.app/
* **Backend API:** https://ecommerce-backend-vlna.onrender.com


## Technology Stack
**Frontend:**
* React.js 
* React Router DOM (Client-side routing)
* Tailwind CSS (Responsive utility-first styling)

**Backend:**
* FastAPI (High-performance Python web framework)
* SQLAlchemy (ORM for database interactions)
* MySQL (Hosted securely on Aiven Cloud)
* Uvicorn (ASGI web server)

**Performance Optimizations Implemented:**
* Configured SQLAlchemy Database Connection Pooling (pool_size=10, max_overflow=20) to manage high traffic.
* Implemented GZip Middleware in FastAPI to compress JSON payloads and reduce network latency.
* Configured automated keep-alive requests (cron-jobs) to prevent server cold starts on the free tier.

## Local Setup & Execution Guide

### 1. Database Configuration
The application is currently configured to connect to a cloud-hosted Aiven MySQL database. To run this locally with your own database:
1. Ensure XAMPP/MySQL is running.
2. Create a `.env` file in the backend directory.
3. Add your database URL: `DATABASE_URL=mysql+pymysql://root:@localhost:3306/ecommerce`

### 2. Backend Setup
Navigate to the backend directory and execute the following commands in your terminal:
```bash
# Create and activate a virtual environment
python -m venv .venv
source .venv/Scripts/activate  # For Windows

# Install dependencies
pip install -r requirements.txt

# Run the development server
uvicorn main:app --reload