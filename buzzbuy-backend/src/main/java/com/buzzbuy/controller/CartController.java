package com.buzzbuy.controller;

import com.buzzbuy.dto.AddToCartRequest;
import com.buzzbuy.dto.CartItemDto;
import com.buzzbuy.entity.CartItem;
import com.buzzbuy.entity.Product;
import com.buzzbuy.entity.User;
import com.buzzbuy.repo.CartItemRepository;
import com.buzzbuy.repo.ProductRepository;
import com.buzzbuy.repo.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
public class CartController {

  @Autowired private CartItemRepository cartRepo;
  @Autowired private ProductRepository productRepo;
  @Autowired private UserRepository userRepo;

  // TEMP: until auth is added, use demo user id=1
  private Long currentUserId() { return 1L; }

  @GetMapping
  public List<CartItemDto> getCart() {
    return cartRepo.findByUser_Id(currentUserId())
        .stream().map(CartItemDto::from).collect(Collectors.toList());
  }

  @PostMapping
  public ResponseEntity<CartItemDto> add(@Valid @RequestBody AddToCartRequest req) {
    User user = userRepo.findById(currentUserId()).orElseThrow();
    Product prod = productRepo.findById(req.productId()).orElseThrow();

    CartItem item = cartRepo.findByUser_IdAndProduct_Id(user.getId(), prod.getId())
        .orElseGet(() -> {
          CartItem ci = new CartItem();
          ci.setUser(user);
          ci.setProduct(prod);
          ci.setQuantity(0);
          return ci;
        });

    int inc = (req.quantity() == null || req.quantity() < 1) ? 1 : req.quantity();
    item.setQuantity(item.getQuantity() + inc);
    cartRepo.save(item);

    return ResponseEntity.ok(CartItemDto.from(item));
  }

  @PutMapping("/{itemId}")
  public ResponseEntity<CartItemDto> update(@PathVariable Long itemId, @RequestParam int quantity) {
    CartItem item = cartRepo.findById(itemId).orElseThrow();
    if (quantity <= 0) {
      cartRepo.delete(item);
      return ResponseEntity.noContent().build();
    }
    item.setQuantity(quantity);
    cartRepo.save(item);
    return ResponseEntity.ok(CartItemDto.from(item));
  }

  @DeleteMapping("/{itemId}")
  public ResponseEntity<Void> remove(@PathVariable Long itemId) {
    cartRepo.deleteById(itemId);
    return ResponseEntity.noContent().build();
  }

  @DeleteMapping
  public ResponseEntity<Void> clear() {
    cartRepo.deleteByUser_Id(currentUserId());
    return ResponseEntity.noContent().build();
  }
}
