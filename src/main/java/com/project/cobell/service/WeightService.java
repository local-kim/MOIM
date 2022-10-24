package com.project.cobell.service;

import com.project.cobell.dto.WeightDto;
import com.project.cobell.entity.Weight;
import com.project.cobell.repository.UserRepository;
import com.project.cobell.repository.WeightRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WeightService {

	@Autowired
	private WeightRepository weightRepository;

	@Autowired
	private UserRepository userRepository;

	@Transactional
	public void insertWeight(float weight, Long userId){
		Weight w = new Weight();
		w.setWeight(weight);
		w.setUser(userRepository.findById(userId).get());

		weightRepository.save(w);
	}

	@Transactional
	public List<WeightDto> getWeightList(Long userId){
		ModelMapper modelMapper = new ModelMapper();
		return weightRepository.findByUserId(userId).stream()
				.map(weight -> modelMapper.map(weight, WeightDto.class))
				.collect(Collectors.toList());
	}
}
