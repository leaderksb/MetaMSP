package com.MetaMSP.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class QnAListDto {

    private OffsetDateTime dateTime;
    private String property;
    private String title;
    private String content;
    private String url;

}
