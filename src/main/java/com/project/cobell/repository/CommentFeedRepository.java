package com.project.cobell.repository;

import com.project.cobell.entity.CommentFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentFeedRepository extends JpaRepository<CommentFeed, Long> {
	List<CommentFeed> findByFeedId(Long feedId);
}
