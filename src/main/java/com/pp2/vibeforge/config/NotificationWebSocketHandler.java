package com.pp2.vibeforge.config;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NotificationWebSocketHandler extends TextWebSocketHandler {

    private final ConcurrentHashMap<Integer, WebSocketSession> sesiones = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        
        if (payload.startsWith("AUTH:")) {
            try {
                Integer userId = Integer.parseInt(payload.split(":")[1]);
                sesiones.put(userId, session);
            } catch (NumberFormatException e) {
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sesiones.values().remove(session);
    }
    
    public void enviarNotificacionPush(Integer userIdDestino) {
        WebSocketSession session = sesiones.get(userIdDestino);
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage("NUEVA_NOTIFICACION"));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}