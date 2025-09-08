package com.buzzbuy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buzzbuy.entity.Product;
import com.buzzbuy.repo.ProductRepository;

@Service
public class ProductService {

  @Autowired private ProductRepository repo;

  public List<Product> all(String category) {
    if (category == null || category.isBlank()) return repo.findAll();
    return repo.findByCategory_NameIgnoreCase(category);
  }

  public Product byId(Long id) {
    return repo.findById(id).orElseThrow();
  }
}
