package com.project.cobell.repository;

import com.project.cobell.entity.LikeChallenge;
import com.project.cobell.entity.LikeChallengeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeChallengeRepository extends JpaRepository<LikeChallenge, LikeChallengeId> {
//	@Query(value = "")
	int countByChallengeIdAndUserId(Long challengeId, Long userId);
	int deleteByChallengeIdAndUserId(Long challengeId, Long userId);
}
