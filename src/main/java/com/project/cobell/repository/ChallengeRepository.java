package com.project.cobell.repository;

import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
	@Query(value = "select max(id) from challenge ", nativeQuery = true)
	Long getInsertedId();

//	@Query(value = "select Challenge , count(Challenge) as joined_users from Challenge, JoinChallenge where Challenge.id=JoinChallenge.challenge.id group by id")
//	@Query(value = "select challenge.id, challenge.leader_id, challenge.title, challenge.content, challenge.planned_at, challenge.area, challenge.age, challenge.`limit`, challenge.gender, challenge.online, challenge.status, challenge.created_at, count(*) as joinedUsers from challenge, join_challenge where challenge.id=join_challenge.challenge_id group by challenge.id", nativeQuery = true)
//	@Query(value = "select * from Challenge, JoinChallenge where Challenge.id=JoinChallenge.challenge.id group by id", nativeQuery = true)
//	List<Challenge> getCountedList();

	// 내가 만든 챌린지
	List<Challenge> findByLeaderId(Long userId);

	// 내가 참여한 챌린지
	@Query(value = "select c from JoinChallenge jc , Challenge c where c.id=jc.challenge.id and jc.user.id=:userId")
	List<Challenge> findJoinedChallenges(@Param("userId") Long userId);

	// 내가 좋아요 누른 챌린지
	@Query(value = "select c from Challenge c, LikeChallenge lc where c.id=lc.challenge.id and lc.user.id=:userId")
	List<Challenge> findLikedChallenges(@Param("userId") Long userId);
}
