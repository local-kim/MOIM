package com.project.cobell.service;

import com.project.cobell.dto.CommentFeedDto;
import com.project.cobell.dto.FeedDto;
import com.project.cobell.dto.LikeFeedDto;
import com.project.cobell.entity.*;
import com.project.cobell.repository.*;
import com.project.cobell.util.FileUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedService {

	@Autowired
	private FeedRepository feedRepository;

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PhotoFeedRepository photoFeedRepository;

	@Autowired
	private LikeFeedRepository likeFeedRepository;

	@Autowired
	private CommentFeedRepository commentFeedRepository;

	@Transactional
	public Long insertFeed(FeedDto feedDto){
		ModelMapper modelMapper = new ModelMapper();
		Feed feed = modelMapper.map(feedDto, Feed.class);
		feed.setUser(userRepository.findById(feedDto.getUserId()).get());

		feedRepository.save(feed);

		return feedRepository.getInsertedId();
	}

	@Transactional
	public void insertTags(List<String> tags, Long feedId){
		for(String t : tags){
			Tag tag = new Tag();

			tag.setId(null);
			tag.setFeed(feedRepository.findById(feedId).get());
			tag.setTag(t);

			tagRepository.save(tag);
		}
	}

	// 업로드 경로
	@Value("${custom.path.uploadImage}")
	private String uploadPath;

	@Transactional
	public String uploadImage(MultipartFile file){
		// 파일명 변환
		String fileName = FileUtil.convertFileName(file.getOriginalFilename());

		// 업로드할 폴더 위치
		String path = uploadPath + "feed_photo" + File.separator;

		// save 폴더에 업로드
		try {
			file.transferTo(new File(path + fileName));
		} catch (IllegalStateException | IOException e) {
			e.printStackTrace();
		}

//		// DB에 insert
//		this.insertFileName(feedId, fileName);

		return fileName;
	}

	@Transactional
	public void insertFileName(Long feedId, String fileName){
		PhotoFeed photoFeed = new PhotoFeed();
		photoFeed.setFeed(feedRepository.findById(feedId).get());
		photoFeed.setFileName(fileName);

		photoFeedRepository.save(photoFeed);
	}

	@Transactional
	public void deleteFeed(Long feedId){
		feedRepository.deleteById(feedId);
	}

	@Transactional
	public FeedDto getFeed(Long feedId){
//		Feed feed = feedRepository.findById(feedId).get();
		Feed feed = feedRepository.findByIdJoinFetch(feedId);

		ModelMapper modelMapper = new ModelMapper();
		FeedDto feedDto = modelMapper.map(feed, FeedDto.class);
//		tag: optional
		if(feed.getTags() != null)
			feedDto.setTags(feed.getTags().stream().map(tag -> tag.getTag()).collect(Collectors.toList()));
		feedDto.setFileNames(feed.getPhotoFeeds().stream().map(photoFeed -> photoFeed.getFileName()).collect(Collectors.toList()));
//		user photo: optional
		if(feed.getUser().getPhotoUser() != null)
			feedDto.setUserPhoto(feed.getUser().getPhotoUser().getFileName());
		feedDto.setUserName(feed.getUser().getNickname());

		return feedDto;
	}

	@Transactional
	public List<FeedDto> getFeedList(Long userId){
		List<Feed> feeds = feedRepository.findByUserIdOrderByCreatedAtDesc(userId);

//		System.out.println(feeds);

		ModelMapper modelMapper = new ModelMapper();
		List<FeedDto> feedDtos = new ArrayList<>();

		for(Feed feed : feeds){
//			FeedDto feedDto = modelMapper.map(feed, FeedDto.class); // N+1 유발(tag 엔티티가 필요 없음에도 dto 변환 과정에서 사용되어 tag도 select함)
			FeedDto feedDto = new FeedDto();
			feedDto.setId(feed.getId());
			feedDto.setFileNames(feed.getPhotoFeeds().stream().map(photoFeed -> photoFeed.getFileName()).collect(Collectors.toList()));
			feedDtos.add(feedDto);
		}

		return feedDtos;
	}

	@Transactional
	public int getLike(Long feedId, Long userId){
		return likeFeedRepository.countByFeedIdAndUserId(feedId, userId);
	}

	@Transactional
	public void insertLike(LikeFeedDto likeFeedDto){
		ModelMapper modelMapper = new ModelMapper();
		LikeFeed likeFeed = modelMapper.map(likeFeedDto, LikeFeed.class);
		likeFeedRepository.save(likeFeed);
	}

	@Transactional
	public void deleteLike(LikeFeedDto likeFeedDto){
		likeFeedRepository.deleteByFeedIdAndUserId(likeFeedDto.getFeedId(), likeFeedDto.getUserId());
	}

	@Transactional
	public int getLikeCount(Long feedId){
		return likeFeedRepository.countByFeedId(feedId);
	}

	@Transactional
	public List<CommentFeedDto> getCommentList(Long feedId){
		List<CommentFeed> commentFeeds = commentFeedRepository.findByFeedId(feedId);
		List<CommentFeedDto> commentFeedDtos = new ArrayList<>();
		ModelMapper modelMapper = new ModelMapper();

		for(CommentFeed commentFeed : commentFeeds){
			CommentFeedDto commentFeedDto = modelMapper.map(commentFeed, CommentFeedDto.class);
			commentFeedDto.setNickname(commentFeed.getUser().getNickname());
			if(commentFeed.getUser().getPhotoUser() != null)
				commentFeedDto.setPhoto(commentFeed.getUser().getPhotoUser().getFileName());
			commentFeedDtos.add(commentFeedDto);
		}

		return commentFeedDtos;
	}

	@Transactional
	public Long insertComment(CommentFeedDto commentFeedDto){
		ModelMapper modelMapper = new ModelMapper();
		CommentFeed commentFeed = modelMapper.map(commentFeedDto, CommentFeed.class);
//		commentFeed.setUser(userRepository.findById(commentFeedDto.getUserId()).get());
		commentFeed.setUser(userRepository.findById(commentFeedDto.getUserId()).get());
		commentFeed.setCreatedAt(new Timestamp(System.currentTimeMillis()));

		commentFeedRepository.save(commentFeed);

		return commentFeedRepository.getInsertedId();
	}

	@Transactional
	public void deleteComment(Long commentId){
		commentFeedRepository.deleteById(commentId);
	}
}
