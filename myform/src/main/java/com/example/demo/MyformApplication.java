package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(
  scanBasePackages = {
    "com.example.demo",        // 기존
    "com.example.yproject"     // controller, config 패키지 포함
  }
)
public class MyformApplication {
  public static void main(String[] args) {
    SpringApplication.run(MyformApplication.class, args);
  }
}
