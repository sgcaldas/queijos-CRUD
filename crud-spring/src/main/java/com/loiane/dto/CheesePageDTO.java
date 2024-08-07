package com.loiane.dto;

import java.util.List;

public record CheesePageDTO(List<CheeseDTO> cheeses, long totalElements, int totalPages) {
    
}