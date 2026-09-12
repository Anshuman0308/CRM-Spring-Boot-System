package dev.nida.crm.controller;

import dev.nida.crm.repository.CustomerRepository;
import dev.nida.crm.repository.OfferRepository;
import dev.nida.crm.repository.PaymentRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final CustomerRepository customerRepository;
    private final OfferRepository offerRepository;
    private final PaymentRepository paymentRepository;

    public DashboardController(CustomerRepository customerRepository,
                               OfferRepository offerRepository,
                               PaymentRepository paymentRepository) {
        this.customerRepository = customerRepository;
        this.offerRepository = offerRepository;
        this.paymentRepository = paymentRepository;
    }

    @GetMapping("/stats")
    @Cacheable(value = "dashboard")
    public Map<String, Long> stats() {
        return Map.of(
            "totalCustomers", customerRepository.count(),
            "totalOffers", offerRepository.count(),
            "totalPayments", paymentRepository.count()
        );
    }
}
