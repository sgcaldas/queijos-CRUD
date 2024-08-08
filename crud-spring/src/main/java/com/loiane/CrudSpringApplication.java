package com.loiane;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.loiane.enums.Category;
import com.loiane.model.Brand;
import com.loiane.model.Cheese;
import com.loiane.repository.CheeseRepository;

@SpringBootApplication
public class CrudSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudSpringApplication.class, args);
    }

    @Bean
    @Profile("dev")
    CommandLineRunner initDatabase(CheeseRepository courseRepository) {
        return args -> {
            courseRepository.deleteAll();

            Cheese c = new Cheese();
            c.setName("Gruyère");
            c.setCategory(Category.MEIA_CURA);

            Brand b = new Brand();
            b.setName("Violife");
            b.setYoutubeUrl("OgrYb50vNlY");
            b.setCheese(c);
            c.getBrands().add(b);

            Brand b1 = new Brand();
            b1.setName("Vida Veg");
            b1.setYoutubeUrl("vhc4a3QbAcY");
            b1.setCheese(c);
            c.getBrands().add(b1);

            Cheese c1 = new Cheese();
            c1.setName("Feta");
            c1.setCategory(Category.FRESCO);

            Brand b2 = new Brand();
            b2.setName("Violife");
            b2.setYoutubeUrl("OgrYb50vNlY");
            b2.setCheese(c1);
            c1.getBrands().add(b2);

            Brand b3 = new Brand();
            b3.setName("Vida Veg");
            b3.setYoutubeUrl("vhc4a3QbAcY");
            b3.setCheese(c1);
            c1.getBrands().add(b3);

            Cheese c2 = new Cheese();
            c2.setName("Camembert");
            c2.setCategory(Category.MACIO);

            Brand b4 = new Brand();
            b4.setName("Violife");
            b4.setYoutubeUrl("OgrYb50vNlY");
            b4.setCheese(c2);
            c2.getBrands().add(b4);

            Brand b5 = new Brand();
            b5.setName("Vida Veg");
            b5.setYoutubeUrl("vhc4a3QbAcY");
            b5.setCheese(c2);
            c2.getBrands().add(b5);

            Cheese c3 = new Cheese();
            c3.setName("Parmesão");
            c3.setCategory(Category.MATURADO);

            Brand b6 = new Brand();
            b6.setName("Violife");
            b6.setYoutubeUrl("OgrYb50vNlY");
            b6.setCheese(c3);
            c3.getBrands().add(b6);

            Brand b7 = new Brand();
            b7.setName("Vida Veg");
            b7.setYoutubeUrl("vhc4a3QbAcY");
            b7.setCheese(c3);
            c3.getBrands().add(b7);

            courseRepository.save(c);
            courseRepository.save(c1);
            courseRepository.save(c2);
            courseRepository.save(c3);
        };
    }
}
