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

public interface CustomerService {

    /**
     * Belirtilen ID'ye sahip müşteri bilgilerini getirir.
     *
     * @param id Müşterinin ID'si
     * @return Belirtilen ID'ye sahip müşteri
     */
    Customer getById(long id);

    /**
     * Tüm müşteri bilgilerini getirir.
     *
     * @return Müşteri listesini döndürür
     */
    List<Customer> getAll();

    /**
     * Yeni bir müşteri kaydeder.
     *
     * @param customer Kaydedilecek müşteri
     * @return Kaydedilen müşteri
     */
    Customer save(Customer customer);

    /**
     * Var olan bir müşteri bilgisini günceller.
     *
     * @param customer Güncellenecek müşteri
     * @return Güncellenmiş müşteri
     */
    Customer update(Customer customer);

    /**
     * Belirtilen ID'ye sahip müşteri kaydını siler.
     *
     * @param id Silinecek müşterinin ID'si
     */
    void deleteById(long id);

    /**
     * E-posta adresine göre müşteri getirir.
     *
     * @param email Müşterinin e-posta adresi
     * @return Belirtilen e-posta adresine sahip müşteri
     */
    Customer getByEmail(String email);

    /**
     * Telefon numarasına göre müşteri getirir.
     *
     * @param phone Müşterinin telefon numarası
     * @return Belirtilen telefon numarasına sahip müşteri
     */
    Customer getByPhone(String phone);

}
