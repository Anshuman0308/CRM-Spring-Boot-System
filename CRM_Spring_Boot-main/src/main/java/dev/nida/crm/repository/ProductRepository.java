package dev.nida.crm.repository;

import dev.nida.crm.entities.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {
    List<Products> findByCategory(String category);
    List<Products> findByBrand(String brand);
}