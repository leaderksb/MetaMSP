package com.MetaMSP.service;

import com.MetaMSP.entity.AnswerService;
import com.MetaMSP.entity.User;
import com.MetaMSP.repository.AnswerServiceRepository;
import com.MetaMSP.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@RequiredArgsConstructor
@Service
public class AdminAnswerService {

    private final UserRepository userRepository;
    private final AnswerServiceRepository answerServiceRepository;

    public void answerServiceSave(AnswerService answerService) {
        LocalDateTime seoulTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String id = auth.getName();  // 로그인한 사용자의 ID를 가져옴

        String aUrl = answerService.getA_title() + id + seoulTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        answerService.setAUrl(aUrl);

        User a_user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        answerService.setA_user(a_user);

//        answerService.setA_status("OPEN");
        answerService.setA_close(false);

//        answerService.setQUrl(qUrl);

        answerServiceRepository.save(answerService);

    }

}
