export async function getBookingDetails(bookingID) {
  
  const url = `https://api.simplydrive.app/Api/Bookings/BookingsByID?bookingID=${bookingID}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}

async function setBookingStatusToUpcoming(bookingID)
  {

   console.log(`Sending ${bookingID}`) 
    const numericBookingID = Number(bookingID);
    const url = `https://api.simplydrive.app/Api/Bookings/UpdateStatus?bookingID=${numericBookingID}&newStatus=upcoming`;


    fetch(url, { method: "PUT" })
        .then(res => res.json())
        .then(data => console.log("Response:", data))
        .catch(err => console.error("Error:", err));  

  }