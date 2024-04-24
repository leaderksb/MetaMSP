package com.MetaMSP.repository;

import com.MetaMSP.entity.AnswerService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerServiceRepository extends JpaRepository<AnswerService, String> {

    List<AnswerService> findByqUrl(String qUrl);

}
