package com.project.cobell.service;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.dto.LikeChallengeDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.entity.*;
import com.project.cobell.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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

	@Autowired
	private JoinChallengeRepository joinChallengeRepository;

	@Autowired
	private CommentChallengeRepository commentChallengeRepository;

	@Autowired
	private LikeChallengeRepository likeChallengeRepository;

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

	@Transactional
	public List<UserDto> getUserList(Long challengeId) {
//		System.out.println(joinChallengeRepository.findJoinedUsers(challengeId));

//		return null;
		ModelMapper modelMapper = new ModelMapper();

		return joinChallengeRepository.findJoinedUsers(challengeId).stream()
				.map(user -> modelMapper.map(user, UserDto.class))
				.collect(Collectors.toList());
	}

	@Transactional
	public int isJoined(Long challengeId, Long userId){
		return joinChallengeRepository.countByChallengeIdAndUserId(challengeId, userId);
	}

	@Transactional
	public void createComment(CommentChallengeDto commentChallengeDto){
		ModelMapper modelMapper = new ModelMapper();

		CommentChallenge commentChallenge = modelMapper.map(commentChallengeDto, CommentChallenge.class);
		commentChallenge.setChallenge(challengeRepository.findById(commentChallengeDto.getChallengeId()).get());
		commentChallenge.setUser(userRepository.findById(commentChallengeDto.getUserId()).get());

//		System.out.println(commentChallenge.toString());

		commentChallengeRepository.save(commentChallenge);
	}

	@Transactional
	public List<CommentChallengeDto> getCommentList(Long challengeId){
		ModelMapper modelMapper = new ModelMapper();

		return commentChallengeRepository.findByChallengeId(challengeId).stream()
				.map(comment -> modelMapper.map(comment, CommentChallengeDto.class))
				.collect(Collectors.toList());
	}

	@Transactional
	public void insertLike(LikeChallengeDto likeChallengeDto){
//		ModelMapper modelMapper = new ModelMapper();
//		LikeChallenge likeChallenge = modelMapper.map(likeChallengeDto, LikeChallenge.class);
		LikeChallenge likeChallenge = new LikeChallenge();
		likeChallenge.setChallenge(challengeRepository.findById(likeChallengeDto.getChallengeId()).get());
		likeChallenge.setUser(userRepository.findById(likeChallengeDto.getUserId()).get());

		likeChallengeRepository.save(likeChallenge);
	}

	@Transactional
	public int getLike(Long challengeId, Long userId){
		return likeChallengeRepository.countByChallengeIdAndUserId(challengeId, userId);
	}

	@Transactional
	public void deleteLike(LikeChallengeDto likeChallengeDto){
		likeChallengeRepository.deleteByChallengeIdAndUserId(likeChallengeDto.getChallengeId(), likeChallengeDto.getUserId());
	}

	@Transactional
	public List<Long> getLikeList(Long userId){
		return likeChallengeRepository.findChallengeIdByUserId(userId);
	}
}
