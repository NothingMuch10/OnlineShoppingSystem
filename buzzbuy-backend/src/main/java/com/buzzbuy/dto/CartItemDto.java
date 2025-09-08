package com.buzzbuy.dto;

import com.buzzbuy.entity.CartItem;
import java.math.BigDecimal;

public class CartItemDto {
  private Long id;
  private Long productId;
  private String name;
  private String category;
  private BigDecimal price;
  private Integer quantity;

  public static CartItemDto from(CartItem ci) {
    CartItemDto dto = new CartItemDto();
    dto.id = ci.getId();
    dto.productId = ci.getProduct().getId();
    dto.name = ci.getProduct().getName();
    dto.category = ci.getProduct().getCategory() != null
        ? ci.getProduct().getCategory().getName()
        : null;
    // ← convert Double -> BigDecimal here
    dto.price = BigDecimal.valueOf(ci.getProduct().getPrice());
    dto.quantity = ci.getQuantity();
    return dto;
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public Long getProductId() { return productId; }
  public void setProductId(Long productId) { this.productId = productId; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getCategory() { return category; }
  public void setCategory(String category) { this.category = category; }
  public BigDecimal getPrice() { return price; }
  public void setPrice(BigDecimal price) { this.price = price; }
  public Integer getQuantity() { return quantity; }
  public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
