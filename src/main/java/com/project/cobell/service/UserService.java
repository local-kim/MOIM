package com.project.cobell.service;

import com.project.cobell.dto.LoginDto;
import com.project.cobell.dto.UserDto;
import com.project.cobell.entity.User;
import com.project.cobell.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public void join(UserDto userDto){
		// UserDto -> User entity
		ModelMapper modelMapper = new ModelMapper();
		User userEntity = modelMapper.map(userDto, User.class);

		// insert
		userRepository.save(userEntity);
	}

	@Transactional
	public Optional<User> login(LoginDto loginDto){
		return userRepository.findByIdAndPassword(loginDto.getId(), loginDto.getPassword());
	}
}
