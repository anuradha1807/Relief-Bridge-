
package com.reliefbridge.campaign;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    // Create campaign
    public Campaign createCampaign(Campaign campaign, String username) {
        campaign.setId(null);
        campaign.setCreatedBy(username);
        return campaignRepository.save(campaign);
    }

    // Get all campaigns
    public List<Campaign> getAllCampaigns(
            String username, boolean isAdmin) {

        if (isAdmin) {
            return campaignRepository.findAll();
        }

        return campaignRepository.findAllByCreatedBy(username);
    }

    // Get campaign by ID
    public Campaign getCampaignById(
            Long id, String username, boolean isAdmin) {

        if (isAdmin) {
            return campaignRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Campaign not found with ID: " + id));
        }

        return campaignRepository.findByIdAndCreatedBy(id, username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Campaign not found or access denied."));
    }

    // Get campaign count
    public long getCampaignCount(
            String username, boolean isAdmin) {

        if (isAdmin) {
            return campaignRepository.count();
        }

        return campaignRepository.countByCreatedBy(username);
    }

    // Search and filter campaigns (existing controller compatibility)
    public List<Campaign> searchCampaigns(
            String title,
            String location,
            String status,
            String username,
            boolean isAdmin) {

        return searchCampaigns(
                title, location, status, username, isAdmin, "newest");
    }

    // Search, filter and sort campaigns
    public List<Campaign> searchCampaigns(
            String title,
            String location,
            String status,
            String username,
            boolean isAdmin,
            String sortBy) {

        List<Campaign> campaigns = isAdmin
                ? campaignRepository.findAll()
                : campaignRepository.findAllByCreatedBy(username);

        List<Campaign> filteredCampaigns = campaigns.stream()
                .filter(c -> title == null || title.isBlank()
                        || (c.getTitle() != null
                        && c.getTitle().toLowerCase()
                        .contains(title.toLowerCase())))
                .filter(c -> location == null || location.isBlank()
                        || (c.getLocation() != null
                        && c.getLocation().toLowerCase()
                        .contains(location.toLowerCase())))
                .filter(c -> status == null || status.isBlank()
                        || (c.getStatus() != null
                        && c.getStatus().equalsIgnoreCase(status)))
                .toList();

        Comparator<Campaign> comparator;

        if (sortBy == null || sortBy.isBlank()
                || sortBy.equalsIgnoreCase("newest")) {

            comparator = Comparator.comparing(
                    Campaign::getCreatedAt,
                    Comparator.nullsLast(Comparator.reverseOrder()));

        } else if (sortBy.equalsIgnoreCase("oldest")) {

            comparator = Comparator.comparing(
                    Campaign::getCreatedAt,
                    Comparator.nullsLast(Comparator.naturalOrder()));

        } else if (sortBy.equalsIgnoreCase("highest")) {

            comparator = Comparator.comparing(
                    Campaign::getTargetAmount,
                    Comparator.nullsLast(Comparator.reverseOrder()));

        } else if (sortBy.equalsIgnoreCase("lowest")) {

            comparator = Comparator.comparing(
                    Campaign::getTargetAmount,
                    Comparator.nullsLast(Comparator.naturalOrder()));

        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid sortBy value. Use newest, oldest, highest or lowest.");
        }

        return filteredCampaigns.stream()
                .sorted(comparator)
                .toList();
    }

    // Update campaign
    public Campaign updateCampaign(
            Long id,
            Campaign updatedCampaign,
            String username,
            boolean isAdmin) {

        Campaign existingCampaign =
                getCampaignById(id, username, isAdmin);

        if ("COMPLETED".equalsIgnoreCase(existingCampaign.getStatus())
                || "CANCELLED".equalsIgnoreCase(existingCampaign.getStatus())) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Completed or cancelled campaigns cannot be updated.");
        }

        existingCampaign.setTitle(updatedCampaign.getTitle());
        existingCampaign.setDescription(updatedCampaign.getDescription());
        existingCampaign.setLocation(updatedCampaign.getLocation());
        existingCampaign.setTargetAmount(updatedCampaign.getTargetAmount());
        existingCampaign.setAmountRaised(updatedCampaign.getAmountRaised());
        existingCampaign.setStatus(updatedCampaign.getStatus());

        return campaignRepository.save(existingCampaign);
    }

    // Delete campaign
    public void deleteCampaign(
            Long id, String username, boolean isAdmin) {

        Campaign campaign = getCampaignById(id, username, isAdmin);
        campaignRepository.delete(campaign);
    }
}
