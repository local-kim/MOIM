package com.project.cobell.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter @Setter
@DynamicInsert
public class Feed {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	private String content;
	private Timestamp createdAt;

	@OneToMany(mappedBy = "feed", fetch = FetchType.LAZY)
	@OrderBy("id asc")
	@JsonIgnore
	private Set<Tag> tags = new HashSet<>();

	@OneToMany(mappedBy = "feed", fetch = FetchType.LAZY)
	@OrderBy("id asc")
	@JsonIgnore
	private Set<PhotoFeed> photoFeeds = new HashSet<>();

	@OneToMany(mappedBy = "feed", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<CommentFeed> commentFeeds = new HashSet<>();

	@OneToMany(mappedBy = "feed", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<LikeFeed> likeFeeds = new HashSet<>();

	@Formula("(select count(*) from like_feed lf where lf.feed_id=id)")
	private int likes;
}
