package com.MetaMSP.controller;

import com.MetaMSP.dto.QnAListDto;
import com.MetaMSP.entity.AnswerService;
import com.MetaMSP.entity.QuestionService;
import com.MetaMSP.entity.User;
import com.MetaMSP.repository.AnswerServiceRepository;
import com.MetaMSP.repository.QuestionServiceRepository;
import com.MetaMSP.repository.UserRepository;
import com.MetaMSP.service.UserQuestionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
public class UserQuestionViewController {

    private final UserRepository userRepository;
    private final UserQuestionService userQuestionService;
    private final QuestionServiceRepository questionServiceRepository;
    private final AnswerServiceRepository answerServiceRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/api/user/question/service/first")
    @ResponseBody
    public String api_user_question_service_first(@RequestBody String json) {
        try {
            // JSON 데이터를 QuestionService 객체로 변환
            QuestionService questionService = objectMapper.readValue(json, QuestionService.class);

            userQuestionService.questionServiceSave(questionService);

            return "UserQuestionServiceList";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    @GetMapping("/api/user/question/service/list")
    @ResponseBody
    public List<QuestionService> api_user_question_service_list() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String id = auth.getName();  // 로그인한 사용자의 ID를 가져옴

        Optional<User> user = userRepository.findById(id);
        List<QuestionService> questionServiceList = null;

        if (user.isPresent()) {
            List<QuestionService> qUserList = questionServiceRepository.findByqUser(user.get());
            questionServiceList = qUserList.stream()
                    .filter(questionService -> questionService.getQPrt() == null)
                    .collect(Collectors.toList());
        }
//        return new ResponseEntity<>(questionServiceList, HttpStatus.OK);
        return questionServiceList;
    }

    @GetMapping("/api/user/question/service/{qUrl}")
    @ResponseBody
    public Map<String, Object> api_user_question_service_qUrl(@PathVariable String qUrl) {
        // 질문 조회
        QuestionService questionService = questionServiceRepository.findByqUrl(qUrl)
                .orElseThrow(() -> new IllegalArgumentException("Invalid URL : " + qUrl));

        // 질문과 답변을 시간 순서대로 정렬하여 함께 조회하여 DTO에 담기
        List<QnAListDto> qnaList = new ArrayList<>();

        // 질문을 조회해 DTO에 담기
        List<QuestionService> questionServices = questionServiceRepository.findByqPrt(qUrl);
        for (QuestionService qService : questionServices) {
            QnAListDto questionDto = new QnAListDto();
            questionDto.setDateTime(qService.getQnADate());
            questionDto.setProperty("Question");
            questionDto.setTitle(qService.getQnATitle());
            questionDto.setContent(qService.getQnAContent());
            questionDto.setUrl(qService.getQUrl());
            qnaList.add(questionDto);
        }

        // 답변을 조회해 DTO에 담기
        List<AnswerService> answerServices = answerServiceRepository.findByqUrl(qUrl);
        for (AnswerService aService : answerServices) {
            QnAListDto answerDto = new QnAListDto();
            answerDto.setDateTime(aService.getQnADate());
            answerDto.setProperty("Answer");
            answerDto.setTitle(aService.getQnATitle());
            answerDto.setContent(aService.getQnAContent());
            answerDto.setUrl(aService.getAUrl());
            qnaList.add(answerDto);
        }

        // qnaList를 날짜 기준으로 정렬
        qnaList.sort(Comparator.comparing(QnAListDto::getDateTime));

        // 정렬된 리스트를 반환
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("questionService", questionService);
        responseData.put("qnaList", qnaList);

        return responseData;
    }

    @PostMapping("/api/user/question/service/add")
    @ResponseBody
    public String api_user_question_service_add(@RequestBody String json) {
        try {
            // JSON 데이터를 QuestionService 객체로 변환
            QuestionService questionService = objectMapper.readValue(json, QuestionService.class);

            userQuestionService.questionServiceSave(questionService);

            return "UserQuestionServiceList";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

}
