package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @Setter
@DynamicInsert
public class Challenge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Challenge : Leader = Many : One
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "leader_id", referencedColumnName = "id")
	private User leader;

	private int type;
	private String title;
	private String content;
	private Timestamp plannedAt;
	private String area;
	private int age;
	private int limit;
	private int gender;
	private int online;
	private int status;
	private int category;
	private Timestamp createdAt;

	// Challenge : JoinChallenge = 1 : N
	@OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<JoinChallenge> joinChallenges = new ArrayList<>();

	@OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<CommentChallenge> commentChallenges = new ArrayList<>();

	@OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<LikeChallenge> likeChallenges = new ArrayList<>();

	@OneToOne(mappedBy = "challenge", fetch = FetchType.LAZY)   // 1:1 연관 관계의 주인
	private PhotoChallenge photoChallenge;

//	@OneToMany(mappedBy = "challenge")
//	private Set<Notification> notifications = new HashSet<>();

//	@Transient
	@Formula("(select count(*) from join_challenge jc where jc.challenge_id = id and jc.status = 1)")
	private int joinedUsers;
}
