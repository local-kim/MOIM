package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
//@Data
@Getter
@Setter
public class User {
	@Id // primary key
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment(기본 키 생성을 데이터베이스에 위임)
	private Long id;   // null값 사용 가능한 Long 타입 사용

	private String email;
	private String password;
	private String nickname;
	private int gender;
	private int age;
	private int goal;
	private int height;
	private int weight;
	private String title;
	private String content;

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
}
