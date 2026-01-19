package dev.nida.crm.service;

import dev.nida.crm.entities.Offer;
import java.util.List;

public interface OfferService {
    Offer getById(Long id);
    List<Offer> getAll();
    Offer save(Offer offer);
    Offer update(Offer offer);
    void deleteById(Long id);
    List<Offer> getByCustomerId(Long customerId);
    List<Offer> getByCompanyId(Long companyId);
}