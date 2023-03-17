package com.project.cobell.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

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

	private Set<Integer> hobbyCodes;
}
