package dev.nida.crm.dto;

import dev.nida.crm.entities.Offer;
import dev.nida.crm.entities.Customer;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class InvoiceResponse {

    private Long invoiceNo;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private String description;
    private BigDecimal price;
    private Double discountPercent;
    private BigDecimal discountAmount;
    private BigDecimal totalAmount;

    public InvoiceResponse(Offer offer, Customer customer) {
        this.invoiceNo       = offer.getId();
        this.customerName    = customer.getFirstName() + " " + customer.getLastName();
        this.customerEmail   = customer.getEmail();
        this.customerPhone   = customer.getPhone();
        this.customerAddress = customer.getAddress();
        this.description     = offer.getOfferDetails();
        this.price           = offer.getPrice() != null ? offer.getPrice() : BigDecimal.ZERO;
        this.discountPercent = offer.getDiscountPercent() != null ? offer.getDiscountPercent() : 0.0;
        this.discountAmount  = this.price.multiply(BigDecimal.valueOf(this.discountPercent / 100)).setScale(2, RoundingMode.HALF_UP);
        this.totalAmount     = this.price.subtract(this.discountAmount).setScale(2, RoundingMode.HALF_UP);
    }

    public Long getInvoiceNo()            { return invoiceNo; }
    public String getCustomerName()       { return customerName; }
    public String getCustomerEmail()      { return customerEmail; }
    public String getCustomerPhone()      { return customerPhone; }
    public String getCustomerAddress()    { return customerAddress; }
    public String getDescription()        { return description; }
    public BigDecimal getPrice()          { return price; }
    public Double getDiscountPercent()    { return discountPercent; }
    public BigDecimal getDiscountAmount() { return discountAmount; }
    public BigDecimal getTotalAmount()    { return totalAmount; }
}
