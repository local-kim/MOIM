package com.project.cobell.repository;

import com.project.cobell.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
	@Query("select n from Notification n join fetch n.user as u left outer join fetch n.targetUser as tu left outer join fetch u.photoUser left outer join fetch tu.photoUser where n.user.id = :userId order by n.createdAt desc")
	List<Notification> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);

	@Modifying
	@Transactional
	@Query("delete from Notification n where n.targetPostId=:challengeId and n.type < 20")
	void deleteAllByChallengeId(@Param("challengeId") Long challengeId);

	@Modifying
	@Transactional
	@Query("delete from Notification n where n.targetCommentId=:commentId and n.type < 20")
	void deleteAllByChallengeCommentId(@Param("commentId") Long commentId);

	@Modifying
	@Transactional
	@Query("delete from Notification n where n.targetPostId=:feedId and n.type >= 20")
	void deleteAllByFeedId(@Param("feedId") Long feedId);

	@Modifying
	@Transactional
	@Query("delete from Notification n where n.targetCommentId=:commentId and n.type >= 20")
	void deleteAllByFeedCommentId(@Param("commentId") Long commentId);
}
