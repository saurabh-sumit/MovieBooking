const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const seatLeftText = document.getElementById("seatsLeft");
let ticketPrice = Number(movieSelect.value);
const seatLeft = 48 - document.querySelectorAll(".row .seat.occupied").length;
seatLeftText.innerText = seatLeft;
populateUi();
function saveMovieSelection(movieIndex, ticketPrice) {
  // saving movie details into local storage
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("ticketPrice", ticketPrice);
}
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats && selectedSeats.length) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const movieSelectIndex = localStorage.getItem("movieIndex");
  if (movieSelectIndex) {
    movieSelect.selectedIndex = movieSelectIndex;
  }
  selectedSeatsCount();
}
function selectedSeatsCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = selectedSeats.length;
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));
  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}
movieSelect.addEventListener("change", (e) => {
  // movie select handler
  ticketPrice = Number(e.target.value);
  saveMovieSelection(e.target.selectedIndex, ticketPrice);
  selectedSeatsCount();
});
container.addEventListener("click", (e) => {
  // seat change handler
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    selectedSeatsCount();
  }
});
