package com.MetaMSP.service;

import com.MetaMSP.entity.User;
import com.MetaMSP.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        System.out.println("id : " + id);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Get the role of the user from the database
        String role = user.getRole();

        // Create a GrantedAuthority based on the user's role
        GrantedAuthority authority;
        switch (role.toUpperCase()) {
            case "USER":
                authority = new SimpleGrantedAuthority("ROLE_USER");
                break;
            case "ADMIN":
                authority = new SimpleGrantedAuthority("ROLE_ADMIN");
                break;
            default:
                throw new UsernameNotFoundException("Invalid role");
        }

        List<GrantedAuthority> authorities = Collections.singletonList(authority);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
