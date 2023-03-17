package com.project.cobell.repository;

import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HobbyRepository extends JpaRepository<Hobby, Long> {
	void deleteByUserId(Long userId);
}
