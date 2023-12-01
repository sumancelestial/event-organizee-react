import { useState } from 'react';
import styles from '../styleModules/EditEvent.module.css';
import moment from 'moment';
import { postNewEvent } from '../apis';
import { useNavigate } from 'react-router-dom';

const eventObject = {
    name: '',
    description: '',
    start: '',
    end: '',
    capacity: ''
}

const date = new Date;
date.setDate(date.getDate() + 1);
const minDate = date.toISOString().split('T')[0];

const CreateEvent = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [formDisable, setFormDisable] = useState(false);
    const [buttonText, setButtonText] = useState('Create Event');
    const [eventDetails, setEventDetails] = useState(eventObject);
    const nav = useNavigate();

    const handleChanges = (e, element) => {
        setEventDetails((prev) => {
            return {
                ...prev,
                [element]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormDisable(true);
        setButtonText('Loading...');
        const body = {
            "event": {
                "name": {
                    "html": `<p>${eventDetails.name}</p>`
                },
                "description": {
                    "html": `<p>${eventDetails.description}</p>`
                },
                "start": {
                    "timezone": "UTC",
                    "utc": `${moment(eventDetails.start).utc().format()}`
                },
                "end": {
                    "timezone": "UTC",
                    "utc": `${moment(eventDetails.end).utc().format()}`
                },
                "currency": "USD",
                "capacity": eventDetails.capacity
            }
        };
        await postNewEvent(user, body);
        nav('/');
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.forForm} onSubmit={handleSubmit}>
                <h2>Update Event</h2>
                <div>
                    <label> Event Name</label>
                    <input type="text" disabled={formDisable} required value={eventDetails.name} onChange={(e) => handleChanges(e, "name")} />
                </div>
                <div>
                    <label> Event Detail</label>
                    <input type="text" disabled={formDisable} required value={eventDetails.description} onChange={(e) => handleChanges(e, "description")} />
                </div>
                <div>
                    <label> Start Date</label>
                    <input type="date" disabled={formDisable} min={minDate} value={eventDetails.start} onChange={(e) => handleChanges(e, "start")} />
                </div>
                <div>
                    <label> End Date</label>
                    <input type="date" disabled={formDisable} min={eventDetails.start ? eventDetails.start : minDate} value={eventDetails.end} onChange={(e) => handleChanges(e, "end")} />
                </div>
                <div>
                    <label> Capacity</label>
                    <input type="number" disabled={formDisable} required value={eventDetails.capacity} onChange={(e) => handleChanges(e, "capacity")} />
                </div>
                <div>
                    <button disabled={formDisable}>{buttonText}</button>
                </div>
            </form>
        </div>
    );
}

export default CreateEvent;