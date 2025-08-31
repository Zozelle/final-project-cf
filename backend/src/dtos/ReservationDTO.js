class ReservationDTO {
  
    constructor(reservation) {
    this.id = reservation._id;
    this.userId = reservation.userId;
    this.visitDate = reservation.visitDate;
    this.numGuests = reservation.numGuests;
    this.status = reservation.status;
  }
  
}

module.exports = ReservationDTO;
