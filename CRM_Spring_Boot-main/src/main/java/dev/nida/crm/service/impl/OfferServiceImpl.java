package dev.nida.crm.service.impl;

import dev.nida.crm.entities.Offer;
import dev.nida.crm.repository.OfferRepository;
import dev.nida.crm.service.OfferService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OfferServiceImpl implements OfferService {

    private final OfferRepository offerRepository;

    public OfferServiceImpl(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Offer getById(Long id) {
        return offerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Offer not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Offer> getAll() {
        return offerRepository.findAll();
    }

    @Override
    @Transactional
    public Offer save(Offer offer) {
        if (offer == null) {
            throw new IllegalArgumentException("Offer cannot be null");
        }
        return offerRepository.save(offer);
    }

    @Override
    @Transactional
    public Offer update(Offer offer) {
        if (offer == null) {
            throw new IllegalArgumentException("Offer cannot be null");
        }
        return offerRepository.findById(offer.getId())
                .map(existing -> offerRepository.save(offer))
                .orElseThrow(() -> new NoSuchElementException("Offer not found with id: " + offer.getId()));
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!offerRepository.existsById(id)) {
            throw new NoSuchElementException("Offer not found with id: " + id);
        }
        offerRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Offer> getByCustomerId(Long customerId) {
        return offerRepository.findByCustomerId(customerId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Offer> getByCompanyId(Long companyId) {
        return offerRepository.findByCompanyId(companyId);
    }
}