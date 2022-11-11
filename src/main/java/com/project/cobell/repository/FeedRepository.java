package com.project.cobell.repository;

import com.project.cobell.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

	@Query(value = "select max(id) from feed", nativeQuery = true)
	Long getInsertedId();

//	@Query(value = "select f from Feed f, User u, PhotoFeed pf where f.user.id = u.id and f.id = pf.feed.id")
	List<Feed> findByUserId(Long userId);
}
