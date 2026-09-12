package dev.nida.crm.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long accessExpiry;
    private final long refreshExpiry;

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-expiry-ms:900000}") long accessExpiry,
            @Value("${jwt.refresh-expiry-ms:604800000}") long refreshExpiry) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessExpiry = accessExpiry;
        this.refreshExpiry = refreshExpiry;
    }

    public String generateAccess(String username) {
        return build(username, accessExpiry, "access");
    }

    public String generateRefresh(String username) {
        return build(username, refreshExpiry, "refresh");
    }

    private String build(String username, long expiry, String type) {
        return Jwts.builder()
                .subject(username)
                .claim("type", type)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiry))
                .signWith(key)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }

    public String getUsername(String token) {
        return parse(token).getSubject();
    }

    public boolean isValid(String token) {
        try {
            Claims c = parse(token);
            return "access".equals(c.get("type")) && c.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isValidRefresh(String token) {
        try {
            Claims c = parse(token);
            return "refresh".equals(c.get("type")) && c.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
