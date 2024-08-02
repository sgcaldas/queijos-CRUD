package com.loiane.dto.mapper;

import org.springframework.stereotype.Component;

import com.loiane.dto.CheeseDTO;
import com.loiane.enums.Category;
import com.loiane.model.Cheese;

@Component
public class CheeseMapper {

    public CheeseDTO toDTO(Cheese cheese) {
        if (cheese == null) {
            return null;
        }
        return new CheeseDTO(cheese.getId(), cheese.getName(), cheese.getCategory().getValue());
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
        cheese.setCategory(convertCategoryValue(cheeseDTO.category()));
        return cheese;
    }

    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Azul" ->
                Category.AZUL;
            case "Fresco" ->
                Category.FRESCO;
            case "Macio" ->
                Category.MACIO;
            case "Meia-Cura" ->
                Category.MEIA_CURA;
            case "Maturado" ->
                Category.MATURADO;
            default ->
                throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }
}
