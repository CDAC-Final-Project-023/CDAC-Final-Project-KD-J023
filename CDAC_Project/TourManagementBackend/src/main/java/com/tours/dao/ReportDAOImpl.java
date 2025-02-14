package com.tours.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import com.tours.DTO.BookingStatusDTO;
import com.tours.DTO.MonthlyCollectionDTO;
import com.tours.DTO.TourRatingDTO;
import java.util.List;

@Repository
public class ReportDAOImpl implements ReportDAO {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public double getTotalCollections() {
		Query query = entityManager
				.createQuery("SELECT COALESCE(SUM(b.tour.price), 0) FROM Booking b WHERE b.status = 'CONFIRMED'");
		return (Double) query.getSingleResult();
	}

	@Override
	public List<MonthlyCollectionDTO> getCollectionHistory() {
		Query query = entityManager.createQuery("SELECT NEW com.tours.DTO.MonthlyCollectionDTO("
				+ "    FUNCTION('DATE_FORMAT', b.bookingDate, '%Y-%m'), " + "    SUM(b.tour.price)) "
				+ "FROM Booking b WHERE b.status = 'CONFIRMED' "
				+ "GROUP BY FUNCTION('DATE_FORMAT', b.bookingDate, '%Y-%m') "
				+ "ORDER BY FUNCTION('DATE_FORMAT', b.bookingDate, '%Y-%m') DESC");
		return query.getResultList();
	}

	@Override
	public List<TourRatingDTO> getTourRatings() {
		Query query = entityManager.createQuery(
				"SELECT NEW com.tours.DTO.TourRatingDTO(r.tour.id, r.tour.title, " + "    AVG(r.rating), COUNT(r.id)) "
						+ "FROM Review r GROUP BY r.tour.id, r.tour.title ORDER BY AVG(r.rating) DESC");
		return query.getResultList();
	}

	@Override
	public List<BookingStatusDTO> getBookingStatusCount() {
		Query query = entityManager.createQuery("SELECT NEW com.tours.DTO.BookingStatusDTO(b.status, COUNT(b.id)) "
				+ "FROM Booking b GROUP BY b.status");
		return query.getResultList();
	}
}
