package com.buzzbuy.repo;

import com.buzzbuy.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findByCategory_NameIgnoreCase(String categoryName);
}
