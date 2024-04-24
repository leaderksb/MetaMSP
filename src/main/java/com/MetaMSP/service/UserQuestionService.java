package com.MetaMSP.service;

import com.MetaMSP.entity.QuestionService;
import com.MetaMSP.entity.User;
import com.MetaMSP.repository.QuestionServiceRepository;
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
public class UserQuestionService {

    private final UserRepository userRepository;
    private final QuestionServiceRepository questionServiceRepository;

    public QuestionService questionServiceSave(QuestionService questionService) {
        LocalDateTime seoulTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String id = auth.getName();  // 로그인한 사용자의 ID를 가져옴

        System.out.println("질문 글 작성 시 로그인한 사용자의 Id를 가져옴 > " + id);

        String qUrl = questionService.getQ_title() + id + seoulTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        questionService.setQUrl(qUrl);

        System.out.println(qUrl);

        User q_user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        questionService.setQUser(q_user);

        System.out.println(q_user);

        questionService.setQ_status("OPEN");
        questionService.setQ_close(false);

        return questionServiceRepository.save(questionService);
    }

}
