package com.project.cobell.repository;

import com.project.cobell.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
	@Query(value = "select max(id) from challenge ", nativeQuery = true)
	Long getInsertedId();
}
