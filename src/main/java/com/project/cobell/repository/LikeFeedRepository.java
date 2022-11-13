package com.project.cobell.repository;

import com.project.cobell.entity.LikeFeed;
import com.project.cobell.entity.LikeFeedId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeFeedRepository extends JpaRepository<LikeFeed, LikeFeedId> {
	int countByFeedIdAndUserId(Long feedId, Long userId);
	int deleteByFeedIdAndUserId(Long feedId, Long userId);
}
