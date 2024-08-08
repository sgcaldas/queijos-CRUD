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

            for (int i=0; i<20; i++) {

            Cheese c = new Cheese();
            c.setName("Camembert " + i);
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

            courseRepository.save(c);
        }
        };
    }
}
