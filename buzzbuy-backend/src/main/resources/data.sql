INSERT INTO category (name) VALUES ('Electronics') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO category (name) VALUES ('Clothing')    ON DUPLICATE KEY UPDATE name=name;

-- make sure the category ids exist; adjust to actual ids
INSERT INTO product (name, price, category_id) VALUES ('Laptop', 25000, 1)
  ON DUPLICATE KEY UPDATE name=name;
INSERT INTO product (name, price, category_id) VALUES ('Smartphone', 18000, 1)
  ON DUPLICATE KEY UPDATE name=name;
