package com.project.cobell.repository;

import com.project.cobell.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

	@Query(value = "select max(id) from feed", nativeQuery = true)
	Long getInsertedId();
}
