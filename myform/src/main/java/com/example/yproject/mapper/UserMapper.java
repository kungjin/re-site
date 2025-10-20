package com.example.yproject.mapper;

import com.example.yproject.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper // ← @MapperScan 없이도 인식되게 안전빵
public interface UserMapper {
  List<User> findAll();
  User findByEmail(@Param("email") String email);
  int insert(User user);
}

