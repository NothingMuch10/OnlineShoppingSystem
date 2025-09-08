package com.buzzbuy.repo;

import com.buzzbuy.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByUser_Id(Long userId);
  Optional<CartItem> findByUser_IdAndProduct_Id(Long userId, Long productId);
  void deleteByUser_Id(Long userId);
}
