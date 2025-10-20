package com.example.yproject.controller;

import com.example.yproject.domain.User;
import com.example.yproject.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserDebugController {
  private final UserMapper userMapper;
  public UserDebugController(UserMapper userMapper){ this.userMapper = userMapper; }

  @GetMapping("/users")
  public List<User> users(){ return userMapper.findAll(); }
}
