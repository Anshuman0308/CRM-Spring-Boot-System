package dev.nida.crm.repository;

import dev.nida.crm.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * CustomerRepository, müşteri verilerine erişim sağlayan veri erişim katmanıdır.
 * Bu arayüz, JpaRepository'yi genişleterek CRUD işlemlerini ve özel sorguları sağlar.
 *
 * @author Nida Başer
 * @date July 2024
 */

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * E-posta adresine göre müşteri arar.
     *
     * @param email Müşterinin e-posta adresi
     * @return Belirtilen e-posta adresine sahip müşteri, eğer bulunursa
     */
    Optional<Customer> findByEmail(String email);

    /**
     * Telefon numarasına göre müşteri arar.
     *
     * @param phone Müşterinin telefon numarası
     * @return Belirtilen telefon numarasına sahip müşteri, eğer bulunursa
     */
    Optional<Customer> findByPhone(String phone);

    /**
     * Belirli bir şehirdeki tüm müşterileri listeler.
     *
     * @param cityId Şehir ID'si
     * @return Belirtilen şehir ID'sine sahip tüm müşteriler
     */
    List<Customer> findAllByCityId(Long cityId);

    /**
     * Belirli bir ülkedeki tüm müşterileri listeler.
     *
     * @param countryId Ülke ID'si
     * @return Belirtilen ülke ID'sine sahip tüm müşteriler
     */
    List<Customer> findAllByCountryId(Long countryId);

}