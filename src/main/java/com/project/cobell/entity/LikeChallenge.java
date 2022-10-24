package com.project.cobell.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@IdClass(LikeChallengeId.class)
public class LikeChallenge {
	@Id
	@ManyToOne  // JoinChallenge : Challenge = N : 1
	@JoinColumn(name = "challenge_id")  // 실제 fk 컬럼명
	private Challenge challenge;

	@Id
	@ManyToOne  // JoinChallenge : User = N : 1
	@JoinColumn(name = "user_id")
	private User user;
}
