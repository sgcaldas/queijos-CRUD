package com.loiane.controller;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.loiane.dto.CheeseDTO;
import com.loiane.dto.CheesePageDTO;
import com.loiane.service.CheeseService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Validated
@RestController
@RequestMapping("/api/cheeses")

public class CheeseController {

    private final CheeseService cheeseService;

    public CheeseController(CheeseService cheeseService) {
        this.cheeseService = cheeseService;
    }

    @GetMapping
    public CheesePageDTO list(
        @RequestParam(defaultValue = "0") @PositiveOrZero int pageNumber, 
        @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize) {
        return cheeseService.list(pageNumber, pageSize);
    }

    @GetMapping("/{id}")
    public CheeseDTO findById(@PathVariable @NotNull @Positive Long id) {
        return cheeseService.findById(id);

    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public CheeseDTO create(@RequestBody @Valid @NotNull CheeseDTO cheese) {
        return cheeseService.create(cheese);
    }

    @PutMapping("/{id}")
    public CheeseDTO update(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid CheeseDTO cheese) {
        return cheeseService.update(id, cheese);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        cheeseService.delete(id);
    }
}
