package com.tours.entity;

import java.time.LocalDate;
import java.util.List;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "Bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Booking extends BaseEntity {

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "tour_id")
//    private Tour tour;
//
//    @Column(name = "booking_date", nullable = false)
//    private LocalDate bookingDate;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private BookingStatus status = BookingStatus.PENDING;
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	   // private int package_id;
	    private int numTourists;
	    private double totalPrice;
	    private double tax;
	    private double grandTotal;
	    
	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private UserSignUp user;

	    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL,orphanRemoval = true)
	    private List<Tourist> tourists;

	    @ManyToOne
	    @JoinColumn(name = "tour_id")  // This links to the Tour entity
	    private Tours tour;


		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}


		public int getNumTourists() {
			return numTourists;
		}

		public void setNumTourists(int numTourists) {
			this.numTourists = numTourists;
		}



		public UserSignUp getUser() {
			return user;
		}

		public void setUser(UserSignUp user) {
			this.user = user;
		}

		public List<Tourist> getTourists() {
			return tourists;
		}

		public void setTourists(List<Tourist> tourists) {
			this.tourists = tourists;
		}
		
		public double calculateTax(double total) {
			return total*0.018;
		}
		
		public void setGrandTotal() {
			this.tax=calculateTax(this.totalPrice);
			this.grandTotal=this.totalPrice+this.tax;
		}
		
		

	public void addTourist(Tourist tourist) {
		this.tourists.add(tourist);
		tourist.setBooking(this);
	}

	public void removeTourist(Tourist tourist) {
		this.tourists.remove(tourists);
		tourist.setBooking(null);
		}

	public Tours getTour() {
		return tour;
	}

	public void setTour(Tours tour) {
		this.tour = tour;
	}

}
