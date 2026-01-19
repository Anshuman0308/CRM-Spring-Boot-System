package dev.nida.crm.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "countries")
public class Country extends BaseEntity {

    @Column(name = "country_name")
    private String name;

    @OneToMany(mappedBy = "country", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<City> cities;

    public Country() {}

    public Country(String name, List<City> cities) {
        this.name = name;
        this.cities = cities;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<City> getCities() { return cities; }
    public void setCities(List<City> cities) { this.cities = cities; }
}
