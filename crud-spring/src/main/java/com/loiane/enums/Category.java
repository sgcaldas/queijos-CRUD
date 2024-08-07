package com.loiane.enums;

public enum Category {
    FRESCO("Fresco"), MACIO("Macio"), MEIA_CURA("Meia-Cura"), MATURADO("Maturado");

    private String value;

    private Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

}
