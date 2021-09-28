package com.algo.algochat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chatting").withSockJS();
        //클라이언트에서 WebSocket을 연결할 api를 설정
    }

    @Override
    public void configureMessageBroker (MessageBrokerRegistry registry) {
        //한 클라이언트에서 다른 클라이언트로 메시지르 라우팅 하는 데 사용될 메시지 브로커를 구성
        registry.enableSimpleBroker("/topic");
        //특정 주제를 구독 한 연결된 모든 클라이언트에게 메시지를 broadcast
        registry.setApplicationDestinationPrefixes("/app");
    }
}
