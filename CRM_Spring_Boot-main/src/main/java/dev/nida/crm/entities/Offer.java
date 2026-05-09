package dev.nida.crm.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "offers")
public class Offer extends BaseEntity {

    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "offer_details")
    private String offerDetails;

    @Column(name = "offer_date")
    private LocalDate offerDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "offer_status")
    private OfferStatus offerStatus;

    @Column(name = "price", precision = 19, scale = 2)
    private java.math.BigDecimal price;

    @Column(name = "discount_percent")
    private Double discountPercent;

    public Offer() {}

    public Offer(Long companyId, Long customerId, String offerDetails, LocalDate offerDate, OfferStatus offerStatus) {
        this.companyId = companyId;
        this.customerId = customerId;
        this.offerDetails = offerDetails;
        this.offerDate = offerDate;
        this.offerStatus = offerStatus;
    }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public String getOfferDetails() { return offerDetails; }
    public void setOfferDetails(String offerDetails) { this.offerDetails = offerDetails; }
    public LocalDate getOfferDate() { return offerDate; }
    public void setOfferDate(LocalDate offerDate) { this.offerDate = offerDate; }
    public OfferStatus getOfferStatus() { return offerStatus; }
    public void setOfferStatus(OfferStatus offerStatus) { this.offerStatus = offerStatus; }
    public java.math.BigDecimal getPrice() { return price; }
    public void setPrice(java.math.BigDecimal price) { this.price = price; }
    public Double getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(Double discountPercent) { this.discountPercent = discountPercent; }

    public enum OfferStatus {
        ACCEPTED,
        REJECTED,
        PENDING
    }
}
