package com.loiane.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.loiane.dto.CheeseDTO;
import com.loiane.dto.CheesePageDTO;
import com.loiane.dto.mapper.CheeseMapper;
import com.loiane.exception.RecordNotFoundException;
import com.loiane.model.Cheese;
import com.loiane.repository.CheeseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@Service
public class CheeseService {

    private final CheeseRepository cheeseRepository;
    private final CheeseMapper cheeseMapper;

    public CheeseService(CheeseRepository cheeseRepository, CheeseMapper cheeseMapper) {
        this.cheeseRepository = cheeseRepository;
        this.cheeseMapper = cheeseMapper;
    }

    public CheesePageDTO list(@PositiveOrZero int pageNumber, @Positive @Max(100) int pageSize) {
        Page<Cheese> page = cheeseRepository.findAll(PageRequest.of(pageNumber, pageSize));
        List<CheeseDTO> cheeses = page.get().map(cheeseMapper::toDTO).collect(Collectors.toList());
        return new CheesePageDTO(cheeses, page.getTotalElements(), page.getTotalPages());
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
                    recordFound.getBrands().clear();
                    cheese.getBrands().forEach(brand -> recordFound.getBrands().add(brand));
                    return cheeseMapper.toDTO(cheeseRepository.save(recordFound));
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id) {

        cheeseRepository.delete(cheeseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}