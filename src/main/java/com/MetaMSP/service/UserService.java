package com.MetaMSP.service;

import com.MetaMSP.entity.User;
import com.MetaMSP.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // BCryptPasswordEncoder를 사용해 암호화 한 후 저장
    public User userSave(User user) {
        user.setRole("user");
        user.setPw(bCryptPasswordEncoder.encode(user.getPw()));

        return userRepository.save(user);
    }

    // BCryptPasswordEncoder를 사용해 암호화 한 후 저장
//    public User userSave(User user) {
//        return userRepository.save(User.builder()
//                .role(user.getRole())
//                .company(user.getCompany())
//                .name(user.getName())
//                .email(user.getEmail())
//                .id(user.getId())
//                .pw(bCryptPasswordEncoder.encode(user.getPw()))
//                .phone(user.getPhone())
//                .consent(user.getConsent())
//                .build());
//    }
}
