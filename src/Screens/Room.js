import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSocket } from '../Context/SocketProvider';
import Peer from '../Service/Peer';


const RoomPage = () => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null)
    const [myStream, setMyStream] = useState();

    const handleUserJoined = useCallback(({email, id}) => {
        console.log(`email  ${email} joined room`);
        setRemoteSocketId(id);

    }, []);


    const handleCallUser = useCallback(async ()=> {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            audio: true,
            video: true,
         });

         const offer = await Peer.getOffer();
         socket.emit("user:call", { to: remoteSocketId, offer})

         setMyStream(stream);
    }, [remoteSocketId, socket]);


    const handleIncomingCall = useCallback(({from, offer})=> {
            console.log(from, offer);
            
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incoming:call', handleIncomingCall);

        return () => {
            socket.off('user:joined', handleUserJoined);
            socket.off('incoming:call', handleIncomingCall);
        }
    }, [socket, handleUserJoined, handleIncomingCall]);



  return (
    <div>
      <h1>You're on new Room</h1>
      <h4>{remoteSocketId ? 'connected': 'No one in room'}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
      {myStream && (<>
                    <h3>My Stream</h3>
                    <ReactPlayer
                                playing 
                                muted 
                                width='500px'
                                height='300px'
                                url={myStream} />
                    </>) 
        
      }
    </div>
  )
}

export default RoomPage;
