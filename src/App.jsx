import { useState } from "react";
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import React from 'react';

const sessionUser = sessionStorage.getItem('user');
const currUser = sessionUser ? JSON.parse(sessionUser) : null;

const App = () => {
    const [user, setUser] = useState(currUser);
    let contents;

    if (!user) {
        contents = <Login setUser={setUser} />
    }
    else {
        contents = <UserPage user={user} />
    }

    return (
        <div className="container">
            {contents}
        </div>
    );
}

export default App;