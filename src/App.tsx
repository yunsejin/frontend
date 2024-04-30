import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Main from './pages/main';
import Signup from './pages/signup';
import WorkBook from './pages/workbook';
import Create from './pages/create_question';
import Question_info from './pages/question_info';
import Video from './pages/video';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workbook" element={<WorkBook/>} />
        <Route path="/create" element={<Create/>}/>
        <Route path="/question_info" element={<Question_info/>}/>
        <Route path="/video" element={<Video/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
