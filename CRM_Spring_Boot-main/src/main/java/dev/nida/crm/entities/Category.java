package dev.nida.crm.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "categories")
public class Category extends BaseEntity {

    @Column(name = "category_name", nullable = false)
    private String name;

    public Category() {}

    public Category(String name) {
        this.name = name;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
