package com.project.cobell.repository;

import com.project.cobell.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Query(value = "select count(id) from user where id = :id and password = :password", nativeQuery = true)
	int findByIdAndPassword(@Param("id") String id, @Param("password") String password);
}
