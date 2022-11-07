package com.project.cobell.service;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.dto.LikeChallengeDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.entity.*;
import com.project.cobell.repository.*;
import com.project.cobell.util.FileUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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

	@Autowired
	private PhotoChallengeRepository photoChallengeRepository;

	@Autowired
	private NotificationRepository notificationRepository;

	@Transactional
	public Long createChallenge(ChallengeDto challengeDto){
		// DTO to Entity
		ModelMapper modelMapper = new ModelMapper();
		Challenge challengeEntity = modelMapper.map(challengeDto, Challenge.class);
//		System.out.println(challengeEntity.toString());

//		Optional<User> user = userRepository.findById(challengeDto.getLeaderId());
		challengeEntity.setLeader(userRepository.findById(challengeDto.getLeaderId()).get());
//		user.get().getChallenges().add(challengeEntity);

		challengeRepository.save(challengeEntity);

		// 챌린지 만든 유저를 join_challenge 테이블에 insert
		Long insertedId = challengeRepository.getInsertedId();
		insertJoinedUser(insertedId, challengeDto.getLeaderId());

		// 만들어진 챌린지 id를 반환
		return insertedId;
	}

	// 업로드 경로
	@Value("${custom.path.uploadImage}")
	private String uploadPath;

	@Transactional
	public String uploadImage(MultipartFile file){
		// 파일명 변환
		String fileName = FileUtil.convertFileName(file.getOriginalFilename());

		// 업로드할 폴더 위치
//		String path = request.getServletContext().getRealPath("/save");
		String path = uploadPath + "challenge_photo" + File.separator;

		// save 폴더에 업로드
		try {
			file.transferTo(new File(path + fileName));
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}

		return fileName;
	}

	@Transactional
	public void insertFileName(Long challengeId, String fileName){
		PhotoChallenge photoChallenge = new PhotoChallenge();
		photoChallenge.setChallenge(challengeRepository.findById(challengeId).get());
		photoChallenge.setFileName(fileName);

		photoChallengeRepository.save(photoChallenge);
	}

	@Transactional
	public void deleteChallenge(Long challengeId){
		challengeRepository.deleteById(challengeId);
	}

	@Transactional
	public List<ChallengeDto> getChallengeList(){
		List<Challenge> challenges = challengeRepository.findAll();
//		System.out.println(challenges);

		ModelMapper modelMapper = new ModelMapper();

		List<ChallengeDto> challengeDtos = new ArrayList<>();

		for(Challenge challenge : challenges){
			ChallengeDto challengeDto = modelMapper.map(challenge, ChallengeDto.class);
			challengeDto.setPhoto(challenge.getPhotoChallenge().getFileName());
			challengeDtos.add(challengeDto);
		}

		return challengeDtos;

//		return challenges.stream()
//				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
//				.collect(Collectors.toList());
	}

	@Transactional
	public void insertJoinedUser(Long challengeId, Long userId){
		Challenge challenge = challengeRepository.findById(challengeId).get();
		User user = userRepository.findById(userId).get();

		JoinChallenge joinChallenge = new JoinChallenge();
		joinChallenge.setChallenge(challenge);
		joinChallenge.setUser(user);

		joinChallengeRepository.save(joinChallenge);
	}

	@Transactional
	public void deleteJoinedUser(Long challengeId, Long userId){
//		Challenge challenge = challengeRepository.findById(challengeId).get();
//		User user = userRepository.findById(userId).get();
//
//		JoinChallenge joinChallenge = new JoinChallenge();
//		joinChallenge.setChallenge(challenge);
//		joinChallenge.setUser(user);
//
//		joinChallengeRepository.save(joinChallenge);
		JoinChallengeId joinChallengeId = new JoinChallengeId(challengeId, userId);
		joinChallengeRepository.deleteById(joinChallengeId);
	}

	@Transactional
	public ChallengeDto getChallenge(Long challengeId){
		Challenge challenge = challengeRepository.findById(challengeId).get();

		ModelMapper modelMapper = new ModelMapper();
		ChallengeDto challengeDto = modelMapper.map(challenge, ChallengeDto.class);
		challengeDto.setPhoto(challenge.getPhotoChallenge().getFileName());

		return challengeDto;
	}

	@Transactional
	public List<ChallengeDto> getCountedList(){
//		List<Challenge> challenges = challengeRepository.findAll();
		List<Challenge> challenges = challengeRepository.findAllOrderByCreatedAtDesc();
//		System.out.println(challenges);

		ModelMapper modelMapper = new ModelMapper();

		List<ChallengeDto> challengeDtos = new ArrayList<>();

		for(Challenge challenge : challenges){
			ChallengeDto challengeDto = modelMapper.map(challenge, ChallengeDto.class);
			challengeDto.setPhoto(challenge.getPhotoChallenge().getFileName());
			challengeDtos.add(challengeDto);
		}

		return challengeDtos;
//		System.out.println(challengeRepository.getCountedList().get(0).toString());
//		List<Challenge> challenges = challengeRepository.findAll();
//		ModelMapper modelMapper = new ModelMapper();

//		return challengeRepository.findAll().stream()
//				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
//				.collect(Collectors.toList());
	}

	@Transactional
	public List<UserDto> getUserList(Long challengeId) {
		ModelMapper modelMapper = new ModelMapper();

		List<User> users = joinChallengeRepository.findJoinedUsers(challengeId);

		List<UserDto> userDtos = new ArrayList<>();

		for(User u : users){
			UserDto userDto = modelMapper.map(u, UserDto.class);

			if(u.getPhotoUser() != null) {
				userDto.setPhoto(u.getPhotoUser().getFileName());  // error
			}

			userDtos.add(userDto);
		}

		return userDtos;

//		return joinChallengeRepository.findJoinedUsers(challengeId).stream()
//				.map(user -> modelMapper.map(user, UserDto.class))
//				.collect(Collectors.toList());
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
		commentChallenge.setCreatedAt(new Timestamp(System.currentTimeMillis()));   // DB에서 default값 대신에 현재 시각 구해서 넣어주기

//		System.out.println(commentChallenge.toString());

		commentChallengeRepository.save(commentChallenge);
	}

	@Transactional
	public void deleteComment(Long commentId){
		commentChallengeRepository.deleteById(commentId);
	}

	@Transactional
	public List<CommentChallengeDto> getCommentList(Long challengeId){
//		ModelMapper modelMapper = new ModelMapper();
//
////		System.out.println(commentChallengeRepository.findByChallengeId(challengeId).get(0).getUser());
//
//		return commentChallengeRepository.findByChallengeId(challengeId).stream()
//				.map(comment -> modelMapper.map(comment, CommentChallengeDto.class))
//				.collect(Collectors.toList());

		ModelMapper modelMapper = new ModelMapper();

		List<CommentChallenge> commentChallenges = commentChallengeRepository.findByChallengeId(challengeId);
		List<CommentChallengeDto> commentChallengeDtos = new ArrayList<>();

		for(CommentChallenge commentChallenge : commentChallenges){
			CommentChallengeDto commentChallengeDto = modelMapper.map(commentChallenge, CommentChallengeDto.class);
			commentChallengeDto.setNickname(commentChallenge.getUser().getNickname());
			if(commentChallenge.getUser().getPhotoUser() != null)
				commentChallengeDto.setPhoto(commentChallenge.getUser().getPhotoUser().getFileName());
			commentChallengeDtos.add(commentChallengeDto);
		}

		return commentChallengeDtos;
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
