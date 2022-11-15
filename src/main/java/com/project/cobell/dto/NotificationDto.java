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
	private Long targetUserId;
	private String targetUserNickname;
	private Long targetPostId;
	private String targetChallengeTitle;    // 챌린지만 제목 있음
	private String targetCommentContent;    // 댓글만 내용 있음
	private int read;
	private Timestamp createdAt;
}
