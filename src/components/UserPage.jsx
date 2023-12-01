import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from '../styleModules/UserPage.module.css';
import NavBar from './NavBar';
import Home from './Home';
import Event from './Event';
import EditEvent from './EditEvent';
import CreateEvent from './CreateEvent';

const UserPage = ({ user }) => {
    return (
        <Router>
            <NavBar />
            <div className={styles.container}>
                <Routes>
                    <Route exact path='/' element={<Home user={user} />} />
                    <Route exact path='/create' element={<CreateEvent />} />
                    <Route exact path='/:id' element={<Event />} />
                    <Route exact path='/:id/edit' element={<EditEvent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default UserPage;