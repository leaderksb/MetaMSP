package com.MetaMSP.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.List;

@Table(name="question_service")
@NoArgsConstructor(access= AccessLevel.PUBLIC)  // 인자 없는 생성자를 생성
@Getter
@Setter
@Entity
public class QuestionService {

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="q_date", nullable=false, unique=false, insertable=false)
    private java.time.OffsetDateTime q_date;

    @Column(name="q_category", nullable=false, unique=false)
    private String qCategory;

    @Column(name="q_title", nullable=false, unique=false)
    private String q_title;

    @Column(name="q_content", nullable=false, unique=false)
    private String q_content;

    @Id
    @Column(name="q_url", nullable=false, unique=true)
    private String qUrl;

    @OneToMany
    @JoinColumn(name="q_prt", referencedColumnName="q_prt", insertable = false, updatable = false)
    private List<QuestionService> questionService;

    @Column(name="q_prt")
    private String qPrt;

    @OneToOne
    @JoinColumn(name="q_user", nullable=false, unique=false)
    private User qUser;

    @Column(name="q_status", nullable=false, unique=false)
    private String q_status;

    @Column(name="q_close", nullable=false, unique=false)
    private Boolean q_close;

    public OffsetDateTime getQnADate() {
        return this.q_date;
    }

    public String getQnATitle() {
        return this.q_title;
    }

    public String getQnAContent() {
        return this.q_content;
    }

    public String getQnAPrt() {
        return this.qPrt;
    }

    @Override
    public String toString() {
        return "QuestionService{" +
                "qUrl='" + qUrl + '\'' +
                ", qCategory='" + qCategory + '\'' +
                ", qPrt='" + qPrt + '\'' +
                ", qUser=" + qUser +
                ", qClose=" + q_close +
                ", qContent='" + q_content + '\'' +
                ", qDate=" + q_date +
                ", qStatus='" + q_status + '\'' +
                ", qTitle='" + q_title + '\'' +
                '}';
    }
}
