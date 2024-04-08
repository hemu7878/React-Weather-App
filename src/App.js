import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeatherApp from './pages/WeatherApp';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<WeatherApp/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
