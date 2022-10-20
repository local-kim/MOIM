import React from "react";
import { Route, Routes } from "react-router-dom";
import { Challenge, ChallengeList, NewChallenge } from "./pages/lounge";
import { Login, Join } from "./pages/login";
import "./App.css";

const RouteMain = () => {
 
  return (
    <div id="main">
      <Routes>
        {/* 리포트(메인) */}

        {/* 라운지 */}
        <Route path="/lounge" element={<ChallengeList/>} />
        <Route path="/lounge/:challengeNum" element={<Challenge/>} />
        <Route path="/lounge/new" element={<NewChallenge/>} />

        {/* 마이페이지 */}

        {/* 로그인 */}
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default RouteMain;
