package com.MetaMSP.dto;

import com.MetaMSP.entity.QuestionService;
import com.MetaMSP.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class AnswerServiceDto {
    
    private OffsetDateTime aDate;
    private String aTitle;
    private String aContent;
    private String aUrl;
    private String qUrl;
    private String aUser;
    private Boolean aClose;

    // 생성자, 게터, 세터 등 필요한 메서드 추가 가능
}
