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
import java.util.HashSet;
import java.util.Set;

@Entity
//@Data
@Getter
@Setter
//@ToString
@DynamicInsert
public class Challenge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)  // Challenge : User = Many : One
	@JoinColumn(name = "leader_id", referencedColumnName = "id")
	private User leader;
//	private Long leaderId;

	private int type;
	private String title;
	private String content;
//	@Column(name = "planned_at")    // TODO: 나중에 Camel -> snake 자동 변환되게
	private Timestamp plannedAt;
	private String area;
	private int age;
	private int limit;
	private int gender;
	private int online;
	private int status;
	private Timestamp createdAt;

	// Challenge : JoinChallenge = 1 : N
	@OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<JoinChallenge> joinChallenges = new HashSet<>();

	@OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<CommentChallenge> commentChallenges = new HashSet<>();

	@OneToMany(mappedBy = "challenge", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<LikeChallenge> likeChallenges = new HashSet<>();

	@OneToOne(mappedBy = "challenge", fetch = FetchType.LAZY)   // 1:1 연관 관계의 주인
//	@JoinColumn(name = "id")
	private PhotoChallenge photoChallenge;

//	@OneToMany(mappedBy = "challenge")
//	private Set<Notification> notifications = new HashSet<>();

//	@Transient
	@Formula("(select count(*) from join_challenge jc where jc.challenge_id = id and jc.status = 1)")
	private int joinedUsers;

	// 로그인 유저의 좋아요 여부 -> user_id를 엔티티에 넘길 수 없음
//	@Formula("(select count(*) from like_challenge lc where lc.challenge_id=id and lc.user_id=1)")
//	private int likeOn;
}
