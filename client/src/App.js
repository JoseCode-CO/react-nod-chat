import './App.css';
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

//Creamos la conexion con el servidor del backend
const socket = io('http://localhost:4000')

function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();

    //enviamos al backend
    socket.emit('message', message)

    const newMessage = {
      body: message,
      from: "Me"
    }

    setMessages([newMessage, ...messages])
    setMessage("")
  }

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages])
    };
    socket.on('message', receiveMessage)

    return () => {
      socket.off('message', receiveMessage)
    }
  }, [messages])

  return (
    <div className="h-screen bg-red-300 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <input
          type="text"
          onChange={e => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinc-500 p-2 text-black w-full"
        />
        <ul className='h-80 overflow-y-auto'>
          {messages.map((message, index) => (
            <li key={index}  className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"}`}>
              <p>{message.from} : {message.body}</p>
            </li>
          ))}
        </ul>
      </form>

    </div>
  );
}

export default App;
