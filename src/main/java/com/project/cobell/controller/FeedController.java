package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.FeedDto;
import com.project.cobell.service.FeedService;
import com.project.cobell.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/feed")
public class FeedController {

	@Autowired
	private FeedService feedService;

	@Autowired
	private WeightService weightService;

	@PostMapping("/new")
	public Long insertFeed(
			@RequestPart("data") FeedDto feedDto,
			@RequestPart List<MultipartFile> files
	){
//		System.out.println(feedDto.toString());

		// 피드 insert(content) 후 feedId 반환
		Long feedId = feedService.insertFeed(feedDto);

		// 태그 insert(optional)
		if(feedDto.getTags().size() > 0)
			feedService.insertTags(feedDto.getTags(), feedId);

		// 몸무게 insert(optional)
		if(feedDto.getWeight() != 0)
			weightService.insertWeight(feedDto.getWeight(), feedDto.getUserId());

		for(MultipartFile file : files){
			// 사진 업로드
			String fileName = feedService.uploadImage(file);

			// 파일명 insert
			feedService.insertFileName(feedId, fileName);
		}

		// 피드 id 반환
		return feedId;
	}
}
