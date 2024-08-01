package com.loiane.dto.mapper;

import org.springframework.stereotype.Component;

import com.loiane.dto.CheeseDTO;
import com.loiane.model.Cheese;

@Component
public class CheeseMapper {

    public CheeseDTO toDTO(Cheese cheese) {
        if (cheese == null) {
            return null;
        }
        return new CheeseDTO(cheese.getId(), cheese.getName(), cheese.getCategory());
    }

    public Cheese toEntity(CheeseDTO cheeseDTO) {
        if (cheeseDTO == null) {
            return null;
        }
        Cheese cheese = new Cheese();
        if (cheeseDTO.id() != null) {
            cheese.setId(cheeseDTO.id());
        }
        cheese.setName(cheeseDTO.name());
        cheese.setCategory(cheeseDTO.category());

        return cheese;
    }

}
