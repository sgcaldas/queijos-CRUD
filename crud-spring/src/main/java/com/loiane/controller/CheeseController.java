package com.loiane.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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
import com.loiane.service.CheeseService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/cheeses")

public class CheeseController {

    private final CheeseService cheeseService;

    public CheeseController(CheeseService cheeseService) {
        this.cheeseService = cheeseService;
    }

    @GetMapping
    public List<Cheese> list() {
        return cheeseService.list();
    }

    @GetMapping("/{id}")
    public Cheese findById(@PathVariable @NotNull @Positive Long id) {
        return cheeseService.findById(id);

    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Cheese create(@RequestBody @Valid Cheese cheese) {
        return cheeseService.create(cheese);
    }

    @PutMapping("/{id}")
    public Cheese update(@PathVariable @NotNull @Positive Long id,
            @RequestBody @Valid Cheese cheese) {
        return cheeseService.update(id, cheese);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id) {
        cheeseService.delete(id);
    }
}
