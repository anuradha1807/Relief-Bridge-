
package com.reliefbridge.campaign;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CampaignRepository
        extends JpaRepository<Campaign, Long> {

    // Find all campaigns created by a particular user
    List<Campaign> findAllByCreatedBy(String createdBy);

    // Find a particular campaign belonging to a user
    Optional<Campaign> findByIdAndCreatedBy(
            Long id, String createdBy);

    // Count campaigns created by a user
    long countByCreatedBy(String createdBy);

    // Search campaigns by title
    List<Campaign> findByTitleContainingIgnoreCase(String title);

    // Search campaigns by location
    List<Campaign> findByLocationContainingIgnoreCase(String location);

    // Filter campaigns by status
    List<Campaign> findByStatusIgnoreCase(String status);

    // Search campaigns by title and location
    List<Campaign> findByTitleContainingIgnoreCaseAndLocationContainingIgnoreCase(
            String title, String location);
}
