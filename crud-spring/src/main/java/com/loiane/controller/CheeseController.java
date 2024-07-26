package com.loiane.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.loiane.model.Cheese;
import com.loiane.repository.CheeseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/cheeses")
//@AllArgsConstructor

public class CheeseController {

    private final CheeseRepository cheeseRepository;

    public CheeseController(CheeseRepository cheeseRepository) {
        this.cheeseRepository = cheeseRepository;
    }

    @GetMapping
    public List<Cheese> list() {
        return cheeseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cheese> findById(@PathVariable @NotNull @Positive Long id) {
        return cheeseRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Cheese create(@RequestBody @Valid Cheese cheese) {

        return cheeseRepository.save(cheese);
        // return ResponseEntity.status(HttpStatus.CREATED).body(courseRepository.save(cheese));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cheese> update(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Cheese cheese) {
        return cheeseRepository.findById(id)
                .map(recordFound -> {
                    recordFound.setName(cheese.getName());
                    recordFound.setCategory(cheese.getCategory());
                    Cheese updated = cheeseRepository.save(recordFound);
                    return ResponseEntity.ok().body(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NotNull @Positive Long id) {
        return cheeseRepository.findById(id)
                .map(recordFound -> {
                    cheeseRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
