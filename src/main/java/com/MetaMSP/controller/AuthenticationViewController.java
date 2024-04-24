package com.MetaMSP.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class AuthenticationViewController {

    @GetMapping("/login")
    public String login() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("[debug] auth.name = " + auth.getName());
        if (auth != null && !auth.getName().equals("anonymousUser")) {
            // 로그인 상태일 경우 User 페이지로 이동
            return "redirect:/user";
        } else {
            // 로그인 상태가 아닐 경우 인덱스 페이지로 이동
            return "redirect:/";
        }
    }

}
