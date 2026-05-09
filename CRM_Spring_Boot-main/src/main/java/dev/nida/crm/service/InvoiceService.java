package dev.nida.crm.service;

import dev.nida.crm.dto.InvoiceResponse;
import dev.nida.crm.entities.Customer;
import dev.nida.crm.entities.Offer;
import dev.nida.crm.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class InvoiceService {

    private final OfferService offerService;
    private final CustomerRepository customerRepository;

    public InvoiceService(OfferService offerService, CustomerRepository customerRepository) {
        this.offerService       = offerService;
        this.customerRepository = customerRepository;
    }

    public InvoiceResponse getInvoiceByOfferId(Long offerId) {
        Offer offer = offerService.getById(offerId);
        Customer customer = customerRepository.findById(offer.getCustomerId())
                .orElseThrow(() -> new NoSuchElementException("Customer not found: " + offer.getCustomerId()));
        return new InvoiceResponse(offer, customer);
    }
}
