package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @Setter @ToString
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
	@OneToMany(mappedBy = "leader", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Challenge> challenges = new ArrayList<>();

	// User : JoinChallenge = 1 : N
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<JoinChallenge> joinChallenges = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<CommentChallenge> commentChallenges = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<LikeChallenge> likeChallenges = new ArrayList<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Weight> weights = new ArrayList<>();

	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
	private PhotoUser photoUser;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Notification> notifications = new ArrayList<>();

	@OneToMany(mappedBy = "targetUser", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Notification> targetNotifications = new ArrayList<>();
}
