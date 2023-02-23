package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicInsert
@ToString
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
	private Set<Challenge> challenges = new HashSet<>();

	// User : JoinChallenge = 1 : N
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<JoinChallenge> joinChallenges = new HashSet<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<CommentChallenge> commentChallenges = new HashSet<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<LikeChallenge> likeChallenges = new HashSet<>();

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<Weight> weights = new HashSet<>();

	@OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
//	@JsonIgnore
	private PhotoUser photoUser;

	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private Set<Notification> notifications = new HashSet<>();

	@OneToMany(mappedBy = "targetUser", fetch = FetchType.LAZY)
	private Set<Notification> targetNotifications = new HashSet<>();

//	@Formula("(select fileName from photo_user pu where pu.user_id=id)")
//	private String fileName;
}
