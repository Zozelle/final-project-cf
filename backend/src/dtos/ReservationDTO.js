class ReservationDTO {
  
    constructor(reservation) {
    this.id = reservation._id;
    this.userId = reservation.userId;
    this.date = reservation.date;
    this.time = reservation.time;
    this.people = reservation.people;
    this.status = reservation.status;
  }
  
}

module.exports = ReservationDTO;
