package dev.nida.crm.service;

import dev.nida.crm.dto.PaymentResponse;
import dev.nida.crm.entities.Customer;
import dev.nida.crm.entities.Offer;
import dev.nida.crm.entities.Payment;
import dev.nida.crm.repository.CustomerRepository;
import dev.nida.crm.repository.OfferRepository;
import dev.nida.crm.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OfferRepository offerRepository;
    private final CustomerRepository customerRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          OfferRepository offerRepository,
                          CustomerRepository customerRepository) {
        this.paymentRepository  = paymentRepository;
        this.offerRepository    = offerRepository;
        this.customerRepository = customerRepository;
    }

    public List<PaymentResponse> getAllWithCustomerName() {
        return paymentRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private PaymentResponse toResponse(Payment payment) {
        String customerName = payment.getPayerName() != null && !payment.getPayerName().isBlank()
                ? payment.getPayerName()
                : resolveCustomerName(payment.getOfferId());
        return new PaymentResponse(payment, customerName);
    }

    private String resolveCustomerName(long offerId) {
        return offerRepository.findById(offerId)
                .map(Offer::getCustomerId)
                .flatMap(customerRepository::findById)
                .map(c -> c.getFirstName() + " " + c.getLastName())
                .orElse("-");
    }
}
