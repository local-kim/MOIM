package com.project.cobell.dto;

import lombok.Data;

import java.sql.Date;
import java.sql.Timestamp;

@Data
public class ChallengeDto {
	private Long id;
	private Long leader;
	private String title;
	private String content;
	private Date startDate;
	private Date endDate;
	private Timestamp time;
	private String area;
	private int age;
	private int limit;
	private int gender;
	private int online;
}
