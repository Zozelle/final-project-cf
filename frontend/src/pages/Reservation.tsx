import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import ReservationForm from '../components/ReservationForm';
import '../styles/Reservation.css';

type Booking = {
    id: string;
    date: string;
    time: string;
    people: number;
};

const Reservation: React.FC = () => {
    const { isAuthenticated, token } = useAuth();
    const isAdmin = false;

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
        fetch('/reservations', { headers })
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(() => setBookings([]));
    }, [isAuthenticated, token]);

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

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) return;
        const res = await fetch(`/reservations/${id}`, {
            method: 'DELETE',
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
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

    const handleSave = async (booking: Booking): Promise<{ success: boolean; message: string }> => {
        if (editingBooking) {
            const res = await fetch(`/reservations/${booking.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(booking),
            });

            if (res.ok) {
                setBookings(bookings.map(b => b.id === booking.id ? booking : b));
                setEditingBooking(null);
                return { success: true, message: 'Reservation updated successfully' };
            } else {
                const data = await res.json().catch(() => ({}));
                return { success: false, message: data.message || 'Failed to update reservation.' };
            }
        } else {
            // Add new reservation
            const res = await fetch('/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(booking),
            });

            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                const newBooking = data.reservation || data;
                setBookings([...bookings, newBooking]);
                return { success: true, message: data.message || 'Reservation sent successfully' };
            } else {
                return { success: false, message: data.message || 'Failed to add reservation.' };
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
