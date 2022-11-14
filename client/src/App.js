import './App.css';
import io from 'socket.io-client'

//Creamos la conexion con el servidor del backend
const socket = io('http://localhost:4000')

function App() {
  return (
    <div className="App">
     <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
