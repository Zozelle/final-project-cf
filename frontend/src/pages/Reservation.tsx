import React, { useState, useEffect } from 'react';
import './styles/Reservation.css';
import { useAuth } from '../context/useAuth';

type Booking = {
    date: string;
    time: string;
    people: number;
};

const TIMESLOTS = [
    "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00",
    "16:00", "17:00"
];

const ReservationPage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState(1);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!isAuthenticated) return;  // don't fetch for guests
        fetch('/api/reservations')
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="reservation-page">
                <div className="reservation-guest-message">
                    <h1 className="reservation-title">Please log in to book a visit</h1>
                    <p className="login-prompt">
                        You must be logged in to make a reservation. Please <a href="/login">log in</a>.
                    </p>
                </div>
            </div>
        );
    }


    const bookedTimes = bookings
        .filter(b => b.date === date)
        .map(b => b.time);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date, time, people }),
        });
        if (res.ok) {
            setStatus('Reservation successful!');
            setBookings([...bookings, { date, time, people }]);
            setTime('');
            setPeople(1);
        } else {
            setStatus('Sorry, could not book — please try another slot.');
        }
    };

    return (
        <div className="reservation-page">
            <h2 className="reservation-title">Visit us!</h2>
            <form className="reservation-form" onSubmit={handleSubmit}>
                <label>
                    Choose a date:
                    <input
                        type="date"
                        value={date}
                        required
                        onChange={e => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </label>
                <label>
                    Choose a time:
                    <select
                        value={time}
                        required
                        onChange={e => setTime(e.target.value)}
                        disabled={!date}
                    >
                        <option value="">Select a time</option>
                        {TIMESLOTS.map(slot =>
                            <option key={slot} value={slot} disabled={bookedTimes.includes(slot)}>
                                {slot} {bookedTimes.includes(slot) ? "(Booked)" : ""}
                            </option>
                        )}
                    </select>
                </label>
                <label>
                    Number of people:
                    <select
                        value={people}
                        onChange={e => setPeople(Number(e.target.value))}
                        required
                    >
                        {[...Array(6)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit" disabled={!date || !time}>
                    Book Now
                </button>
            </form>
            {status && <p className="res-status">{status}</p>}
        </div>
    );
};

export default ReservationPage;
