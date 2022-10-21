package com.project.cobell.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class ChallengeDto {
	private Long id;
	private Long leaderId;
	private String title;
	private String content;
	@JsonFormat(timezone="Asia/Seoul")
	private Timestamp plannedAt;
	private String area;
	private int age;
	private int limit;
	private int gender;
	private int online;
}
