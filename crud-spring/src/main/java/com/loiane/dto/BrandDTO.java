package com.loiane.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BrandDTO(
        Long id,
        @NotNull @NotBlank @Length(min = 4, max = 50) String name,
        @NotNull @NotBlank @Length(min = 10, max = 11) String youtubeUrl) {
}
