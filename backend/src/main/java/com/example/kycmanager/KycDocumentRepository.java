// KycDocumentRepository.java
package com.example.kycmanager;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KycDocumentRepository extends JpaRepository<KycDocument, Long> {

    List<KycDocument> findByCustomerNameIgnoreCase(String customerName);

}
