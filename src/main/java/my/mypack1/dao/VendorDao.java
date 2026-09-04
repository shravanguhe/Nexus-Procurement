package my.mypack1.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import my.mypack1.Vendor;

public interface VendorDao extends JpaRepository<Vendor, Integer> {

}