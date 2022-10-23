package com.project.cobell.repository;

import com.project.cobell.entity.CommentChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentChallengeRepository extends JpaRepository<CommentChallenge, Long> {

}
