document.addEventListener('DOMContentLoaded', () => {
  // DOM element references
  const searchBar = document.getElementById('searchBar');
  const searchButton = document.getElementById('searchButton');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const breedInfo = document.getElementById('breedInfo');
  const imageRatings = document.getElementById('imageRatings');
  const dogImage = document.getElementById('dogImage');

  // Global variables for image navigation
  let currentImages = []; // Array to store image URLs
  let currentIndex = 0; // Index of the currently displayed image

  // Load ratings data from local storage
  function loadRatingsData() {
    const storedData = localStorage.getItem('ratingsData');
    if (storedData) {
      ratingsData = JSON.parse(storedData);
    }
  }

  // Save ratings data to local storage
  function saveRatingsData() {
    localStorage.setItem('ratingsData', JSON.stringify(ratingsData));
  }

  // Function to extract breed and sub-breed from the image URL
  function getBreedInfoFromUrl(url) {
    // Regex pattern to match breed and sub-breed in the URL
    const regex = /breeds\/([a-z-]+)-?([a-z]+)?\/n\d+.jpg/i;
    const match = url.match(regex);
    if (match) {
      const breed = match[1];
      const subBreed = match[2];
      return { breed, subBreed };
    }
    return { breed: 'unknown', subBreed: null };
  }

  // Fetch and display a random image on page load
  function fetchRandomImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        currentImages = [imageUrl]; // Reset the images array to only contain the new random image
        currentIndex = 0; // Reset index to the first image
        displayImage(imageUrl);
        displayBreedInfo(imageUrl);
        displayRatings(imageUrl);
      })
      .catch(error => console.error('Error fetching random image:', error));
  }

  // Function to fetch images for a specific breed
  function fetchImagesForBreed(breed) {
    // Fetch images from the API based on the breed
    // Add your API URL and logic here
  }

  // Function to display the image
  function displayImage(imageUrl) {
    dogImage.src = imageUrl;
  }

  // Function to display breed and sub-breed information
  function displayBreedInfo(imageUrl) {
    const { breed, subBreed } = getBreedInfoFromUrl(imageUrl);
    breedInfo.textContent = subBreed ? `${breed} (${subBreed})` : breed;
  }

  // Function to display ratings and comments
  function displayRatings(imageUrl) {
    // Corrected to reference the DOM element by ID
    const ratingsElement = document.getElementById('imageRatings');
    const imageRatings = ratingsData[imageUrl] || { ratings: [], comments: [] };
    const averageRating = imageRatings.ratings.length ? (imageRatings.ratings.reduce((a, b) => a + b, 0) / imageRatings.ratings.length).toFixed(2) : 'No ratings yet';
    const commentsHtml = imageRatings.comments.length ? imageRatings.comments.map(comment => `<p>${comment}</p>`).join('') : '<p>No comments yet</p>';
    ratingsElement.innerHTML = `<div>Average Rating: ${averageRating}</div><div>Comments: ${commentsHtml}</div>`;
  }

  // Event listener for the search button
  searchButton.addEventListener('click', () => {
    const breed = searchBar.value.trim().toLowerCase();
    if (breed) {
      fetchImagesForBreed(breed);
    }
  });

  // Event listener for the next button
nextButton.addEventListener('click', () => {
  // Increment the currentIndex, wrap around if at the end of the array
  currentIndex = (currentIndex + 1) % currentImages.length;
  // Display the next image
  displayImage(currentImages[currentIndex]);
  displayBreedInfo(currentImages[currentIndex]);
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
  // Decrement the currentIndex, wrap around if at the beginning of the array
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  // Display the previous image
  displayImage(currentImages[currentIndex]);
  displayBreedInfo(currentImages[currentIndex]);
});

  // Call the function to fetch and display a random image when the page loads
  fetchRandomImage();
});
