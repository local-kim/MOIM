package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicInsert
public class User {
	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment(기본 키 생성을 데이터베이스에 위임)
	private Long id;   // null값 사용 가능한 Long 타입 사용

	private String email;
	@JsonIgnore // 제외하고 SELECT
	private String password;
	private String nickname;
	private int gender;
	private int age;
	private int goal;
	private float height;
	private String bio;

	// User : Challenges = 1 : N
	@OneToMany(mappedBy = "leader")
	@JsonIgnore
	private Set<Challenge> challenges = new HashSet<>();

	// User : JoinChallenge = 1 : N
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<JoinChallenge> joinChallenges = new HashSet<>();

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<CommentChallenge> commentChallenges = new HashSet<>();

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<LikeChallenge> likeChallenges = new HashSet<>();

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private Set<Weight> weights = new HashSet<>();

	@OneToOne(mappedBy = "user")
	private PhotoUser photoUser;
}
