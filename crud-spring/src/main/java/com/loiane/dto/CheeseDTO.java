package com.loiane.dto;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record CheeseDTO(
        @JsonProperty("_id") 
        Long id,
        @NotBlank @NotNull @Length(min = 4, max = 50) 
        String name,
        @NotNull @Length(max = 10) @Pattern(regexp = "Fresco|Macio|Meia-Cura|Maturado") 
        String category,
        List<BrandDTO> brands) {
}