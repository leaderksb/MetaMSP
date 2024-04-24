package com.MetaMSP.repository;

import com.MetaMSP.entity.QuestionService;
import com.MetaMSP.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionServiceRepository extends JpaRepository<QuestionService, String> {

    Optional<QuestionService> findByqUrl(String qUrl);
    List<QuestionService> findByqUser(User qUser);

    List<QuestionService> findByqPrt(String qUrl);

}
