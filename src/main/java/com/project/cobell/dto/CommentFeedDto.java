package com.project.cobell.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@Getter @Setter @ToString
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CommentFeedDto {
	private Long id;
	private Long feedId;
	private Long userId;
	private String content;
	private Timestamp createdAt;

	private String nickname;
	private String photo;
}
