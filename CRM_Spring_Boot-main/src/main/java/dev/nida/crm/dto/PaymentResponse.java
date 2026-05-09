package dev.nida.crm.dto;

import dev.nida.crm.entities.Payment;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentResponse {

    private Long id;
    private String customerName;
    private BigDecimal paymentAmount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String paymentStatus;

    public PaymentResponse(Payment payment, String customerName) {
        this.id             = payment.getId();
        this.customerName   = customerName;
        this.paymentAmount  = payment.getPaymentAmount();
        this.paymentDate    = payment.getPaymentDate();
        this.paymentMethod  = payment.getPaymentMethod() != null ? payment.getPaymentMethod().name() : null;
        this.paymentStatus  = payment.getPaymentStatus() != null ? payment.getPaymentStatus().name() : null;
    }

    public Long getId()                  { return id; }
    public String getCustomerName()      { return customerName; }
    public BigDecimal getPaymentAmount() { return paymentAmount; }
    public LocalDate getPaymentDate()    { return paymentDate; }
    public String getPaymentMethod()     { return paymentMethod; }
    public String getPaymentStatus()     { return paymentStatus; }
}
