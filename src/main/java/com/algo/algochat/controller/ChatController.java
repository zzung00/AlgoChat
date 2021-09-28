package com.algo.algochat.controller;

import com.algo.algochat.model.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

//한 Client에게서 message를 수신한 다음, 다른 Client에게 broadcast함
    @Controller
    public class ChatController {

        @MessageMapping("/chat.sendMessage")
        //sendMessage()로 라우팅
        @SendTo("/topic/public")
        public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
            return chatMessage;
        }

        @MessageMapping("/chat.addUser")
        //addUser로 라우팅
        @SendTo("/topic/public")
        public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor){ //사용자 참여를 broadcast함
            headerAccessor.getSessionAttributes().put("username",chatMessage.getSender());
            return chatMessage;
        }

    }
