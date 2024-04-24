package com.MetaMSP.repository;

import com.MetaMSP.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {  // 엔티티의 타입, 엔티티의 ID(기본 키)의 타입

    Optional<User> findById(String id);  // id로 사용자 정보 가져옴

    // 추가적인 쿼리 메소드 정의 가능

}
