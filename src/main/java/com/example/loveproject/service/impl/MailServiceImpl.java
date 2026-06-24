package com.example.loveproject.service.impl;

import com.example.loveproject.service.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendHtmlEmail(String to, String subject, String htmlContent, Map<String, Object> variables) {
        try{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, "UTF-8");

            Context context = new Context(LocaleContextHolder.getLocale());
            context.setVariables(variables);

            String html = templateEngine.process(htmlContent, context);
            messageHelper.setTo(to);
            messageHelper.setFrom(fromEmail);
            messageHelper.setSubject(subject);
            messageHelper.setText(html, true);

            mailSender.send(message);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}