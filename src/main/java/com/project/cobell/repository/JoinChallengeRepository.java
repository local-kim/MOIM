package com.project.cobell.repository;

import com.project.cobell.entity.JoinChallenge;
import com.project.cobell.entity.JoinChallengeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinChallengeRepository extends JpaRepository<JoinChallenge, JoinChallengeId> {
//	@Query(value = "select count(*) from join_challenge where challenge_id=1")
//	public int countUser();
}
