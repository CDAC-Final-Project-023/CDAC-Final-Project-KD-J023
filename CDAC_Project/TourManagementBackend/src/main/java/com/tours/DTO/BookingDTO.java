package com.tours.DTO;



import java.util.Date;
import java.util.List;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private String email; // To identify the user
    private Long tour_id;
    private double totalPrice;
    private List<TouristDTO> tourists;
    private Long User_id;
    private double grand_total;
    private double tax;
    

    // Getters and Setters
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



    // Getter and Setter for tourists
    public List<TouristDTO> getTourists() {
        return tourists;
    }

    public void setTourists(List<TouristDTO> tourists) {
        this.tourists = tourists;
    }

	public Long getUser_id() {
		return User_id;
	}

	public void setUser_id(Long user_id) {
		User_id = user_id;
	}

	@Override
	public String toString() {
		return "BookingDTO [email=" + email + ", destination=" + tour_id + ", totalPrice=" + totalPrice
				+ ", tourists=" + tourists + ", User_id=" + User_id + "]";
	}

	public double calculateTax(double total) {
		return total*0.018;
	}
	
	public void setGrandTotal() {
		this.tax=calculateTax(this.totalPrice);
		this.grand_total=this.totalPrice+this.tax;
	}
	

	public Long getTour_id() {
		return tour_id;
	}

	public void setTour_id(Long tour_id) {
		this.tour_id = tour_id;
	}
}

