package com.project.cobell.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class NotificationDto {
	private Long id;
	private int type;
	private Long userId;
	private String targetUserNickname;
	private Long challengeId;
	private String challengeTitle;
	private String content;
	private int read;
	private Timestamp createdAt;
}
