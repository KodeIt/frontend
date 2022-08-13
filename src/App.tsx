import React from "react";
import ToastCard from "./ui/ToastCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Codes,
  Compiler,
  Home,
  Landing,
  Profile,
  ProfileSettings,
  Signin,
} from "./pages";

function App() {
  return (
    <ToastCard>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/compiler"} element={<Compiler />} />
          <Route path={"/codes"} element={<Codes />} />
          <Route path={"/sign-in"} element={<Signin />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/profile/:userId"} element={<Profile />} />
          <Route
            path={"/profile/:userId/settings"}
            element={<ProfileSettings />}
          />
        </Routes>
      </BrowserRouter>
    </ToastCard>
  );
}

export default App;
