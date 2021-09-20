package com.algo.algochat.controller;

import java.util.HashMap;

import com.algo.algochat.model.User;
import com.algo.algochat.model.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/user")
public class UserController {
    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "/signup", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
    public @ResponseBody String addNewUser (@RequestBody HashMap<String, Object> body) {
        User n = new User();
        String encodedPassword = passwordEncoder.encode((String) body.get("password"));

        n.setName((String) body.get("name"));
        n.setEmail((String) body.get("email"));
        //n.setNumber((String) body.get("number"));
        n.setPassword(encodedPassword);
        userRepository.save(n);
        return "Saved!!";
    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")  
    public @ResponseBody String signIn (@RequestBody HashMap<String, Object> body) {
        String email = (String) body.get("email");
        String password = (String) body.get("password");

        User loginUser = userRepository.findByEmail(email);
        if(loginUser == null) {
            return "존재하지 않은 이메일";
        }

        if(!passwordEncoder.matches(password, loginUser.getPassword())) {
            return "비밀번호 일치하지 않음";
        }

        return "Success";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
