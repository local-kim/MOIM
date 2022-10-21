package com.project.cobell.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@IdClass(JoinChallengeId.class)
//@AllArgsConstructor
//@NoArgsConstructor
public class JoinChallenge {
	@Id
	@ManyToOne  // JoinChallenge : Challenge = N : 1
	@JoinColumn(name = "challenge_id")
	private Challenge challenge;

	@Id
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private int status;
}
