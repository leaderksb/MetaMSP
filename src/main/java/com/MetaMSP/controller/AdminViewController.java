package com.MetaMSP.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminViewController {

    @GetMapping("/admin")
    @ResponseBody
    public String admin() {
        return "admin";
    }

}
