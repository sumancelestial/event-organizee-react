import { useEffect, useState } from "react";
import { allEvents } from '../apis.jsx';
import styles from '../styleModules/Home.module.css'
import EventsList from "./EventsList.jsx";

const Home = ({ user }) => {
    const [isPending, setIsPending] = useState(true);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const data = async () => {
            const events = await allEvents(user);
            setIsPending(false);
            setEvents(events);
        }
        data();
    }, []);

    return (
        <>
            {isPending && <h1 className={styles.loading}>Loading...</h1>}
            {events && <EventsList events={events} />}
        </>
    );
}

export default Home;