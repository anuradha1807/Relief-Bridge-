
package com.reliefbridge.campaign;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "campaigns")
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Campaign title is required")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    @Column(nullable = false)
    private String title;

    @Size(max = 2000, message = "Description cannot exceed 2000 characters")
    @Column(length = 2000)
    private String description;

    @NotBlank(message = "Campaign location is required")
    private String location;

    @NotNull(message = "Target amount is required")
    @DecimalMin(value = "0.01", message = "Target amount must be greater than zero")
    @Digits(integer = 10, fraction = 2, message = "Invalid target amount")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal targetAmount = BigDecimal.ZERO;

    @NotNull(message = "Amount raised is required")
    @DecimalMin(value = "0.00", message = "Amount raised cannot be negative")
    @Digits(integer = 10, fraction = 2, message = "Invalid amount raised")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amountRaised = BigDecimal.ZERO;

    @NotBlank(message = "Campaign status is required")
    @Pattern(
            regexp = "ACTIVE|COMPLETED|CANCELLED",
            message = "Status must be ACTIVE, COMPLETED or CANCELLED"
    )
    @Column(nullable = false)
    private String status = "ACTIVE";

    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private String createdBy;

    public Campaign() {
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getAmountRaised() {
        return amountRaised;
    }

    public void setAmountRaised(BigDecimal amountRaised) {
        this.amountRaised = amountRaised;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
