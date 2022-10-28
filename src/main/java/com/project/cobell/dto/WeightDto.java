package com.project.cobell.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class WeightDto {
	private Long id;
	private float weight;
	private Long userId;
//	@JsonFormat(pattern = "yy.MM.dd", timezone = "Asia/Seoul")
	private Timestamp createdAt;
}
