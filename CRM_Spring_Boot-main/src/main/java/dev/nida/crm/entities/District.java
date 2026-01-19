package dev.nida.crm.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "districts")
public class District extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @Column(name = "district_name")
    private String name;

    public District() {}

    public District(City city, String name) {
        this.city = city;
        this.name = name;
    }

    public City getCity() { return city; }
    public void setCity(City city) { this.city = city; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}