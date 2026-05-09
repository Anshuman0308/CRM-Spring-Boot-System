# CRM System — Spring Boot

A full-stack **Customer Relationship Management** system built with **Spring Boot 3.3**, **MySQL 8**, and a **Vanilla JS** frontend. Supports customer management, product catalog, payments, company profiles, offer tracking, and professional PDF invoice generation.

---

## Screenshots

> Frontend runs at `http://localhost:8081`

| Module | Description |
|--------|-------------|
| Customers | Add, search by email/phone, view with ID |
| Products | Manage product catalog with pricing |
| Payments | Record payments with customer name |
| Companies | Manage company profiles |
| Invoices | Generate & download PDF invoices |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | Java | 17 |
| Framework | Spring Boot | 3.3.1 |
| ORM | Spring Data JPA / Hibernate | — |
| Database | MySQL | 8+ |
| PDF Generation | iText 7 | 7.2.5 |
| API Docs | SpringDoc OpenAPI (Swagger UI) | 2.5.0 |
| Connection Pool | HikariCP | — |
| Frontend | HTML, CSS, Vanilla JavaScript | — |
| Build Tool | Maven | 3.8+ |

---

## Prerequisites

Make sure the following are installed before running the project:

- **Java 17+** — [Download](https://adoptium.net/)
- **MySQL 8+** — [Download](https://dev.mysql.com/downloads/)
- **Maven 3.8+** — [Download](https://maven.apache.org/download.cgi)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CRM_Spring_Boot.git
cd CRM_Spring_Boot
```

### 2. Configure the Database

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=your_username
spring.datasource.password=your_password
```

> The database `crm_db` is created automatically on first run via `createDatabaseIfNotExist=true`.

### 3. Build & Run

```bash
mvn spring-boot:run
```

### 4. Open the Frontend

```
http://localhost:8081
```

### 5. Swagger API Documentation

```
http://localhost:8081/swagger-ui/index.html
```

---

## Project Structure

```
src/
└── main/
    ├── java/dev/nida/crm/
    │   ├── Application.java              # Entry point
    │   ├── config/
    │   │   └── WebConfig.java            # CORS & static resource config
    │   ├── controller/                   # REST API endpoints
    │   │   ├── CustomerController.java
    │   │   ├── CompanyController.java
    │   │   ├── PaymentController.java
    │   │   ├── ProductController.java
    │   │   ├── CategoryController.java
    │   │   ├── OfferController.java
    │   │   ├── InvoiceController.java    # JSON + PDF endpoints
    │   │   └── HomeController.java
    │   ├── service/                      # Business logic
    │   │   ├── InvoiceService.java       # Assembles invoice DTO
    │   │   ├── PaymentService.java       # Resolves customer name per payment
    │   │   ├── OfferService.java
    │   │   ├── CustomerService.java
    │   │   └── impl/
    │   │       ├── CustomerServiceImpl.java
    │   │       └── OfferServiceImpl.java
    │   ├── entities/                     # JPA entities (DB tables)
    │   │   ├── BaseEntity.java           # Auditing fields (createdDate, etc.)
    │   │   ├── Customer.java
    │   │   ├── Company.java
    │   │   ├── Offer.java                # price, discountPercent fields
    │   │   ├── Payment.java
    │   │   ├── Products.java
    │   │   ├── Category.java
    │   │   ├── Brand.java
    │   │   └── ...
    │   ├── dto/                          # Data Transfer Objects
    │   │   ├── InvoiceResponse.java      # Customer + product + price + discount + total
    │   │   └── PaymentResponse.java      # Payment + resolved customer name
    │   ├── repository/                   # Spring Data JPA repositories
    │   │   ├── CustomerRepository.java
    │   │   ├── OfferRepository.java
    │   │   ├── PaymentRepository.java
    │   │   ├── ProductRepository.java
    │   │   ├── CompanyRepository.java
    │   │   └── CategoryRepository.java
    │   └── exception/
    │       └── GlobalExceptionHandler.java
    └── resources/
        ├── application.properties        # Main config (DB, JPA, HikariCP)
        └── static/
            ├── index.html                # Single-page frontend
            └── app.js                    # All frontend JS logic
```

---

## API Endpoints

### Customers — `/api/customers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all customers |
| GET | `/{id}` | Get customer by ID |
| GET | `/email/{email}` | Search by email |
| GET | `/phone/{phone}` | Search by phone |
| POST | `/` | Create customer |
| PUT | `/{id}` | Update customer |
| DELETE | `/{id}` | Delete customer |

### Payments — `/api/payments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all payments with customer name |
| GET | `/{id}` | Get payment by ID |
| POST | `/` | Create payment |
| PUT | `/{id}` | Update payment |
| DELETE | `/{id}` | Delete payment |

### Invoices — `/api/invoices`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/offer/{offerId}` | Get invoice as JSON |
| GET | `/offer/{offerId}/pdf` | Download invoice as PDF |

### Products — `/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all products |
| GET | `/{id}` | Get product by ID |
| GET | `/category/{category}` | Filter by category |
| POST | `/` | Create product |
| PUT | `/{id}` | Update product |
| DELETE | `/{id}` | Delete product |

### Companies — `/api/companies`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all companies |
| GET | `/{id}` | Get company by ID |
| POST | `/` | Create company |
| PUT | `/{id}` | Update company |
| DELETE | `/{id}` | Delete company |

### Offers — `/api/offers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all offers |
| GET | `/{id}` | Get offer by ID |
| GET | `/customer/{customerId}` | Get offers by customer |
| POST | `/` | Create offer |
| PUT | `/{id}` | Update offer |
| DELETE | `/{id}` | Delete offer |

---

## Invoice Feature

Generates a professional PDF invoice using **iText 7** containing:

- Invoice number in `INV-00001` format
- Customer details (name, email, phone, address)
- Product description, unit price, discount percentage, and total amount
- Clean printable layout with CRM branding

### Invoice Flow

**Option A — Manual Entry:**
1. Go to **Invoices** tab
2. Enter Customer ID and/or Customer Name
3. Fill in Product description, Price, and Discount
4. Click **Generate Invoice**
5. Click **Download PDF** to save

**Option B — Search by Customer:**
1. Click **Search by Email / Phone**
2. Enter customer email or phone number
3. Select an offer from the dropdown
4. Click **Load Offer Data** — auto-fills all fields
5. Click **Generate Invoice** → **Download PDF**

---

## Database Schema

```
Customer  ──< Offer >── Company
                │
              Payment
```

- One **Customer** can have many **Offers**
- One **Offer** belongs to one **Company**
- One **Offer** can have many **Payments**
- **Invoice** is generated from Offer + Customer data

---

## Key Configuration

```properties
# Server
server.port=8081

# Database
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# HikariCP Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.connection-timeout=30000

# JVM (suppress Tomcat native access warning on Java 21+)
# Add to mvn spring-boot:run via pom.xml jvmArguments:
# --enable-native-access=ALL-UNNAMED
```

---

## Author

Developed by **Nida** — CRM Spring Boot Project
