package dev.nida.crm.service.impl;

import dev.nida.crm.entities.Customer;
import dev.nida.crm.repository.CustomerRepository;
import dev.nida.crm.service.CustomerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * @author Nida Başer
 * July 2024
 */

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Customer getById(long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Customer not found with id: " + id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    @Override
    @Transactional
    public Customer save(Customer customer) {
        if (customer == null) {
            throw new IllegalArgumentException("Customer cannot be null");
        }
        return customerRepository.save(customer);
    }

    @Override
    @Transactional
    public Customer update(Customer customer) {
        if (customer == null) {
            throw new IllegalArgumentException("Customer cannot be null");
        }
        return customerRepository.findById(customer.getId())
                .map(existingCustomer -> {
                    existingCustomer.setFirstName(customer.getFirstName());
                    existingCustomer.setLastName(customer.getLastName());
                    existingCustomer.setEmail(customer.getEmail());
                    existingCustomer.setPhone(customer.getPhone());
                    existingCustomer.setDistrictId(customer.getDistrictId());
                    existingCustomer.setCityId(customer.getCityId());
                    existingCustomer.setCountryId(customer.getCountryId());
                    existingCustomer.setAddress(customer.getAddress());
                    return customerRepository.save(existingCustomer);
                }).orElseThrow(() -> new NoSuchElementException("Customer not found with id: " + customer.getId()));
    }

    @Override
    @Transactional
    public void deleteById(long id) {
        if (!customerRepository.existsById(id)) {
            throw new NoSuchElementException("Customer not found with id: " + id);
        }
        customerRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Customer getByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("Customer not found with email: " + email));
    }

    @Override
    @Transactional(readOnly = true)
    public Customer getByPhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            throw new IllegalArgumentException("Phone cannot be null or empty");
        }
        return customerRepository.findByPhone(phone)
                .orElseThrow(() -> new NoSuchElementException("Customer not found with phone: " + phone));
    }
}
