import React, { useState, useEffect } from 'react';
import '../styles/Reservation.css';

type Booking = {
    id?: string;
    date: string;
    time: string;
    people: number;
};

type ReservationFormProps = {
    booking?: Booking;
    onSave: (booking: Booking) => Promise<{ success: boolean; message: string }>;
    onCancel?: () => void;
    existingBookings?: Booking[];
};

const TIMESLOTS = [
    "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00",
    "16:00", "17:00"
];

const ReservationForm: React.FC<ReservationFormProps> = ({
                                                             booking,
                                                             onSave,
                                                             onCancel,
                                                             existingBookings = []
                                                         }) => {
    const [date, setDate] = useState(booking?.date || '');
    const [time, setTime] = useState(booking?.time || '');
    const [people, setPeople] = useState(booking?.people || 1);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (booking) {
            setDate(booking.date);
            setTime(booking.time);
            setPeople(booking.people);
        }
    }, [booking]);

    const bookedTimes = existingBookings
        .filter(b => b.date === date && b.id !== booking?.id)
        .map(b => b.time);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) return;

        const bookingData: Booking = {
            id: booking?.id,
            date,
            time,
            people,
        };
        const result = await onSave(bookingData);
        setStatus(result.message);

        if (result.success && !booking) {
            setDate('');
            setTime('');
            setPeople(1);
        }
    };

    return (
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
            <div style={{ marginTop: '14px' }}>
                <button type="submit" disabled={!date || !time}>
                    {booking ? "Save Changes" : "Book Now"}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                        Cancel
                    </button>
                )}
            </div>
            {status && <p className="res-status">{status}</p>}
        </form>
    );
};

export default ReservationForm;
