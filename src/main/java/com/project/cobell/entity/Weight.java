package com.project.cobell.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@DynamicInsert
public class Weight {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private float weight;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private Timestamp createdAt;
}
