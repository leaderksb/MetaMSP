package com.MetaMSP.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserViewController {

    @GetMapping("/user")
    @ResponseBody
    public String user() {
        return "user";
    }

}
