package com.project.cobell.repository;

import com.project.cobell.entity.CommentChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentChallengeRepository extends JpaRepository<CommentChallenge, Long> {
	@Query(value = "select c from CommentChallenge c join fetch c.user as u left outer join fetch u.photoUser where c.challenge.id = :challengeId")
	List<CommentChallenge> findByChallengeId(@Param("challengeId") Long challengeId);

	@Query(value = "select max(id) from comment_challenge", nativeQuery = true)
	Long getInsertedId();
}
