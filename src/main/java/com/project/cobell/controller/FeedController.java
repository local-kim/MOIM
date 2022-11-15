package com.project.cobell.controller;

import com.project.cobell.dto.ChallengeDto;
import com.project.cobell.dto.CommentFeedDto;
import com.project.cobell.dto.FeedDto;
import com.project.cobell.dto.LikeFeedDto;
import com.project.cobell.entity.Feed;
import com.project.cobell.service.FeedService;
import com.project.cobell.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/feed")
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

	@DeleteMapping("/delete/{feedId}")
	public void deleteFeed(
			@PathVariable Long feedId
	){
		feedService.deleteFeed(feedId);
	}

	@GetMapping("/{feedId}")
	public FeedDto getFeed(
			@PathVariable Long feedId
	){
		return feedService.getFeed(feedId);
	}

	@GetMapping("/list/{userId}")
	public List<FeedDto> getFeedList(
			@PathVariable Long userId
	){
		return feedService.getFeedList(userId);
	}

	@GetMapping("/like/{feedId}/{userId}")
	public int getLike(
			@PathVariable Long feedId, @PathVariable Long userId
	){
		return feedService.getLike(feedId, userId);
	}

	@PostMapping("/like/insert")
	public void insertLike(
			@RequestBody LikeFeedDto likeFeedDto
	){
		feedService.insertLike(likeFeedDto);
	}

	@DeleteMapping("/like/delete")
	public void deleteLike(
			@RequestBody LikeFeedDto likeFeedDto
	){
		feedService.deleteLike(likeFeedDto);
	}

	@GetMapping("/comment/list/{feedId}")
	public List<CommentFeedDto> getCommentList(
			@PathVariable Long feedId
	){
		return feedService.getCommentList(feedId);
	}

	@PostMapping("/comment/insert")
	public List<CommentFeedDto> insertComment(
			@RequestBody CommentFeedDto commentFeedDto
	){
		feedService.insertComment(commentFeedDto);

		return feedService.getCommentList(commentFeedDto.getFeedId());
	}

	@DeleteMapping("/comment/delete")
	public List<CommentFeedDto> deleteComment(
			@RequestBody CommentFeedDto commentFeedDto
	){
		feedService.deleteComment(commentFeedDto.getId());

		return feedService.getCommentList(commentFeedDto.getFeedId());
	}
}
