import React, { useRef, useState } from 'react';

const WebSockets = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');
    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')
        socket.current.onopen = () => {
            console.log('[client] Connection established')
            setConnected(true)
            const msg = {
                type: 'connection',
                username
            }
            socket.current.send(JSON.stringify(msg))
        }
        socket.current.onmessage = (msg) => {
            const message = JSON.parse(msg.data)
            console.log('[client] Message received: ', message)
            setMessages(prev => [message, ...prev])
        }
        socket.current.onclose = () => {
            console.log('[client] Socket closed')
        }
        socket.current.onerror = () => {
            console.log('[client] Error')
        }
    };
    
    const sendMessage = () => {
        socket.current.send(
            JSON.stringify({
                type: 'message',
                text: value
            })
        )
    }

    if(!connected) {
        return (
            <div>
                <div className="form">
                    <input 
                        type="text" 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                        placeholder="Your name" 
                    />
                    <button onClick={connect}>Connect</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e)=>setValue(e.target.value)} 
                    placeholder="Message text" 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div className="messages">
                {messages.map(msg =>
                    msg.type === 'connection'
                    ? <div className="connection" key={msg.id}>{msg.time} User {msg.user} connected.</div>
                    : <div className="message" key={msg.id}>{msg.time} {msg.from}: {msg.text}</div>
                )}
            </div>
        </div>
    );
}

export default WebSockets;
