package com.tours.email;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class ReceiptGeneratorService {
    public byte[] generateReceipt(String firstName, String lastName, String email, String mobileNumber, String title,
			String description, double totalAmount, String formattedBookingDate, int count, String[][] touristDetails) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
             PdfWriter writer = new PdfWriter(outputStream);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {
        	 // Title
            document.add(new Paragraph("Tour Booking Receipt").setBold().setFontSize(16));

            // Customer Information
            document.add(new Paragraph("Name : " + firstName + " " + lastName));
            document.add(new Paragraph("Email: " + email));
            document.add(new Paragraph("Mobile Number: " + mobileNumber));

            // Tour Details
            document.add(new Paragraph("Tour: " + title));
            document.add(new Paragraph("Description: " + description));
            document.add(new Paragraph("Amount Paid: ₹" + totalAmount));
            document.add(new Paragraph("Booking Date: " + formattedBookingDate));
            document.add(new Paragraph("Number of Tourists: " + count));

            // Table for Tourist Details
            float[] columnWidths = {50f, 150f, 50f, 80f}; // Column widths
            Table table = new Table(columnWidths);
            table.addCell("No.");
            table.addCell("Name");
            table.addCell("Age");
            table.addCell("Gender");

            for (int i = 0; i < count; i++) {
                table.addCell(String.valueOf(i + 1));
                table.addCell(touristDetails[i][0]); // Name
                table.addCell(touristDetails[i][1]); // Age
                table.addCell(touristDetails[i][2]); // Gender
            }

            document.add(table);

            // Closing message
            document.add(new Paragraph("\nThank you for booking with us!"));

            document.close();
            return outputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



	
}
