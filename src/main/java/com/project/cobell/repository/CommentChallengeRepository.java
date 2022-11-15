package com.project.cobell.repository;

import com.project.cobell.entity.CommentChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentChallengeRepository extends JpaRepository<CommentChallenge, Long> {
	List<CommentChallenge> findByChallengeId(Long challengeId);

	@Query(value = "select max(id) from comment_challenge", nativeQuery = true)
	Long getInsertedId();
}
