import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Explore from "pages/Explore";
import Generate from "pages/Generate";
import Generations from "pages/Generations";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/custom" element={<Generate />} />
      <Route path="/:template/:theme" element={<Generate />} />
      <Route path="/generations" element={<Generations />} />
      {/* Add more routes here as needed */}
    </Routes>
  );
};

export default AppRoutes;
