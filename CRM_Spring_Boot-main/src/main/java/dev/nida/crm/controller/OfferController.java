package dev.nida.crm.controller;

import dev.nida.crm.entities.Offer;
import dev.nida.crm.service.OfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @GetMapping
    public List<Offer> getAllOffers() {
        return offerService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {
        Offer offer = offerService.getById(id);
        return ResponseEntity.ok(offer);
    }

    @GetMapping("/customer/{customerId}")
    public List<Offer> getOffersByCustomer(@PathVariable Long customerId) {
        return offerService.getByCustomerId(customerId);
    }

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offer) {
        try {
            offer.setId(null); // Ensure ID is null for new records
            Offer savedOffer = offerService.save(offer);
            return ResponseEntity.ok(savedOffer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable Long id, @RequestBody Offer offer) {
        offer.setId(id);
        Offer updatedOffer = offerService.update(offer);
        return ResponseEntity.ok(updatedOffer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}