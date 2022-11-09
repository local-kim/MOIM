package com.project.cobell.repository;

import com.project.cobell.entity.PhotoFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoFeedRepository extends JpaRepository<PhotoFeed, Long> {
}
