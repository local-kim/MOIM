package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@DynamicInsert
public class Feed {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private String content;
	private Timestamp createdAt;

	@OneToMany
//	@JsonIgnore
	@JoinColumn(name = "feed_id")
	private Set<Tag> tags = new HashSet<>();

	@OneToMany
//	@JsonIgnore
	@JoinColumn(name = "feed_id")
	private Set<PhotoFeed> photoFeeds = new HashSet<>();
}
