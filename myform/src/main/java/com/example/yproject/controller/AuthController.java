package com.example.yproject.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.yproject.dto.LoginRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletResponse resp) {
    if ("user@example.com".equals(req.getEmail()) && "pass1234".equals(req.getPassword())) {
      Cookie c = new Cookie("AUTH", "demo-token-123");
      c.setHttpOnly(true);
      c.setPath("/");
      c.setMaxAge(60 * 60 * 24);
      resp.addCookie(c);
      return ResponseEntity.ok("OK");
    }
    return ResponseEntity.status(401).body("이메일 또는 비밀번호가 올바르지 않습니다.");
  }
}
