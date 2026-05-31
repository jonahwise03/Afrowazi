const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);


document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop the page from refreshing

  // 1. Capture the data from the form
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // 2. Send the data as JSON
  fetch('https://formspree.io/f/xojvvojd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // This tells the server JSON is coming
      'Accept': 'application/json'
    },
    body: JSON.stringify(data) // This converts the data to a JSON string
  })
  .then(response => {
    if (response.ok) {
      alert('Message sent successfully!');
      this.reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  })
  .catch(error => console.error('Error:', error));
});

// Grab the slider and your existing buttons
const slider = document.querySelector('.slider');
const nextBtn = document.querySelector('.nav .next');
const prevBtn = document.querySelector('.nav .prev');

// Variables to track where the touch starts and ends
let touchStartX = 0;
let touchEndX = 0;

// The minimum distance (in pixels) the finger must move to trigger a swipe
const minSwipeDistance = 50; 

// Listen for the start of a touch
slider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

// Listen for the end of a touch
slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

// Calculate the direction and trigger the correct button
function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  // Swipe Left (Negative distance) -> Go to Next Image
  if (swipeDistance < -minSwipeDistance) {
    nextBtn.click(); 
  }
  // Swipe Right (Positive distance) -> Go to Previous Image
  else if (swipeDistance > minSwipeDistance) {
    prevBtn.click(); 
  }
}