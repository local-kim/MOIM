package com.project.cobell.repository;

import com.project.cobell.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Long> {
//	@Query(value = "select")
	List<Weight> findByUserId(Long userId);
}

