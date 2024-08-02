package com.loiane;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
    CommandLineRunner initDatabase(CheeseRepository courseRepository) {
        return args -> {
            courseRepository.deleteAll();

            Cheese c = new Cheese();
            c.setName("Gruyère");
            c.setCategory(Category.MEIA_CURA);

            Brand b = new Brand();
            b.setName("Dayia");
            b.setYoutubeUrl("F3hiBJUg2ss");
            b.setCheese(c);
            c.getBrands().add(b);

            Brand b1 = new Brand();
            b1.setName("Violife");
            b1.setYoutubeUrl("4jOOvNipBtQ");
            b1.setCheese(c);
            c.getBrands().add(b1);

            courseRepository.save(c);
        };
    }
}
