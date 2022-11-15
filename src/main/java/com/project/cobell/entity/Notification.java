package com.project.cobell.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@DynamicInsert
@ToString
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private int type;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "target_user_id")
	private User targetUser;

//	@ManyToOne
//	@JoinColumn(name = "challenge_id")
//	private Challenge challenge;
	private Long targetPostId;
	private Long targetCommentId;

	private String content;
	private int read;
	private Timestamp createdAt;
}
