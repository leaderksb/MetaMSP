package com.MetaMSP.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class QuestionServiceDto {

    private OffsetDateTime qDate;
    private String qCategory;
    private String qTitle;
    private String qContent;
    private String qUrl;
    private String qPrt;
    private String qUser;
    private String qStatus;
    private Boolean qClose;

}
