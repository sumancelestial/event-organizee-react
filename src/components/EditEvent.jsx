import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleEvent, updateEvent } from '../apis';
import styles from '../styleModules/EditEvent.module.css';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

const EditEvent = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { id } = useParams();
    const [isPending, setIsPending] = useState(true);
    const [eventDetails, setEventDetails] = useState(null);
    const [formDisable, setFormDisable] = useState(false);
    const [buttonText, setButtonText] = useState('Update Event');
    const nav = useNavigate();

    useEffect(() => {
        const data = async () => {
            const event = await getSingleEvent(user, id);
            setIsPending(false);
            const eventObject = {
                name: event.name.text,
                description: event.description.text,
                start: moment(event.start.local).format('DD-MM-YYYY, LT'),
                end: moment(event.end.local).format('DD-MM-YYYY, LT'),
                capacity: event.capacity
            }
            setEventDetails(eventObject);
        }
        data();
    }, [])

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
        setButtonText('Updating...');
        const body = {
            event: {
                name: {
                    html: `<p>${eventDetails.name}</p>`
                },
                description: {
                    html: `<p>${eventDetails.description}</p>`
                },
                capacity: eventDetails.capacity
            }
        };
        await updateEvent(user, id, body);
        nav(`/${id}`);
    }

    return (
        <>
            {isPending && <h1 className={styles.loading}>Loading...</h1>}
            {eventDetails && <div className={styles.formContainer}>
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
                        <input type="text" disabled value={eventDetails.start} onChange={(e) => handleChanges(e, "start")} />
                    </div>
                    <div>
                        <label> End Date</label>
                        <input type="text" disabled value={eventDetails.end} onChange={(e) => handleChanges(e, "end")} />
                    </div>
                    <div>
                        <label> Capacity</label>
                        <input type="number" disabled={formDisable} required value={eventDetails.capacity} onChange={(e) => handleChanges(e, "capacity")} />
                    </div>
                    <div>
                        <button disabled={formDisable}>{buttonText}</button>
                    </div>
                </form>
            </div>}
        </>
    );
}

export default EditEvent;