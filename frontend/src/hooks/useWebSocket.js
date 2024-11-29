import { useEffect, useRef, useState, useCallback } from 'react';

export const useWebSocket = (token) => {
  const ws = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const connect = useCallback(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.current.onclose = (event) => {
      setIsConnected(false);
      if (event.code !== 1000) {
        setError(`Connection closed: ${event.reason}`);
      }
    };

    ws.current.onerror = (error) => {
      setError('WebSocket error');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'ERROR') {
        setError(data.error);
        return;
      }
      setMessages(prev => [...prev, data]);
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      connect();
    }

    return () => {
      if (ws.current) {
        ws.current.close(1000, 'Component unmounted');
      }
    };
  }, [token, connect]);

  const sendMessage = useCallback((data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      setError('WebSocket is not connected');
    }
  }, []);

  const startSession = useCallback((tutorId) => {
    sendMessage({
      type: 'START_SESSION',
      tutorId
    });
  }, [sendMessage]);

  const endSession = useCallback(() => {
    sendMessage({
      type: 'END_SESSION'
    });
  }, [sendMessage]);

  const sendChatMessage = useCallback((message) => {
    sendMessage({
      type: 'CHAT_MESSAGE',
      message
    });
  }, [sendMessage]);

  return {
    isConnected,
    messages,
    error,
    startSession,
    endSession,
    sendChatMessage,
    clearMessages: () => setMessages([])
  };
};