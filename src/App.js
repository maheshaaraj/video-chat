import { Routes, Route } from 'react-router';
import LobbyScreen from './Screens/Lobby';
import './App.css';
import RoomPage from './Screens/Room';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={ <LobbyScreen /> }/>
          <Route path='/room/:roomId' element={ <RoomPage /> } />
      </Routes>
      
    </div>
  );
}

export default App;
