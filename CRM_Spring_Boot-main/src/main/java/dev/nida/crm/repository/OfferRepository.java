package dev.nida.crm.repository;

import dev.nida.crm.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByCustomerId(Long customerId);
    List<Offer> findByCompanyId(Long companyId);
}