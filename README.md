CRM System - Component Guide
🏗️ Architecture Overview
Simple 3-layer architecture: Frontend → Backend APIs → Database

📁 Project Structure
Entities (Database Tables)
BaseEntity - Common fields (id, timestamps) for all tables
Customer - Customer information (name, email, phone, address)
Company - Company details (name, address, phone)
Offer - Business offers linking customers and companies
Payment - Payment records for offers
Products - Product catalog (name, category, brand, price)X
Category - Product categories
Brand - Product brands
City/Country/District - Geographic data dd
Repositories (Database Access)
CustomerRepository - Database operations for customers
OfferRepository - Database operations for offers
PaymentRepository - Database operations for payments
ProductRepository - Database operations for products
CompanyRepository - Database operations for companies
CategoryRepository - Database operations for categories
Services (Business Logic)
CustomerService - Customer business rules
CustomerServiceImpl - Customer service implementation
OfferService - Offer business rules
OfferServiceImpl - Offer service implementation
Controllers (API Endpoints)
HomeController - Serves frontend and root endpoints
CustomerController - Customer API endpoints
OfferController - Offer API endpoints
PaymentController - Payment API endpoints
ProductController - Product API endpoints
CompanyController - Company API endpoints
CategoryController - Category API endpoints
Configuration
WebConfig - Web and CORS configuration
GlobalExceptionHandler - Error handling for all APIs
🔗 API Endpoints
Customers (/api/customers)
GET / - Get all customers
GET /{id} - Get customer by ID
GET /email/{email} - Search by email
GET /phone/{phone} - Search by phone
POST / - Create new customer
PUT /{id} - Update customer
DELETE /{id} - Delete customer
Offers (/api/offers)
GET / - Get all offers
GET /{id} - Get offer by ID
GET /customer/{customerId} - Get offers by customer
POST / - Create new offer
PUT /{id} - Update offer
DELETE /{id} - Delete offer
Payments (/api/payments)
GET / - Get all payments
GET /{id} - Get payment by ID
GET /offer/{offerId} - Get payments by offer
POST / - Create new payment
PUT /{id} - Update payment
DELETE /{id} - Delete payment
Products (/api/products)
GET / - Get all products
GET /{id} - Get product by ID
GET /category/{category} - Get products by category
POST / - Create new product
PUT /{id} - Update product
DELETE /{id} - Delete product
Companies (/api/companies)
GET / - Get all companies
GET /{id} - Get company by ID
POST / - Create new company
PUT /{id} - Update company
DELETE /{id} - Delete company
Categories (/api/categories)
GET / - Get all categories
POST / - Create new category
🗄️ Database Relationships
Customer (1) ←→ (Many) Offers ←→ (Many) Payments
Company (1) ←→ (Many) Offers
Products ←→ Categories (by category name)
Country ←→ Cities ←→ Districts (geographic hierarchy)
🖥️ Frontend Components
HTML Structure (index.html)
Tabbed Interface - Switch between different modules
Forms - Input forms for each entity
Tables - Display data in organized tables
Search - Customer search by email/phone
JavaScript Functions (app.js)
API Calls - Fetch, POST, PUT, DELETE requests
Form Handling - Collect and validate form data
Table Updates - Dynamic table population
Tab Management - Switch between modules
Error Handling - Display success/error messages
⚙️ Configuration Files
Database (application-dev.properties)
MySQL Connection - Database URL, username, password
JPA Settings - Hibernate dialect, DDL auto-update
Connection Pool - HikariCP configuration
Application (application.properties)
Profile Settings - Active profile (dev)
Static Resources - Frontend file serving
JPA Configuration - Database settings
Build (pom.xml)
Dependencies - Spring Boot, MySQL, Validation
Java Version - Java 17
Maven Plugins - Compiler configuration
🚀 How It Works
User opens browser → Frontend loads (index.html)
User fills form → JavaScript captures data
JavaScript makes API call → Controller receives request
Controller calls Service → Business logic executed
Service calls Repository → Database operation performed
Data flows back → Response sent to frontend
Frontend updates → User sees result
🛠️ Technologies Used
Backend: Spring Boot, JPA/Hibernate, MySQL
Frontend: HTML, CSS, JavaScript
Database: MySQL
Build Tool: Maven
Java Version: 17
📋 Quick Start
Start MySQL service
Run application: mvn spring-boot:run
Open browser: http://localhost:8080
Use the CRM: Click tabs, fill forms, manage data
🔧 Key Features
✅ Full CRUD Operations - Create, Read, Update, Delete
✅ Search Functionality - Find customers by email/phone
✅ Relationship Management - Link customers, offers, payments
✅ Clean UI - Tabbed interface with forms and tables
✅ Error Handling - Proper error messages and validation
✅ Auto-generated IDs - Database handles primary keys
✅ Responsive Design - Works on different screen sizes
This CRM system provides a complete customer relationship management solution with a clean, simple architecture that's easy to understand and extend.
