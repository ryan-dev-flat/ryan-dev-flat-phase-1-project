document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const imageContainer = document.querySelector('.image-container');
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const nextButton = document.getElementById('nextButton');
    let currentImages = [];
    let currentIndex = 0;
    let ratingsData = {};
    let breedsData = {};
  
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
  
    // Fetch all breeds and sub-breeds
    function fetchAllBreeds() {
      fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
          breedsData = data.message;
          // Save breedsData to json.db here
        })
        .catch(error => console.error('Error fetching breeds:', error));
    }
  
    // Fetch images for the selected breed from The Dog API
    function fetchImagesForBreed(breed) {
      const apiUrl = `https://dog.ceo/api/breed/${breed}/images`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          currentImages = data.message;
          currentIndex = 0;
          displayCurrentImage();
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          imageContainer.innerHTML = '<p>Error fetching images. Please try again later.</p>';
        });
    }
  
    // Display the current image
    function displayCurrentImage() {
      if (currentImages.length > 0 && currentIndex < currentImages.length) {
        const imageUrl = currentImages[currentIndex];
        imageContainer.innerHTML = `<img src="${imageUrl}" class="img-fluid">`;
        displayRatings(imageUrl);
      } else {
        imageContainer.innerHTML = '<p>No more images available for this breed.</p>';
      }
    }
  
    // Display ratings for the current image
    function displayRatings(imageUrl) {
      const imageRatings = ratingsData[imageUrl] || { ratings: [], comments: [] };
      const averageRating = imageRatings.ratings.length ? (imageRatings.ratings.reduce((a, b) => a + b, 0) / imageRatings.ratings.length).toFixed(2) : 'No ratings yet';
      const comments = imageRatings.comments.map(comment => `<p>${comment}</p>`).join('');
      imageContainer.innerHTML += `
        <div>Average Rating: ${averageRating}</div>
        <div>Comments: ${comments}</div>
      `;
    }
  
    // Event listener for the search button
    searchButton.addEventListener('click', () => {
      const breed = searchBar.value.trim().toLowerCase();
      if (breed) {
        fetchImagesForBreed(breed);
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
  
    // Event listener for the next button
    nextButton.addEventListener('click', () => {
      if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        displayCurrentImage();
      } else {
        alert('You have reached the end of the images for this breed.');
      }
    });
  
    loadRatingsData();
    fetchAllBreeds();
  });
  