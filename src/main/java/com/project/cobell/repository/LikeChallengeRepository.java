package com.project.cobell.repository;

import com.project.cobell.entity.LikeChallenge;
import com.project.cobell.entity.LikeChallengeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeChallengeRepository extends JpaRepository<LikeChallenge, Long> {
//	@Query(value = "")
	int countByChallengeIdAndUserId(Long challengeId, Long userId);
	int deleteByChallengeIdAndUserId(Long challengeId, Long userId);

	@Query(value = "select lc.challenge.id from LikeChallenge lc where lc.user.id=:userId order by lc.id desc")
	List<Long> findChallengeIdByUserId(@Param("userId") Long userId);
}
