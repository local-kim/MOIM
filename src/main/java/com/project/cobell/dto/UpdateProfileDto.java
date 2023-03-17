package com.project.cobell.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UpdateProfileDto {
	private String bio;
	private Set<Integer> hobbyCodes;
}
