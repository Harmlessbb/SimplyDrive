
export async function getBookings() {
  const url = "https://api.simplydrive.app/Api/Bookings/DealerBookings?dealerID=1";

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}

export async function getBookingsOnsite() {
  const url = "https://api.simplydrive.app/Api/Bookings/BookingsByStatus?dealerID=1&bookingStatus=onsite";

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}

export async function getBookingDetails(bookingID) {
  const url = `https://api.simplydrive.app/Api/Bookings/BookingsByID?bookingID=${bookingID}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}