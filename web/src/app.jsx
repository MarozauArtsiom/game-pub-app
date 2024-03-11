import "./app.css";
import AppBar from "./components/appBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import MainPage from "./pages/mainPage";
import AddGamePage from "./pages/addGamePage";
import ScoreTablePage from './pages/scoreTablePage';
import GameApprovalsPage from './pages/gameApprovalsPage';
import RunningMan from "./components/runninMan";

const App = () => {
  return (
    <Router>
      <AppBar />
      <Routes>
        <Route path="/game-approvals" element={<GameApprovalsPage />} />
        <Route path="/add-game" element={<AddGamePage />} />
        <Route path="/scores" element={<ScoreTablePage />} />
        <Route path="/run" element={<RunningMan />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
