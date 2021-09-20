package com.algo.algochat.controller;

import com.algo.algochat.model.Room;
import com.algo.algochat.model.RoomRepository;
import com.algo.algochat.model.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/room")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public @ResponseBody String createNewRoom (@RequestParam String name) {

        Room room = new Room();
        room.setName(name);
        roomRepository.save(room);
        return "Saved";
    }

    // @PostMapping("/join")
    // public @ResponseBody String joinRoom (@RequestParam Integer roomId, @RequestParam Integer userId) {
    //     User user = userRepository.findById(userId).get();
    //     Room room = roomRepository.findById(roomId).get();

    //     RoomUser roomUser = new RoomUser();
    //     roomUser.setRoom(room);
    //     roomUser.setUser(user);
    //     roomUserRepository.save(roomUser);
    //     return "Joined";
    // }

    @DeleteMapping("/delete")
    public @RequestMapping String deleteRoom (@RequestParam Integer id) {
        Room room = roomRepository.findById(id).get();
        roomRepository.delete(room);

        return "Deleted";
    }

    @GetMapping("/all")
    public @ResponseBody Iterable<Room> getAllRooms() {
        return roomRepository.findAll();
    }
}
