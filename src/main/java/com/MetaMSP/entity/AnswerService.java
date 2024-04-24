package com.MetaMSP.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Table(name="answer_service")
@NoArgsConstructor(access= AccessLevel.PUBLIC)  // 인자 없는 생성자를 생성
@Getter
@Setter
@Entity
public class AnswerService {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="a_date", nullable=false, unique=false, insertable=false)
    private java.time.OffsetDateTime a_date;

    @Column(name="a_title", nullable=false, unique=false)
    private String a_title;

    @Column(name="a_content", nullable=false, unique=false)
    private String a_content;

    @Id
    @Column(name="a_url", nullable=false, unique=true)
    private String aUrl;

    @OneToOne
    @JoinColumn(name="q_url", referencedColumnName="q_url", insertable = false, updatable = false)
    private QuestionService questionService;

    @Column(name="q_url")
    private String qUrl;

    @OneToOne
    @JoinColumn(name="a_user", nullable=false, unique=false)
    private User a_user;

    @Column(name="a_close", nullable=false, unique=false)
    private Boolean a_close;

    public OffsetDateTime getQnADate() {
        return this.a_date;
    }

    public String getQnATitle() {
        return this.a_title;
    }

    public String getQnAContent() {
        return this.a_content;
    }

    public String getQnAPrt() {
        return this.qUrl;
    }
}
