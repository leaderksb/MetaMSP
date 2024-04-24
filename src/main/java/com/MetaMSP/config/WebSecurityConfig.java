package com.MetaMSP.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

    private final UserDetailsService userService;

    // 스프링 시큐리티 기능 비활성화
    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
                .requestMatchers("/css/**", "/js/**", "/images/**");
    }

    // 특정 HTTP 요청에 대한 웹 기반 보안 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic(HttpBasicConfigurer::disable)
                .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))  // ⭐️
                .csrf(AbstractHttpConfigurer::disable)
//                .cors(AbstractHttpConfigurer::disable)  // CORS(Cross-Origin Resource Sharing) 보호를 비활성화
//                .csrf(AbstractHttpConfigurer::disable)  // CSRF(Cross-Site Request Forgery) 보호를 비활성화

                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/**").permitAll()
                )

                .authorizeHttpRequests(request -> request
                        // requestMatchers은 상위에 있는 URL 규칙부터 적용함
                        // 맨마지막에 "/**" 전체 URL에 대한 설정이 있더라도
                        // 그보다 상위 규칙인 "/user**" URL에 대한 설정이 있기 때문에 ADMIN 권한을 가진 접속자는 "/user**" 하위 경로에 접근할 수 없음
                        .requestMatchers("/", "/login", "/api/signup").permitAll()  // 로그인 없이 누구나 접근 가능
                        .requestMatchers("/user**").hasAnyRole("USER")  // USER 권한을 가진 사용자는 "/user" 하위 경로 접근 가능
                        .requestMatchers("/admin**").hasAnyRole("ADMIN")  // ADMIN 권한을 가진 사용자는 "/admin" 하위 경로 접근 가능
                        .requestMatchers("/**").hasRole("ADMIN")  // ADMIN 권한을 가진 사용자는 모든 경로 접근 가능
                        .anyRequest().authenticated()  // 로그인 없이 접근 가능한 주소값을 제외하고 모든 요청은 인증 필요
                )

                .formLogin(login -> login  // form 방식 로그인 사용
                                .loginPage("/login")  // 로그인 페이지의 URL
                                .usernameParameter("id")
                                .passwordParameter("pw")
                                .failureUrl("/login?error=true")  // 로그인 실패 시 리다이렉트할 URL
                                .successHandler((request, response, authentication) -> {
                                    boolean isUser = authentication.getAuthorities().stream()
                                            .anyMatch(a -> a.getAuthority().equals("ROLE_USER"));
                                    boolean isAdmin = authentication.getAuthorities().stream()
                                            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                                    if (isUser) {
                                        response.sendRedirect("/user");
                                    } else if (isAdmin) {
                                        response.sendRedirect("/admin");
                                    } else {
                                        response.sendRedirect("/login?error=true");
                                    }
                                })
                                .permitAll()
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET")) // GET 요청도 로그아웃 처리
                        .logoutSuccessUrl("/login")
                        .invalidateHttpSession(true)
                );

        return http.build();
    }

    // 인증 관리자 관련 설정
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() throws Exception {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(userService);
        daoAuthenticationProvider.setPasswordEncoder(bCryptPasswordEncoder());

        return daoAuthenticationProvider;
    }

    // 패스워드 인코더로 사용할 빈 등록
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ⭐️ CORS 설정
    CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedHeaders(Collections.singletonList("*"));
            config.setAllowedMethods(Collections.singletonList("*"));
            config.setAllowedOriginPatterns(Collections.singletonList("http://localhost:8080/"));  // ⭐️ 허용할 origin
            config.setAllowCredentials(true);
            return config;
        };
    }

}
