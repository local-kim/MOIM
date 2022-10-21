package com.project.cobell.dto;

import lombok.Data;

@Data
public class UserDto {
	private Long id;
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
