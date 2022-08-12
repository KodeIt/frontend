import React from 'react';
import ToastCard from "./ui/ToastCard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing";
import Compiler from "./pages/Compiler";
import Codes from "./pages/Codes";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
    return (
        <ToastCard>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Landing/>}/>
                    <Route path={'/compiler'} element={<Compiler/>}/>
                    <Route path={'/codes'} element={<Codes/>}/>
                    <Route path={'/sign-in'} element={<Signin/>}/>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/profile/:userId'} element={<Profile/>}/>
                    <Route path={'/profile/:userId/settings'} element={<ProfileSettings/>}/>
                </Routes>
            </BrowserRouter>
        </ToastCard>
    );
}

export default App;
