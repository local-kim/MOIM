package com.project.cobell.dto;

import lombok.Data;

@Data
public class UserDto {
	private Long num;
	private String id;
	private String password;
	private String nickname;
	private String email;
	private int gender;
	private int age;
	private int goal;
	private int height;
	private int weight;
	private String title;
	private String content;
}
