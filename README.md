# OnlineShoppingSystem

Online Shopping System (OSS) 
1.1 Purpose 
This Software Requirements Specification (SRS) document outlines the functional and non
functional requirements for the development of an Online Shopping Mart platform for a 
global retail giant. This document will serve as the primary reference for the development 
team during the implementation phase. 
1.2 Scope 
The Online Shopping Mart will be a comprehensive e-commerce platform allowing 
customers to browse products, place orders, make payments, and track deliveries. The system 
will also include an administrative interface for inventory management, order processing, and 
customer service. 
1.3 Definitions, Acronyms, and Abbreviations 
• SRS - Software Requirements Specification 
• API - Application Programming Interface 
• UI - User Interface 
• UX - User Experience 
• PII - Personally Identifiable Information 
• GDPR - General Data Protection Regulation 
• PCI DSS - Payment Card Industry Data Security Standard 
2. System Overview 
2.1 System Architecture 
The system will follow a microservices architecture with the following key components: 
• Frontend Application (Web and Mobile) 
• User Authentication and Authorization Service 
• Product Catalog Service 
• Shopping Cart Service 
• Order Management Service 
• Payment Processing Service 
• Analytics and Reporting Service 
2.2 Technology Stack 
✓ Spring Boot 
✓ Spring Boot MVC / REST 
✓ Spring Data JPA 
✓ Oracle Database  
3. Functional Requirements 
3.1 User Management 
3.1.1 Registration and Authentication 
• The system shall provide user registration using email, phone number, or social media 
accounts 
• The system shall implement multi-factor authentication 
• The system shall support password recovery functionality 
• The system shall maintain user session management with configurable timeout 
periods 
3.1.2 User Profiles 
• The system shall allow users to create and edit profiles 
• The system shall store multiple shipping addresses 
• The system shall securely store payment methods 
• The system shall track order history and status 
• The system shall provide wishlist functionality 
3.2 Product Catalogue 
3.2.1 Product Listing 
• The system shall display products with detailed information (images, descriptions, 
specifications, price) 
• The system shall support categorization of products 
• The system shall implement advanced search with filters (price range, category, 
brand, etc.) 
• The system shall display product availability information 
3.2.2 Product Reviews and Ratings 
• The system shall allow users to rate products on a 5-star scale 
• The system shall enable users to write reviews with photos 
• The system shall display average ratings and review summaries 
• The system shall implement moderation for user-generated content 
3.3 Shopping Cart and Checkout 
3.3.1 Shopping Cart 
• The system shall allow adding, removing, and updating quantities of items 
• The system shall persist shopping cart contents across sessions 
• The system shall display real-time price calculations including discounts 
• The system shall support saving items for later 
3.3.2 Checkout Process 
• The system shall provide a streamlined multi-step checkout process 
• The system shall support multiple payment methods (credit/debit cards, digital 
wallets, etc.) 
• The system shall implement address validation 
• The system shall provide order summary with itemized costs 
• The system shall display shipping options with estimated delivery dates 
3.4 Payment Processing 
3.4.1 Payment Methods 
• The system shall support credit/debit card payments 
• The system shall integrate with digital wallets (Apple Pay, Google Pay, etc.) 
• The system shall support alternative payment methods based on region 
• The system shall implement buy-now-pay-later options 
4. Non-Functional Requirements 
4.1 Performance 
• The system shall support at least 10,000 concurrent users 
• Page load time shall not exceed 2 seconds under normal conditions 
• API response time shall be under 200ms for 95% of requests 
• The system shall handle 100,000 transactions per hour during peak periods 
4.2 Scalability 
• The architecture shall support horizontal scaling of all components 
• The system shall implement auto-scaling based on demand 
• Database performance shall maintain with growth to 10 million products 
• The system shall support regional deployment for global presence 
4.3 Availability and Reliability 
• The system shall maintain 99.99% uptime 
• The system shall implement failover mechanisms for all critical components 
• The system shall have a comprehensive disaster recovery plan 
• Scheduled maintenance shall not impact user experience 
4.4 Security 
• The system shall encrypt all data in transit using TLS 1.3 
• The system shall encrypt sensitive data at rest 
• The system shall implement role-based access control 
• The system shall undergo regular security audits and penetration testing 
• The system shall implement protection against common web vulnerabilities (OWASP 
Top 10) 
