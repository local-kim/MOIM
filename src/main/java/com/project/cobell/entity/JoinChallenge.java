package com.project.cobell.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@IdClass(JoinChallengeId.class)
@DynamicInsert
@DynamicUpdate
//@AllArgsConstructor
//@NoArgsConstructor
public class JoinChallenge {
	@Id
	@ManyToOne(fetch = FetchType.LAZY)  // JoinChallenge : Challenge = N : 1
	@JoinColumn(name = "challenge_id")  // 실제 fk 컬럼명
	private Challenge challenge;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)  // JoinChallenge : User = N : 1
	@JoinColumn(name = "user_id")
	private User user;

	private int status;
	private Timestamp createdAt;
}
