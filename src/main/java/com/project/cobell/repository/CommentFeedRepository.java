package com.project.cobell.repository;

import com.project.cobell.entity.CommentFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentFeedRepository extends JpaRepository<CommentFeed, Long> {
	@Query(value = "select c from CommentFeed c join fetch c.user as u left outer join fetch u.photoUser where c.feed.id = :feedId")
	List<CommentFeed> findByFeedId(@Param("feedId") Long feedId);

	@Query(value = "select max(id) from comment_feed", nativeQuery = true)
	Long getInsertedId();
}
