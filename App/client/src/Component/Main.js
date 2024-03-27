import React from "react";
import Login from "./user/Login";
import {useSelector} from "react-redux";
import Survey from "./Management/Survey";

function Main() {
    const user = useSelector((state) => state.user);
    if (!user.accessToken) {
        return (
            <div>
                <Login/>
            </div>
        );
    }
    return (
        <div>
            <Survey/>
        </div>
    );
}

export default Main;
