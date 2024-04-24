package com.MetaMSP.controller;

import com.MetaMSP.dto.QnAListDto;
import com.MetaMSP.entity.AnswerService;
import com.MetaMSP.entity.QuestionService;
import com.MetaMSP.repository.AnswerServiceRepository;
import com.MetaMSP.repository.QuestionServiceRepository;
import com.MetaMSP.service.AdminAnswerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
public class AdminAnswerViewController {

    private final AdminAnswerService adminAnswerService;
    private final QuestionServiceRepository questionServiceRepository;
    private final AnswerServiceRepository answerServiceRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/api/admin/question/service/list")
    @ResponseBody
    public ResponseEntity<List<QuestionService>> api_admin_question_service_list() {
        List<QuestionService> questionServiceList = questionServiceRepository.findAll()
                .stream()
                .filter(questionService -> questionService.getQPrt() == null)
                .collect(Collectors.toList());

        return new ResponseEntity<>(questionServiceList, HttpStatus.OK);
    }

    @GetMapping("/api/admin/question/service/{qUrl}")
    @ResponseBody
    public Map<String, Object> api_admin_question_service_qUrl(@PathVariable String qUrl) {
        // 문의 조회
        QuestionService questionService = questionServiceRepository.findByqUrl(qUrl)
                .orElseThrow(() -> new IllegalArgumentException("Invalid URL : " + qUrl));

        // 문의와 답변을 시간 순서대로 정렬하여 함께 조회하여 DTO에 담기
        List<QnAListDto> qnaList = new ArrayList<>();

        // 문의를 조회해 DTO에 담기
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

    @PostMapping("/api/admin/answer/service/add")
    @ResponseBody
    public String api_admin_question_service_add(@RequestBody String json) {
        try {
            AnswerService answerService = objectMapper.readValue(json, AnswerService.class);

            adminAnswerService.answerServiceSave(answerService);

            return "AdminAnswerService";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

}
