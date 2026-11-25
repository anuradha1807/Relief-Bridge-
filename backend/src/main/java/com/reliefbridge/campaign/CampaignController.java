
package com.reliefbridge.campaign;

import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaign")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    // Check whether logged-in user is admin
    private boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals("ROLE_ADMIN"));
    }

    // Create campaign
    @PostMapping
    public Campaign createCampaign(
            @Valid @RequestBody Campaign campaign,
            Authentication authentication) {

        return campaignService.createCampaign(
                campaign, authentication.getName());
    }

    // Get all campaigns
    @GetMapping
    public List<Campaign> getAllCampaigns(
            Authentication authentication) {

        return campaignService.getAllCampaigns(
                authentication.getName(), isAdmin(authentication));
    }

    // Get campaign by ID
    @GetMapping("/{id}")
    public Campaign getCampaignById(
            @PathVariable Long id,
            Authentication authentication) {

        return campaignService.getCampaignById(
                id, authentication.getName(), isAdmin(authentication));
    }

    // Get campaign count
    @GetMapping("/count")
    public long getCampaignCount(Authentication authentication) {

        return campaignService.getCampaignCount(
                authentication.getName(), isAdmin(authentication));
    }

    // Search and filter campaigns
    @GetMapping("/search")
    public List<Campaign> searchCampaigns(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String status,
            Authentication authentication) {

        return campaignService.searchCampaigns(
                title,
                location,
                status,
                authentication.getName(),
                isAdmin(authentication));
    }

    // Update campaign
    @PutMapping("/{id}")
    public Campaign updateCampaign(
            @PathVariable Long id,
            @Valid @RequestBody Campaign campaign,
            Authentication authentication) {

        return campaignService.updateCampaign(
                id, campaign, authentication.getName(),
                isAdmin(authentication));
    }

    // Delete campaign
    @DeleteMapping("/{id}")
    public String deleteCampaign(
            @PathVariable Long id,
            Authentication authentication) {

        campaignService.deleteCampaign(
                id, authentication.getName(), isAdmin(authentication));

        return "Campaign deleted successfully.";
    }
}
