// KycDocumentService.java
package com.example.kycmanager;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KycDocumentService {

    private final KycDocumentRepository repo;

    public KycDocumentService(KycDocumentRepository repo) {
        this.repo = repo;
    }

    // Get all
    public List<KycDocument> getAll() {
        return repo.findAll();
    }

    // Save new document
    public KycDocument save(KycDocument doc) {
        return repo.save(doc);
    }

    // Update existing document
    public KycDocument update(Long id, KycDocument doc) {
        doc.setId(id);
        return repo.save(doc);
    }

    // Delete by ID
    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    // Search by name (case-insensitive)
    public List<KycDocument> searchByCustomerName(String name) {
        return repo.findByCustomerNameIgnoreCase(name);
    }
}
