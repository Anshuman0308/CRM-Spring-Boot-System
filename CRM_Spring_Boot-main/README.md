# CRM System — Spring Boot

A full-stack **Customer Relationship Management** system built with **Spring Boot 3.3**, **PostgreSQL**, and a **Vanilla JS** frontend. Supports customer management, product catalog, payments, company profiles, offer tracking, PDF invoice generation, JWT authentication, caching, and rate limiting.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Language | Java | 17 |
| Framework | Spring Boot | 3.3.1 |
| ORM | Spring Data JPA / Hibernate | — |
| Database | PostgreSQL | 15+ |
| Security | Spring Security + JJWT | 0.12.6 |
| Cache | Spring Cache + Redis (Lettuce) | — |
| Rate Limiting | Bucket4j | 8.10.1 |
| PDF Generation | iText 7 | 7.2.5 |
| API Docs | SpringDoc OpenAPI (Swagger UI) | 2.5.0 |
| Connection Pool | HikariCP | — |
| Frontend | HTML, CSS, Vanilla JavaScript | — |
| Build Tool | Maven | 3.8+ |

---

## Prerequisites

- **Java 17+** — [Download](https://adoptium.net/)
- **PostgreSQL 15+** — [Download](https://www.postgresql.org/download/)
- **Redis 7+** — [Download](https://redis.io/download/) or run via Docker: `docker run -d -p 6379:6379 redis:7`
- **Maven 3.8+** — [Download](https://maven.apache.org/download.cgi)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Anshuman0308/CRM-Spring-Boot-System.git
cd CRM-Spring-Boot-System
```

### 2. Create the Database

```sql
CREATE DATABASE crm_db;
```

### 3. Configure the Database

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/crm_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

Or set environment variables (recommended for production):

```
DATABASE_URL=jdbc:postgresql://localhost:5432/crm_db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
```

### 4. Build & Run

```bash
mvn spring-boot:run
```

### 5. Open the Frontend

```
http://localhost:8081
```

### 6. Swagger API Docs

```
http://localhost:8081/swagger-ui/index.html
```

---

## Authentication

All API endpoints (except `/api/auth/**`) require a JWT Bearer token.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

### Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJ..."
}
```

| Token | Expiry |
|-------|--------|
| Access Token | 15 minutes |
| Refresh Token | 7 days |

The frontend handles login, token storage, and auto-refresh automatically.

---

## Rate Limiting

- **20 requests per minute per IP**
- Exceeding the limit returns `HTTP 429` with:
```json
{ "error": "Too many requests. Limit: 20/min." }
```

---

## Project Structure

```
src/
└── main/
    ├── java/dev/nida/crm/
    │   ├── Application.java
    │   ├── config/
    │   │   └── WebConfig.java
    │   ├── controller/
    │   │   ├── AuthController.java        # Login + refresh endpoints
    │   │   ├── CustomerController.java
    │   │   ├── CompanyController.java
    │   │   ├── PaymentController.java
    │   │   ├── ProductController.java
    │   │   ├── CategoryController.java
    │   │   ├── OfferController.java
    │   │   ├── InvoiceController.java
    │   │   ├── DashboardController.java   # Cached stats
    │   │   └── HomeController.java
    │   ├── security/
    │   │   ├── JwtUtil.java               # Token generation & validation
    │   │   ├── JwtFilter.java             # Bearer token filter
    │   │   ├── RateLimitFilter.java       # Bucket4j per-IP limiter
    │   │   └── SecurityConfig.java        # Security chain config
    │   ├── service/
    │   │   ├── InvoiceService.java
    │   │   ├── PaymentService.java
    │   │   ├── OfferService.java
    │   │   ├── CustomerService.java
    │   │   └── impl/
    │   │       ├── CustomerServiceImpl.java   # @Cacheable / @CacheEvict
    │   │       └── OfferServiceImpl.java
    │   ├── entities/
    │   │   ├── BaseEntity.java
    │   │   ├── Customer.java
    │   │   ├── Company.java
    │   │   ├── Offer.java
    │   │   ├── Payment.java
    │   │   ├── Products.java
    │   │   ├── Category.java
    │   │   └── Brand.java
    │   ├── dto/
    │   │   ├── InvoiceResponse.java
    │   │   └── PaymentResponse.java
    │   ├── repository/
    │   │   ├── CustomerRepository.java
    │   │   ├── OfferRepository.java
    │   │   ├── PaymentRepository.java
    │   │   ├── ProductRepository.java
    │   │   ├── CompanyRepository.java
    │   │   └── CategoryRepository.java
    │   └── exception/
    │       └── GlobalExceptionHandler.java
    └── resources/
        ├── application.properties
        └── static/
            ├── index.html
            └── app.js
```

---

## API Endpoints

> All endpoints require `Authorization: Bearer <accessToken>` header except `/api/auth/**`.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | No | Login, get token pair |
| POST | `/refresh` | No | Refresh access token |

### Dashboard — `/api/dashboard`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/stats` | Total customers, offers, payments (cached) |

### Customers — `/api/customers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all customers |
| GET | `/{id}` | Get by ID |
| GET | `/email/{email}` | Search by email |
| GET | `/phone/{phone}` | Search by phone |
| POST | `/` | Create customer |
| PUT | `/{id}` | Update customer |
| DELETE | `/{id}` | Delete customer |

### Products — `/api/products`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all products |
| GET | `/{id}` | Get by ID |
| GET | `/category/{category}` | Filter by category |
| POST | `/` | Create product |
| PUT | `/{id}` | Update product |
| DELETE | `/{id}` | Delete product |

### Payments — `/api/payments`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all payments with customer name |
| GET | `/{id}` | Get by ID |
| POST | `/` | Create payment |
| PUT | `/{id}` | Update payment |
| DELETE | `/{id}` | Delete payment |

### Companies — `/api/companies`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all companies |
| GET | `/{id}` | Get by ID |
| POST | `/` | Create company |
| PUT | `/{id}` | Update company |
| DELETE | `/{id}` | Delete company |

### Offers — `/api/offers`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all offers |
| GET | `/{id}` | Get by ID |
| GET | `/customer/{customerId}` | Get offers by customer |
| POST | `/` | Create offer |
| PUT | `/{id}` | Update offer |
| DELETE | `/{id}` | Delete offer |

### Invoices — `/api/invoices`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/offer/{offerId}` | Get invoice as JSON |
| GET | `/offer/{offerId}/pdf` | Download invoice as PDF |

---

## Caching

| Cache Name | Cached Data | TTL | Evicted On |
|------------|-------------|-----|------------|
| `customers` | Single customer by ID | 10 min | save, update, delete |
| `customer-list` | All customers list | 5 min | save, update, delete |
| `dashboard` | Stats counts | 1 min | Customer save, update, delete |

---

## Invoice Feature

Generates a PDF invoice using **iText 7** with:
- Invoice number (`INV-00001` format)
- Customer details
- Product description, price, discount, total
- Currency: ₹ (INR) in frontend, `Rs.` in PDF

### Invoice Flow

**Manual Entry:**
1. Go to **Invoices** tab → fill Customer ID/Name, description, price, discount
2. Click **Generate Invoice** → **Download PDF**

**Search by Customer:**
1. Click **Search by Email / Phone** → enter email or phone
2. Select offer from dropdown → **Load Offer Data**
3. Click **Generate Invoice** → **Download PDF**

---

## Database Schema

```
Customer  ──< Offer >── Company
                │
              Payment
```

- One Customer → many Offers
- One Offer → one Company
- One Offer → many Payments
- Invoice generated from Offer + Customer data

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8081` | Server port |
| `DATABASE_URL` | `jdbc:postgresql://localhost:5432/crm_db` | PostgreSQL JDBC URL |
| `DATABASE_USERNAME` | `postgres` | DB username |
| `DATABASE_PASSWORD` | `postgres` | DB password |
| `JWT_SECRET` | `crm-super-secret-key-must-be-32-chars!!` | JWT signing secret |
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | _(empty)_ | Redis password (if auth enabled) |

---


---

## Author

Developed by **Anshuman** — CRM Spring Boot Project  

