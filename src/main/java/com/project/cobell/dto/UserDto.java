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
	private float height;
	private float weight;
	private String bio;

	private String photo;
}
