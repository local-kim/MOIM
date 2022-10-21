package com.project.cobell.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
//@Data
@Getter
@Setter
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
	@Column(name = "planned_at")    // TODO: 나중에 Camel -> snake 자동 변환되게
	private Timestamp plannedAt;
	private String area;
	private int age;
	private int limit;
	private int gender;
	private int online;
}
