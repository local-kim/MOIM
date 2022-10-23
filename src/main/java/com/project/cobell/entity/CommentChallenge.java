package com.project.cobell.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@DynamicInsert
public class CommentChallenge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "challenge_id")
	private Challenge challenge;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private String content;
	private Timestamp createdAt;
}
