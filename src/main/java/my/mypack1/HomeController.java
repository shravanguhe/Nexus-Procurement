package my.mypack1;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	// Main Nexus Procurement homepage
	@GetMapping("/")
	public String home() {
		return "index";
	}

	// Vendor registration page
	@GetMapping("/register/vendor")
	public String becomeVendor() {
		return "become-vendor";
	}

	// Vendor marketplace / supplier discovery page
	@GetMapping("/vendor-marketplace")
	public String vendors() {
		return "vendors";
	}

	@GetMapping("/vendor/login")
	public String vendorLogin() {
		return "vendor-login";
	}

	@GetMapping("/vendor/dashboard")
	public String vendorDashboard() {
		return "vendor-dashboard";
	}
}