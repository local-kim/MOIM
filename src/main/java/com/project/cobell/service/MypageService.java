package com.project.cobell.service;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.repository.ChallengeRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MypageService {

	@Autowired
	private ChallengeRepository challengeRepository;

	public List<ChallengeDto> getMyChallengeList(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findByLeaderId(userId).stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}

	public List<ChallengeDto> getJoinedChallengeList(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findJoinedChallenges(userId).stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}

	public List<ChallengeDto> getLikedChallengeList(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findLikedChallenges(userId).stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}
}
