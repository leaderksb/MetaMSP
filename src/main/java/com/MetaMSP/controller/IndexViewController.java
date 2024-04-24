package com.MetaMSP.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class IndexViewController {

    @CrossOrigin(origins = "*")
    @GetMapping("/")
    public Map<String, String> index() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello MetaMSP");
        return response;  // {"message": "Hello MetaMSP"} 형태의 JSON을 반환
    }

}
