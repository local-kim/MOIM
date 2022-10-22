package com.project.cobell.service;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.JoinChallenge;
import com.project.cobell.entity.User;
import com.project.cobell.repository.ChallengeRepository;
import com.project.cobell.repository.JoinChallengeRepository;
import com.project.cobell.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChallengeService {

	@Autowired
	private ChallengeRepository challengeRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JoinChallengeRepository joinChallengeRepository;

	@Transactional
	public Long createChallenge(ChallengeDto challengeDto){
		// DTO to Entity
		ModelMapper modelMapper = new ModelMapper();
		Challenge challengeEntity = modelMapper.map(challengeDto, Challenge.class);
//		System.out.println(challengeEntity.toString());

		Optional<User> user = userRepository.findById(challengeDto.getLeaderId());
		challengeEntity.setLeader(user.get());
		user.get().getChallenges().add(challengeEntity);

		challengeRepository.save(challengeEntity);

		// 챌린지 만든 유저를 join_challenge 테이블에 insert
		Long insertedId = challengeRepository.getInsertedId();
		joinChallenge(insertedId, challengeDto.getLeaderId());

		// 만들어진 챌린지 id를 반환
		return insertedId;
	}

	@Transactional
	public List<ChallengeDto> getChallengeList(){
		List<Challenge> challenges = challengeRepository.findAll();
//		System.out.println(challenges);

		ModelMapper modelMapper = new ModelMapper();

		return challenges.stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}

	@Transactional
	public void joinChallenge(Long challengeId, Long userId){
		Challenge challenge = challengeRepository.findById(challengeId).get();
		User user = userRepository.findById(userId).get();

		JoinChallenge joinChallenge = new JoinChallenge();
		joinChallenge.setChallenge(challenge);
		joinChallenge.setUser(user);

		joinChallengeRepository.save(joinChallenge);
	}

	@Transactional
	public ChallengeDto getChallenge(Long challengeId){
		Challenge challenge = challengeRepository.findById(challengeId).get();

		ModelMapper modelMapper = new ModelMapper();
		ChallengeDto challengeDto = modelMapper.map(challenge, ChallengeDto.class);

		return challengeDto;
	}

	@Transactional
	public List<ChallengeDto> getCountedList(){
//		System.out.println(challengeRepository.getCountedList().get(0).toString());
//		List<Challenge> challenges = challengeRepository.findAll();
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findAll().stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());

//		return challengeRepository.getCountedList().stream()
//				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
//				.collect(Collectors.toList());
	}
}
