-- =============================================
-- BuzzBuy MySQL Schema (DDL + Seed Data)
-- =============================================

-- Create database
CREATE DATABASE IF NOT EXISTS buzzbuy
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
USE buzzbuy;

-- Drop tables if they exist (for clean re-run)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- USERS
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  mobile VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ADDRESSES
CREATE TABLE addresses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  line1 VARCHAR(150) NOT NULL,
  line2 VARCHAR(150),
  city VARCHAR(80) NOT NULL,
  state VARCHAR(80) NOT NULL,
  pincode VARCHAR(12) NOT NULL,
  country VARCHAR(80) NOT NULL DEFAULT 'India',
  is_default BOOLEAN NOT NULL DEFAULT 0,
  CONSTRAINT fk_addr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CATEGORIES
CREATE TABLE categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  description VARCHAR(255)
);

-- PRODUCTS
CREATE TABLE products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  stock INT NOT NULL DEFAULT 0,
  category_id BIGINT,
  CONSTRAINT fk_prod_cat FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_prod_name (name)
);

-- CART ITEMS
CREATE TABLE cart_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_prod FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  UNIQUE KEY uq_user_product (user_id, product_id)
);

-- ORDERS
CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- PENDING/PAID/SHIPPED/CANCELLED
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_method VARCHAR(20) DEFAULT 'COD',
  shipping_name VARCHAR(120) NOT NULL,
  shipping_email VARCHAR(120) NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- ORDER ITEMS
CREATE TABLE order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_oi_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_oi_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- =============================================
-- SEED DATA
-- =============================================

-- Demo user
INSERT INTO users(name, email, mobile, password_hash, role)
VALUES ('Demo User','demo@buzzbuy.com','9999999999','dummyhash','USER');

-- Categories
INSERT INTO categories(name, description) VALUES
  ('Clothing','Apparel and accessories'),
  ('Electronics','Phones, laptops, and gadgets'),
  ('Furniture','Sofas, tables, and chairs'),
  ('Food','Snacks and groceries');

-- Products
INSERT INTO products(name, description, price, image_url, stock, category_id) VALUES
  ('Laptop','Portable and powerful.', 25000.00, 'images/laptop.jpg', 25, (SELECT id FROM categories WHERE name='Electronics')),
  ('T-Shirt','Soft cotton crew neck.', 599.00, 'images/pant.png', 100, (SELECT id FROM categories WHERE name='Clothing')),
  ('Smartphone','Feature-packed Android phone.', 18000.00, 'images/mobile.png', 50, (SELECT id FROM categories WHERE name='Electronics')),
  ('Sofa','Comfy 3-seater.', 12000.00, 'images/furniture.jpg', 10, (SELECT id FROM categories WHERE name='Furniture')),
  ('Snack Box','Mixed treats pack.', 299.00, 'images/grocery.jpg', 200, (SELECT id FROM categories WHERE name='Food'));



SHOW DATABASES;
USE buzzbuy;
SHOW TABLES;
SELECT * FROM products;
