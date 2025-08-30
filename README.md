# 🛒 Online Shopping System (OSS)

> A comprehensive e-commerce platform for a global retail giant — customers can browse products, place orders, make payments, and track deliveries. Admins can manage inventory, orders, and customer service.

---

## Table of Contents
- [Overview](#overview)
- [Purpose](#purpose)
- [Scope](#scope)
- [Glossary](#glossary)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Functional Requirements](#functional-requirements)
  - [User Management](#user-management)
  - [Product Catalogue](#product-catalogue)
  - [Shopping Cart & Checkout](#shopping-cart--checkout)
  - [Payment Processing](#payment-processing)
- [Non-Functional Requirements](#non-functional-requirements)
  - [Performance](#performance)
  - [Scalability](#scalability)
  - [Availability & Reliability](#availability--reliability)
  - [Security](#security)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
The **Online Shopping System (OSS)** is a microservices-based e-commerce platform with web & mobile frontends. It supports product discovery, cart & checkout, secure payments, order tracking, and an admin interface for back-office operations.

## Purpose
This README summarizes the **functional** and **non-functional** requirements that guide implementation. It serves as a concise, developer-friendly version of the SRS.

## Scope
- Customer-facing web & mobile applications  
- Product browsing, ordering, payment, and delivery tracking  
- Administrative panel for inventory, order processing, and customer support  
- Secure, scalable, globally deployable architecture

## Glossary
- **SRS** — Software Requirements Specification  
- **API** — Application Programming Interface  
- **UI/UX** — User Interface / User Experience  
- **PII** — Personally Identifiable Information  
- **GDPR** — General Data Protection Regulation  
- **PCI DSS** — Payment Card Industry Data Security Standard

---

## System Architecture
**Microservices** (high level):
- Frontend Application (Web & Mobile)
- User Authentication & Authorization Service
- Product Catalog Service
- Shopping Cart Service
- Order Management Service
- Payment Processing Service
- Analytics & Reporting Service

> _Optional_: Add a diagram here (e.g., `/docs/architecture.png`) and reference it:
> ![Architecture](docs/architecture.png)

## Technology Stack
- **Spring Boot**, **Spring MVC / REST**
- **Spring Data JPA**
- **Oracle Database**

---

## Functional Requirements

### User Management
- Registration via email, phone, or social login  
- Multi-factor authentication & password recovery  
- Profile management (addresses, payment methods, order history, wishlist)

### Product Catalogue
- Product listing with images, descriptions, specs, price  
- Categories & advanced search (filters: price, brand, etc.)  
- Availability display  
- Reviews & ratings (with moderation), 5-star scale, photos

### Shopping Cart & Checkout
- Add/remove/update quantities; persistent cart across sessions  
- Real-time price calculation (discounts, taxes, shipping)  
- Multi-step checkout, address validation  
- Multiple payment methods; shipping options with ETA; itemized order summary

### Payment Processing
- Cards, digital wallets (Apple Pay, Google Pay), regional methods  
- Buy-Now-Pay-Later options

---

## Non-Functional Requirements

### Performance
- ≥ **10,000** concurrent users  
- Page load < **2s** (normal conditions)  
- API p95 < **200ms**  
- Peak throughput ≥ **100,000** transactions/hour

### Scalability
- Horizontal scaling & auto-scaling for all services  
- Database performance up to **10M** products  
- Regional deployments for global presence

### Availability & Reliability
- **99.99%** uptime target  
- Failover for critical components; disaster recovery plan  
- Maintenance with minimal/no user impact

### Security
- TLS 1.3 in transit; encryption at rest for sensitive data  
- Role-based access control (RBAC)  
- Regular security audits & penetration testing  
- Protection against OWASP Top 10

---

## Project Status
- **Stage:** Requirements / Architecture  
- **Next:** Service contracts, data model, and API specs

---

## Contributing
1. Fork the repo and create a feature branch: `git checkout -b feat/my-change`  
2. Commit changes: `git commit -m "feat: concise message"`  
3. Push branch: `git push origin feat/my-change`  
4. Open a Pull Request with a clear description.

---

## License
This project is licensed under the **MIT License**. See `LICENSE` for details.
