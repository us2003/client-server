import React, { useEffect, useState } from 'react';
import axios from 'axios'

const LongPolling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    useEffect(() => {
        subscribe()
    }, []);
    const subscribe = async () => {
        try {
            const {data} = await axios.get('http://localhost:5000/get-messages?с=777')
            setMessages(prev => [data, ...prev])
            await subscribe()
        }
        catch {
            setTimeout(() => {
                subscribe()
            }, 500)
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

export default LongPolling;
