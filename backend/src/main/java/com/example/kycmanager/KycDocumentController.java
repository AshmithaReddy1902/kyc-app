// KycDocumentController.java
package com.example.kycmanager;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/kyc")
@CrossOrigin(origins = "http://localhost:5173")
public class KycDocumentController {

    private final KycDocumentService service;

    public KycDocumentController(KycDocumentService service) {
        System.out.println("CONTROLLER LOADED SUCCESSFULLY!");
        this.service = service;
    }

    @GetMapping
    public List<KycDocument> getAll() {
        return service.getAll();
    }

    @PostMapping
    public KycDocument add(@RequestBody KycDocument doc) {
        return service.save(doc);
    }

    @PutMapping("/{id}")
    public KycDocument update(@PathVariable Long id, @RequestBody KycDocument doc) {
        return service.update(id, doc);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteById(id);
    }

    @GetMapping("/search")
    public List<KycDocument> search(@RequestParam String name) {
        return service.searchByCustomerName(name);
    }
}
