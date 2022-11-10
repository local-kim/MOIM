package com.project.cobell.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class FeedDto {
	private Long id;
	private Long userId;
	private String userName;
	private String userPhoto;
	private String content;
	private List<String> tags;
	private float weight;

	private List<String> fileNames;
}
