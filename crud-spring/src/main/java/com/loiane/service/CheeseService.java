package com.loiane.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.loiane.model.Cheese;
import com.loiane.repository.CheeseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CheeseService {

    private final CheeseRepository cheeseRepository;

    public CheeseService(CheeseRepository cheeseRepository) {
        this.cheeseRepository = cheeseRepository;
    }

    public List<Cheese> list() {
        return cheeseRepository.findAll();
    }

    public Optional<Cheese> findById(@PathVariable @NotNull @Positive Long id) {
        return cheeseRepository.findById(id);
    }

    public Cheese create(@Valid Cheese cheese) {

        return cheeseRepository.save(cheese);
    }

    public Optional<Cheese> update(@NotNull @Positive Long id, @Valid Cheese cheese) {
        return cheeseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(cheese.getName());
                    recordFound.setCategory(cheese.getCategory());
                    return cheeseRepository.save(recordFound);
                });
    }

    public boolean delete(@PathVariable @NotNull @Positive Long id) {
        return cheeseRepository.findById(id)
                .map(recordFound -> {
                    cheeseRepository.deleteById(id);
                    return true;
                })
                .orElse(false);
    }
}
