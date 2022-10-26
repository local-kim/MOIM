package com.project.cobell.repository;

import com.project.cobell.entity.PhotoChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoChallengeRepository extends JpaRepository<PhotoChallenge, Long> {

}
