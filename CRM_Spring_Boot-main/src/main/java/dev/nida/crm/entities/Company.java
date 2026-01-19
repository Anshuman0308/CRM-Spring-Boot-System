package dev.nida.crm.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company extends BaseEntity{

    @Column(name = "district_id")
    private Long districtId;

    @Column(name = "company_name")
    private String name;

    @Column(name = "company_address")
    private String address;

    @Column(name = "company_phone_number")
    private String phoneNumber;

    public Company() {}

    public Company(Long districtId, String name, String address, String phoneNumber) {
        this.districtId = districtId;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public Long getDistrictId() { return districtId; }
    public void setDistrictId(Long districtId) { this.districtId = districtId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}
