import React, { useEffect, useState } from 'react';
import axios from 'axios'

const EventSourcing = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    useEffect(() => {
        subscribe()
    }, []);
    const subscribe = async () => {
        const eventSource=new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data)
            setMessages(prev => [msg, ...prev])
        }
    }
    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }
    return (
        <div>
            <div>
                <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Message text" />
                <button onClick={sendMessage}>Send</button>
            </div>
            <div className="messages">
                {messages.map(msg=>
                    <div className="message" key={msg.id}>{msg.message}</div>
                )}
            </div>
        </div>
    );
}

export default EventSourcing;
