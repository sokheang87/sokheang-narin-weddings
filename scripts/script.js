// =========================================================
// 1. COUNTDOWN TIMER LOGIC
// =========================================================

// Set the date you are counting down to (YYYY-MM-DDTHH:MM:SS format)
// Target: December 28, 2025, at 4:00 PM
const WEDDING_DATE = new Date("2025-12-28T16:00:00").getTime(); 

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    // Time calculations
    const msInDay = 1000 * 60 * 60 * 24;
    const msInHour = 1000 * 60 * 60;
    const msInMinute = 1000 * 60;

    const days = Math.floor(distance / msInDay);
    const hours = Math.floor((distance % msInDay) / msInHour);
    const minutes = Math.floor((distance % msInHour) / msInMinute);
    const seconds = Math.floor((distance % msInMinute) / 1000);

    // Display the results in the elements, using padStart for leading zeros
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    }

    // When the countdown is finished (less than 0)
    if (distance < 0) {
        clearInterval(countdownFunction);
        if (document.getElementById("countdown-timer")) {
            document.getElementById("countdown-timer").innerHTML = "🎉 **THE CELEBRATION IS HAPPENING!** 🎉";
        }
    }
}, 1000);


// =========================================================
// 2. GOOGLE MAP INITIALIZATION
// =========================================================

// Precise coordinates for Battambang, Cambodia (near Provincial Hall)
// You should confirm and replace these with your exact venue coordinates.
const venueCoordinates = { lat: 13.099167, lng: 103.197222 }; 

function initMap() {
    // This check helps prevent errors if the API key is invalid
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.error("Google Maps API not loaded. Check your API key and network connection.");
        return;
    }

    // Create the map object
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: venueCoordinates,
        mapTypeControl: false, // Optional: Removes satellite/terrain toggles
        streetViewControl: false // Optional: Removes Street View icon
    });

    // Add a marker for the venue
    new google.maps.Marker({
        position: venueCoordinates,
        map: map,
        title: "Our Wedding Venue: Sokheangh & Narin",
    });
}
// Note: The Google Maps API script tag in index.html calls this function automatically 
// when the API finishes loading (due to the `&callback=initMap` parameter).