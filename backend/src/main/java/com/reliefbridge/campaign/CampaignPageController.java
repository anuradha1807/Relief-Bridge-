package com.reliefbridge.campaign;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CampaignPageController {

    @GetMapping("/campaigns")
    public String showCampaignDashboard() {
        return "campaign";
    }
}
