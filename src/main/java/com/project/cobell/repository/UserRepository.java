package com.project.cobell.repository;

import com.project.cobell.entity.Challenge;
import com.project.cobell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Query(value = "select count(*) from user where email = :email", nativeQuery = true)
	int countByEmail(@Param("email") String email);

	@Query(value = "select * from user where email = :email and password = :password", nativeQuery = true)
	Optional<User> findByIdAndPassword(@Param("email") String email, @Param("password") String password);

	// 방금 insert한 user의 id 얻기
	@Query(value = "select max(u.id) from User u")
	Long getInsertedId();
//	public Long findTopById();

	@Query(value = "select u from User u left outer join fetch u.photoUser where u.id = :userId")
	User findByIdJoinFetch(@Param("userId") Long userId);

	@Modifying
	@Transactional
	@Query(value = "update user set bio=:bio where id=:userId", nativeQuery = true)
	void updateBio(@Param("userId") Long userId, @Param("bio") String bio);
}
