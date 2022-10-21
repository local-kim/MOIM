package com.project.cobell.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
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
}
