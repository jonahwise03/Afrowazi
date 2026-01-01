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
  fetch('action="https://formspree.io/f/xojvvojd', {
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