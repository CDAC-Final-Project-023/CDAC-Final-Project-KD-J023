package com.tours.email;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendReceiptEmail(String toEmail, String customerName, double amount, String tourName, byte[] receiptPdf) {
        try {
            InputStreamSource attachment = new ByteArrayResource(receiptPdf);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Your Tour Booking Receipt");
            helper.setText("Dear " + customerName + ",\n\nThank you for booking the " + tourName + ".\nPlease find your receipt attached.");

            helper.addAttachment("Tour_Receipt.pdf", attachment);

            mailSender.send(message);
            System.out.println("Email with receipt sent successfully to " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
