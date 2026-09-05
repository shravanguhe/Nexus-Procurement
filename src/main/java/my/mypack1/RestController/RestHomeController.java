package my.mypack1.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import my.mypack1.Vendor;
import my.mypack1.dao.VendorDao;

@RestController
public class RestHomeController {

	@Autowired
	private VendorDao repo;

	@GetMapping("/vendors")
	public List<Vendor> getallVendors() {
		return repo.findAll();
	}

	@PostMapping("/vendors")
	public void createVendor(@RequestBody Vendor v) {
		repo.save(v);
	}
}