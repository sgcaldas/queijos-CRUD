package com.loiane.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.loiane.model.Cheese;

@Repository
public interface CheeseRepository extends JpaRepository<Cheese, Long> {
    
}
