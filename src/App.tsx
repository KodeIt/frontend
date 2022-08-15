import React from "react";
import ToastCard from "./ui/ToastCard";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Codes, CodesStarred, CodesWritten, Compiler, Home, Landing, Profile, ProfileSettings, Signin} from "./pages";
import {useSelector} from "react-redux";
import {StoreStateType} from "./store/store";
import CodeStars from "./pages/CodeStars";
import Followers from "./pages/Followers";
import Following from "./pages/Following";

function App() {
    const appCtx = useSelector((state: StoreStateType) => state.app);

    return (
        <div className={`${appCtx.isDarkMode && 'dark'}`}>
            <ToastCard>
                <BrowserRouter>
                    <Routes>
                        {/* Public Mappings */}

                        <Route path={"/"} element={appCtx.isLoggedIn ? <Home/> : <Landing/>}/>
                        <Route path={"/compiler"} element={<Compiler/>}/>
                        <Route path={"/codes"} element={<Codes/>}/>
                        <Route path={"/sign-in"} element={appCtx.isLoggedIn ? <Navigate to={'/'}/> : <Signin/>}/>
                        <Route path={"/code/:codeId/stars"} element={<CodeStars/>}/>
                        <Route path={"/profile/:userId"} element={<Profile/>}/>
                        <Route path={"/profile/:userId/followers"} element={<Followers/>}/>
                        <Route path={"/profile/:userId/following"} element={<Following/>}/>

                        {/* Private Mappings */}
                        <Route
                            path={"/settings"}
                            element={appCtx.isLoggedIn ? <ProfileSettings/> : <Navigate to={'/sign-in'}/>}
                        />
                        <Route
                            path={"/profile/:userId/codes-written"}
                            element={appCtx.isLoggedIn ? <CodesWritten/> : <Navigate to={'/sign-in'}/>}
                        />
                        <Route
                            path={"/profile/:userId/codes-starred"}
                            element={appCtx.isLoggedIn ? <CodesStarred/> : <Navigate to={'/sign-in'}/>}
                        />
                    </Routes>
                </BrowserRouter>
            </ToastCard>
        </div>
    );
}

export default App;
