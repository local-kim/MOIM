package com.project.cobell.service;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.User;
import com.project.cobell.repository.ChallengeRepository;
import com.project.cobell.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChallengeService {

	@Autowired
	private ChallengeRepository challengeRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public void createChallenge(ChallengeDto challengeDto){
		// DTO to Entity
		ModelMapper modelMapper = new ModelMapper();
		Challenge challengeEntity = modelMapper.map(challengeDto, Challenge.class);
//		System.out.println(challengeEntity.toString());

		Optional<User> user = userRepository.findById(challengeDto.getLeaderId());
		challengeEntity.setUser(user.get());

		challengeRepository.save(challengeEntity);
	}

	@Transactional
	public List<ChallengeDto> getChallengeList(){
		List<Challenge> challenges = challengeRepository.findAll();
		System.out.println(challenges);

		ModelMapper modelMapper = new ModelMapper();

		return challenges.stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}
}
