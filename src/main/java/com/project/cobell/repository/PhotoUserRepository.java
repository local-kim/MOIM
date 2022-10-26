package com.project.cobell.repository;

import com.project.cobell.entity.PhotoUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoUserRepository extends JpaRepository<PhotoUser, Long> {
	void deleteByUserId(Long userId);
}
