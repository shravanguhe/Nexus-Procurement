package my.mypack1;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/")
	public String home() {
		return "index";
	}

	@GetMapping("/register/vendor")
	public String becomeVendor() {
		return "become-vendor";
	}
}