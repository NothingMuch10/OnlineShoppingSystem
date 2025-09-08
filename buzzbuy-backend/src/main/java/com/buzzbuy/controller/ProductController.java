package com.buzzbuy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buzzbuy.entity.Product;
import com.buzzbuy.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired private ProductService service;

  @GetMapping
  public List<Product> list(@RequestParam(required = false) String category) {
    return service.all(category);
  }

  @GetMapping("/{id}")
  public Product one(@PathVariable Long id) {
    return service.byId(id);
  }
}
