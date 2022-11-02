import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Challenge, ChallengeList, Liked, NewChallenge, Search } from "./pages/lounge";
import { Login, Join, Home } from "./pages/login";
import { Report } from "./pages/report";
import { Profile, ProfileEdit } from "./pages/mypage";
import { Settings } from "./pages/settings";
import { MenuBar } from "./components";

const RouteMain = () => {
 
  return (
    <div id="main">
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<Home/>} />

        {/* 라운지 */}
        <Route path="/lounge" element={<ChallengeList/>} />
        <Route path="/lounge/:challengeId" element={<Challenge/>} />
        <Route path="/lounge/new" element={<NewChallenge/>} />
        <Route path="/lounge/like" element={<Liked/>} />
        <Route path="/lounge/search" element={<Search/>} />

        {/* 리포트 */}
        <Route path="/report" element={<Report/>} />

        {/* 내 프로필 */}
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/edit" element={<ProfileEdit/>} />

        {/* 로그인 */}
        <Route path="/join" element={<Join/>} />
        <Route path="/login" element={<Login/>} />

        {/* 설정 */}
        <Route path="/settings" element={<Settings/>} />
      </Routes>

      <MenuBar/>
    </div>
  )
}

export default RouteMain;
