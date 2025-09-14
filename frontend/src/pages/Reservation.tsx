import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import ReservationForm from '../components/ReservationForm';
import '../styles/Reservation.css';

type Booking = {
    id: string;  // assuming backend provides ids for reservations
    date: string;
    time: string;
    people: number;
};

const Reservation: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;
        fetch('/api/reservations')
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(() => setBookings([]));
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

    // Admin editing handlers

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) return;
        const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setBookings(bookings.filter(b => b.id !== id));
            if (editingBooking?.id === id) setEditingBooking(null);
        } else {
            alert("Failed to delete reservation.");
        }
    };

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
    };

    const handleSave = async (booking: Booking) => {
        if (editingBooking) {
            const res = await fetch(`/api/reservations/${booking.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
            if (res.ok) {
                setBookings(bookings.map(b => b.id === booking.id ? booking : b));
                setEditingBooking(null);
            } else {
                alert('Failed to update reservation.');
            }
        } else {
            // Add new reservation
            const res = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
            if (res.ok) {
                const newBooking = await res.json();
                setBookings([...bookings, newBooking]);
            } else {
                alert('Failed to add reservation.');
            }
        }
    };

    const handleCancel = () => {
        setEditingBooking(null);
    };

    return (
        <div className="reservation-page">
            <h2 className="reservation-title">{isAdmin ? "Manage Reservations" : "Visit us!"}</h2>

            {isAdmin ? (
                <>
                    <button onClick={() => setEditingBooking(null)} style={{ marginBottom: '12px' }}>
                        + Add New Reservation
                    </button>

                    {editingBooking !== null && (
                        <ReservationForm
                            booking={editingBooking}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            existingBookings={bookings}
                        />
                    )}

                    <div className="admin-booking-list">
                        {bookings.length === 0 && <p>No reservations found.</p>}
                        {bookings.map(b => (
                            <div key={b.id} className="booking-item">
                                <span>{b.date} at {b.time} - {b.people} {b.people === 1 ? 'person' : 'people'}</span>
                                <button onClick={() => handleEdit(b)}>Edit</button>
                                <button onClick={() => handleDelete(b.id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <ReservationForm
                    onSave={handleSave}
                    existingBookings={bookings}
                />
            )}
        </div>
    );
};

export default Reservation;
