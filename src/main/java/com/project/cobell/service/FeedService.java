package com.project.cobell.service;

import com.project.cobell.dto.FeedDto;
import com.project.cobell.entity.Feed;
import com.project.cobell.entity.Tag;
import com.project.cobell.repository.FeedRepository;
import com.project.cobell.repository.TagRepository;
import com.project.cobell.repository.UserRepository;
import com.project.cobell.util.FileUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class FeedService {

	@Autowired
	private FeedRepository feedRepository;

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private UserRepository userRepository;

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
			tag.setFeed(feedRepository.findById(feedId).get());
			tag.setTag(t);

			tagRepository.save(tag);
		}
	}

	// 업로드 경로
	@Value("${custom.path.uploadImage}")
	private String uploadPath;

//	@Transactional
//	public void uploadImage(MultipartFile file){
//		// 파일명 변환
//		String fileName = FileUtil.convertFileName(file.getOriginalFilename());
//
//		// 업로드할 폴더 위치
////		String path = request.getServletContext().getRealPath("/save");
//		String path = uploadPath + "feed_photo" + File.separator;
//
//		// save 폴더에 업로드
//		try {
//			file.transferTo(new File(path + fileName));
//		} catch (IllegalStateException | IOException e) {
//			e.printStackTrace();
//		}
//
//		return fileName;
//	}
}
