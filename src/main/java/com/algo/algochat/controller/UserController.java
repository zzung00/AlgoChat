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
    public @ResponseBody HashMap<String, Object> addNewUser (@RequestBody HashMap<String, Object> body) {
        HashMap<String, Object> reponse = new HashMap<>();
        User user = new User();
        String encodedPassword = passwordEncoder.encode((String) body.get("password"));

        user.setName((String) body.get("name"));
        user.setEmail((String) body.get("email"));
        user.setPassword(encodedPassword);
        userRepository.save(user);
        reponse.put("name", user.getName());
        reponse.put("email", user.getEmail());

        return reponse;
    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")  
    public @ResponseBody HashMap<String, Object> signIn (@RequestBody HashMap<String, Object> body) {
        HashMap<String, Object> response = new HashMap<>();
        String email = (String) body.get("email");
        String password = (String) body.get("password");

        User loginUser = userRepository.findByEmail(email);
        if(loginUser == null || !passwordEncoder.matches(password, loginUser.getPassword())) {
            response.put("result", false);
            response.put("msg", "존재하지 않은 이메일이거나 비밀번호가 틀립니다");
            return response;
        }
        response.put("result", true);
        response.put("id", loginUser.getId());
        response.put("name", loginUser.getName());
        
        return response;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
