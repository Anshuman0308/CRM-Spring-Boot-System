package dev.nida.crm.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Products extends BaseEntity{

    @Column(name = "product_name")
    private String name;

    @Column(name = "category_id")
    private String category;

    @Column(name = "brand_id")
    private String brand;

    @Column(name = "product_price", precision = 19, scale = 2)
    private BigDecimal price;

    public Products() {}

    public Products(String name, String category, String brand, BigDecimal price) {
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.price = price;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
