package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
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
public class Challenge {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)  // Challenge : User = Many : One
	@JoinColumn(name = "leader_id", referencedColumnName = "id")
	private User leader;
//	private Long leaderId;

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
	@OneToMany(mappedBy = "challenge")
//	@JoinColumn(name = "challenge_id")
	@JsonIgnore
	private Set<JoinChallenge> joinChallenges = new HashSet<>();

//	@Transient
	@Formula("(select count(*) from join_challenge jc where jc.challenge_id=id)")
	private int joinedUsers;
}
