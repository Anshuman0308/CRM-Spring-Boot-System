package dev.nida.crm.service;

import dev.nida.crm.entities.Customer;

import java.util.List;

/**
 * CustomerService, müşteri işlemleri için iş mantığını sağlayan servis katmanıdır.
 * Bu arayüz, müşteri verileri ile ilgili CRUD işlemlerini içerir.
 *
 * @author Nida Başer
 * @date July 2024
 */

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerService {

    Customer getById(long id);
    Page<Customer> getAll(Pageable pageable);
    Customer save(Customer customer);
    Customer update(Customer customer);
    void deleteById(long id);
    Customer getByEmail(String email);
    Customer getByPhone(String phone);

}
