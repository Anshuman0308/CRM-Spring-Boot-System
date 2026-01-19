package dev.nida.crm.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
public class HomeController {

    @GetMapping("/")
    public void home(HttpServletResponse response) throws IOException {
        ClassPathResource resource = new ClassPathResource("static/index.html");
        String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        response.setContentType(MediaType.TEXT_HTML_VALUE);
        response.getWriter().write(content);
    }

    @GetMapping("/app.js")
    public void appJs(HttpServletResponse response) throws IOException {
        ClassPathResource resource = new ClassPathResource("static/app.js");
        String content = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        response.setContentType("application/javascript");
        response.getWriter().write(content);
    }

    @GetMapping("/api")
    public String api() {
        return "CRM Application is running! Visit /api/customers to access customer endpoints.";
    }
}