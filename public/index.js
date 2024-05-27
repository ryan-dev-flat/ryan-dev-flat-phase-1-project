// index.js
document.addEventListener('DOMContentLoaded', () => {
  // DOM element references
  const searchBar = document.getElementById('searchBar');
  const searchButton = document.getElementById('searchButton');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const breedInfo = document.getElementById('breedInfo');
  const imageRatings = document.getElementById('imageRatings');
  const dogImage = document.getElementById('dogImage');
  const commentForm = document.getElementById('commentForm');
  const commentInput = document.getElementById('commentInput');

  // Global variables for image navigation
  let currentImages = []; // Array to store image URLs
  let currentIndex = 0; // Index of the currently displayed image
  let ratingsData = {}; // Object to store ratings and comments

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

  // Function to extract breed from the image URL
  function extractBreedFromUrl(url) {
    const regex = /breeds\/([a-z-]+)[\/-]/i;
    const match = url.match(regex);
    return match ? match[1].replace(/-/g, ' ') : 'Unknown breed';
  }

  // Function to fetch and display a random dog image
  function fetchAndDisplayRandomImage() {
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
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          currentImages = data.message; // Store the array of image URLs
          currentIndex = 0; // Reset index to the first image
          displayImage(currentImages[currentIndex]);
          displayBreedInfo(currentImages[currentIndex]);
        } else {
          console.error('Breed not found:', breed);
        }
      })
      .catch(error => console.error('Error fetching images for breed:', error));
  }

  // Function to display the image
  function displayImage(imageUrl) {
    dogImage.src = imageUrl;
  }

  // Function to display breed information
  function displayBreedInfo(imageUrl) {
    breedInfo.textContent = extractBreedFromUrl(imageUrl);
  }

  // Function to display ratings and comments
  function displayRatings(imageUrl) {
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

  // Event listeners for the next and previous buttons
  nextButton.addEventListener('click', () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      displayImage(currentImages[currentIndex]);
      displayBreedInfo(currentImages[currentIndex]);
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      displayImage(currentImages[currentIndex]);
      displayBreedInfo(currentImages[currentIndex]);
    }
  });

  // Event listener for the comment form submission
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageUrl = currentImages[currentIndex];
    const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
    const comment = commentInput.value.trim();

    if (!ratingsData[imageUrl]) {
      ratingsData[imageUrl] = { ratings: [], comments: [] };
    }

    ratingsData[imageUrl].ratings.push(rating);
    ratingsData[imageUrl].comments.push(comment);

    saveRatingsData();
    displayRatings(imageUrl);
    commentForm.reset();
  });

  // Call the function to fetch and display a random image when the page loads
  fetchAndDisplayRandomImage();
});
