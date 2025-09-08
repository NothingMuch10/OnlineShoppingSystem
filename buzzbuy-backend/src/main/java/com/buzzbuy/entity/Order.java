package com.buzzbuy.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "orders")
@Data @NoArgsConstructor @AllArgsConstructor
public class Order {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(nullable = false)
  private String status = "PENDING";

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal totalAmount = BigDecimal.ZERO;

  private String paymentMethod; // COD/CARD/UPI

  @Column(nullable = false)
  private String shippingName;

  @Column(nullable = false)
  private String shippingEmail;

  @Lob @Column(nullable = false)
  private String shippingAddress;

  @Column(nullable = false, updatable = false)
  private Instant createdAt = Instant.now();
}
