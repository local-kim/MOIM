package com.project.cobell.service;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentChallengeDto;
import com.project.cobell.entity.PhotoChallenge;
import com.project.cobell.entity.PhotoUser;
import com.project.cobell.repository.ChallengeRepository;
import com.project.cobell.repository.PhotoUserRepository;
import com.project.cobell.repository.UserRepository;
import com.project.cobell.util.FileUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MypageService {

	@Autowired
	private ChallengeRepository challengeRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PhotoUserRepository photoUserRepository;

	@Transactional
	public List<ChallengeDto> getMyChallengeList(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findByLeaderId(userId).stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}

	@Transactional
	public List<ChallengeDto> getJoinedChallengeList(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findJoinedChallenges(userId).stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
	}

	@Transactional
	public List<ChallengeDto> getLikedChallengeList(Long userId){
		ModelMapper modelMapper = new ModelMapper();

		return challengeRepository.findLikedChallenges(userId).stream()
				.map(challenge -> modelMapper.map(challenge, ChallengeDto.class))
				.collect(Collectors.toList());
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
		String path = uploadPath + "user_photo" + File.separator;

		// save 폴더에 업로드
		try {
			file.transferTo(new File(path + fileName));
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}

		return fileName;
	}

	@Transactional
	public void insertFileName(Long userId, String fileName){
		// 테이블에 해당 유저의 데이터를 무조건 딜리트 후 인서트
		photoUserRepository.deleteByUserId(userId);

		PhotoUser photoUser = new PhotoUser();
		photoUser.setUser(userRepository.findById(userId).get());
		photoUser.setFileName(fileName);

		photoUserRepository.save(photoUser);
	}
}
