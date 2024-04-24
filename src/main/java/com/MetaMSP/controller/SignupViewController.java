package com.MetaMSP.controller;

import com.MetaMSP.entity.User;
import com.MetaMSP.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

@RequiredArgsConstructor
@Controller
public class SignupViewController {

    private final UserService userService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/api/signup")
    public String signup(@RequestBody String json) {
        try {
            // JSON 데이터를 User 객체로 변환
            User user = objectMapper.readValue(json, User.class);

            // 회원정보를 DB에 삽입
            userService.userSave(user);

            return "redirect:/login";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

}
