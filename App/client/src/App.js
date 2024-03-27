import React, {useEffect} from "react";
import './App.css';
import Heading from "./Component/Heading";
import Footer from "./Component/Footer";
import List from "./Component/style/List";
import Main from "./Component/Main"
import Upload from "./Component/style/Upload";
import Edit from "./Component/style/Edit";
import StyleArea from "./Component/style/StyleArea";

import firebase from "./firebase";
import Login from "./Component/user/Login"
import Register from "./Component/user/Register"
import SurveyList from "./Management/SurveyList";

import {Routes, Route} from "react-router-dom";
import {loginUser,clearUser} from "./Reducer/userSlice";
import {useDispatch} from "react-redux";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            if(userInfo!==null){
                dispatch(loginUser(userInfo.multiFactor.user));
            }
            else{
                dispatch(clearUser());
            }
        });
    });


  return (
     <>
         <Heading/>
         <Routes>
             <Route path="/" element={<Main/>} />
             <Route path="/upload" element={<Upload/>} />
             <Route path="/list" element={<List/>} />
             <Route path="/style/:styleNum" element={<StyleArea/>} />
             <Route path="/edit/:styleNum" element={<Edit/>} />
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={<Register/>} />
             <Route path="/surveylist" element={<SurveyList/>}/>
         </Routes>
         <Footer/>
     </>
  );
}

export default App;
