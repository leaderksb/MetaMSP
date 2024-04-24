package com.MetaMSP.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name="information")
@NoArgsConstructor(access=AccessLevel.PROTECTED)  // 인자 없는 생성자를 생성
@Getter
@Setter
@Entity
public class User implements UserDetails {

    @Column(name="role", nullable=false, unique=false)
    private String role;

    @Column(name="company", nullable=true, unique=false)
    private String company;

    @Column(name="name", nullable=false, unique=false)
    private String name;

    @Column(name="email", nullable=false, unique=false)
    private String email;

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)  // 기본 키(primary key) 자동 생성, 관리
    @Column(name="id", nullable=false, unique=true, updatable=false)
    private String id;

    @Column(name="pw")
    private String pw;

    @Column(name="phone")
    private String phone;

    @Column(name="consent")
    private String consent;

    /*
    @Builder
    public User(String role, String company, String name, String email, String id, String pw, String phone, String consent) {
        this.role=role;
        this.company=company;
        this.name=name;
        this.email=email;
        this.id=id;
        this.pw=pw;
        this.phone=phone;
        this.consent=consent;
    }
     */

    @Override  // 권한 반환
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    // 사용자의 id 반환(고유한 값)
    @Override
    public String getUsername() {
        return id;
    }

    // 사용자의 패스워드 반환
    @Override
    public String getPassword() {
        return pw;
    }

    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        return true;  // true : 만료 X
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return true;  // true : 잠금 X
    }

    // 패스워드 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // true : 만료 X
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        return true;  // true : 사용 가능
    }

}
