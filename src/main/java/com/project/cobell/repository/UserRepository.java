package com.project.cobell.repository;

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
	@Query(value = "select * from user where email = :email and password = :password", nativeQuery = true)
	Optional<User> findByIdAndPassword(@Param("email") String email, @Param("password") String password);

	// 방금 insert한 user의 id 얻기
	@Query(value = "select max(u.id) from User u")
	Long getInsertedId();
//	public Long findTopById();

	@Modifying
	@Transactional
	@Query(value = "update user set bio=:bio where id=:userId", nativeQuery = true)
	void updateBio(@Param("userId") Long userId, @Param("bio") String bio);
}
