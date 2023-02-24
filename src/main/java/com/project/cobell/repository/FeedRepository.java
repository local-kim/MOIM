package com.project.cobell.repository;

import com.project.cobell.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {

	@Query(value = "select max(id) from feed", nativeQuery = true)
	Long getInsertedId();

	@Query(value = "select distinct f from Feed f join fetch f.photoFeeds where f.user.id = :userId order by f.createdAt desc")
	List<Feed> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

	@Query(value = "select f from Feed f left outer join fetch f.tags join fetch f.photoFeeds join fetch f.user as u left outer join fetch u.photoUser where f.id = :feedId")
	Feed findByIdJoinFetch(@Param("feedId") Long feedId);
}
