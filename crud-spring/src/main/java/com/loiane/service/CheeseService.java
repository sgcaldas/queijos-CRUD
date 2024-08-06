package com.loiane.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.loiane.dto.CheeseDTO;
import com.loiane.dto.mapper.CheeseMapper;
import com.loiane.exception.RecordNotFoundException;
import com.loiane.model.Cheese;
import com.loiane.repository.CheeseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CheeseService {

    private final CheeseRepository cheeseRepository;
    private final CheeseMapper cheeseMapper;

    public CheeseService(CheeseRepository cheeseRepository, CheeseMapper cheeseMapper) {
        this.cheeseRepository = cheeseRepository;
        this.cheeseMapper = cheeseMapper;
    }

    public List<CheeseDTO> list() {
        return cheeseRepository.findAll()
                .stream()
                .map(cheeseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CheeseDTO findById(@NotNull @Positive Long id) {
        return cheeseRepository.findById(id).map(cheeseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CheeseDTO create(@NotNull @Valid CheeseDTO cheese) {
        return cheeseMapper.toDTO(cheeseRepository.save(cheeseMapper.toEntity(cheese)));
    }

    public CheeseDTO update(@NotNull @Positive Long id, @Valid CheeseDTO cheeseDTO) {
        return cheeseRepository.findById(id)
                .map(recordFound -> {
                    Cheese cheese = cheeseMapper.toEntity(cheeseDTO);
                    recordFound.setName(cheeseDTO.name());
                    recordFound.setCategory(this.cheeseMapper.convertCategoryValue(cheeseDTO.category()));
                    recordFound.getBrand().clear();
                    cheese.getBrand().forEach(brand -> recordFound.getBrand().add(brand));
                    return cheeseMapper.toDTO(cheeseRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id) {

        cheeseRepository.delete(cheeseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}