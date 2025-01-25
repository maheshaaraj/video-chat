import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSocket } from '../Context/SocketProvider';

const LobbyScreen = () => {

    const [email, setEmaill] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    console.log(socket);

    const navigate = useNavigate();
    

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", {email, room});
    }, [email, room, socket]);



    const handleRoomJoin = useCallback((data) => {
        const {email, room} = data;
        // console.log(email, room);
        navigate(`/room/${room}`);
        
    }, [navigate]);



    useEffect(() => {
        socket.on("room:join", handleRoomJoin);
        return () => {
          socket.off('room:join', handleRoomJoin)
        }
    }, [socket, handleRoomJoin]);


  return (
    <div>
      <h1>LOBBY</h1>
      <form onSubmit={handleSubmitForm}>
            <label htmlFor='email'>Email ID</label>
            <input 
            type='email' 
            id='email' 
            value={email} 
            onChange={e => setEmaill(e.target.value)}/>
            <br />
            <label htmlFor='room'>Room Number</label>
            <input 
            type='text' 
            id='room' 
            value={room} 
            onChange={e => setRoom(e.target.value)}/>
            <br />
            <button>Join</button>

      </form>
    </div>
  )
}

export default LobbyScreen;
