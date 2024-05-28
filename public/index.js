document.addEventListener('DOMContentLoaded', () => {
  // DOM element references
  const searchBar = document.getElementById('searchBar'); // The search bar
  const searchButton = document.getElementById('searchButton'); // The search button
  const prevButton = document.getElementById('prevButton'); // The previous button
  const nextButton = document.getElementById('nextButton'); // The next button
  const breedInfo = document.getElementById('breedInfo'); // The breed info display
  const imageRatings = document.getElementById('imageRatings'); // The image ratings display
  const dogImage = document.getElementById('dogImage'); // The dog image display
  const commentForm = document.getElementById('commentForm'); // The comment form
  const commentInput = document.getElementById('commentInput'); // The comment input field

  let imageHistory = []; // The history of images viewed
  let currentIndex = 0; // The index of the current image in the imageHistory array
  let ratingsData = {}; // The ratings data for each image
  let allBreeds = {}; // All the breeds fetched from the API
  let lastSearch = null; // The last breed searched for

  // Fetch all breeds and sub-breeds
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        allBreeds = data.message;
        console.log('All breeds data:', allBreeds);
      }
    })
    .catch(error => console.error('Error fetching all breeds:', error));

  // Load the ratings data from local storage
  function loadRatingsData() {
    const storedData = localStorage.getItem('ratingsData');
    if (storedData) {
      ratingsData = JSON.parse(storedData);
    }
  }

  // Save the ratings data to local storage
  function saveRatingsData() {
    localStorage.setItem('ratingsData', JSON.stringify(ratingsData));
  }

  // Extract the breed from the image URL
  function extractBreedFromUrl(url) {
    const regex = /breeds\/([a-z-]+)[\/-]/i;
    const match = url.match(regex);
    return match ? match[1].replace(/-/g, ' ') : 'Unknown breed';
  }

  // Fetch and display a random image
  function fetchAndDisplayRandomImage() {
    console.log('Fetching a random image...');
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        // Add the new image to the imageHistory array
        imageHistory.push(imageUrl);
        currentIndex = imageHistory.length - 1;
        // Reset lastSearch to null
        lastSearch = null;
        displayImage(imageUrl);
        displayBreedInfo(imageUrl);
        displayRatings(imageUrl);
        console.log('Fetched a random image:', imageUrl);
      })
      .catch(error => console.error('Error fetching random image:', error));
  }

  // Fetch images for a specific breed
  function fetchImagesForBreed(breedInput) {
    console.log('Fetching images for breed:', breedInput);
    const [firstWord, secondWord] = breedInput.toLowerCase().split(' ');
    let breedPath = firstWord;
    // If there's a second word, add it to the breed path
    if (secondWord) {
      // Check if the first word is a main breed
      if (allBreeds[firstWord]) {
        breedPath += `/${secondWord}`;
      } else if (allBreeds[secondWord]) {
        // If the second word is a main breed, use it as the breed and the first word as the sub-breed
        breedPath = `${secondWord}/${firstWord}`;
      }
    }
    // Fetch images
    fetch(`https://dog.ceo/api/breed/${breedPath}/images`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Add all the images to the imageHistory array
          imageHistory = imageHistory.concat(data.message);
          currentIndex = imageHistory.length - data.message.length;
          displayImage(imageHistory[currentIndex]);
          displayBreedInfo(imageHistory[currentIndex]);
          console.log('Fetched images for breed:', breedInput);
        } else {
          alert('Breed not found. Please check the breed name and try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching images for breed:', error);
        alert('An error occurred while fetching breed images. Please try again later.');
      });
  }

  // Event listener for the search button
  searchButton.addEventListener('click', () => {
    const breed = searchBar.value.trim().toLowerCase();
    if (breed) {
      lastSearch = breed;
      fetchImagesForBreed(breed);
    } else {
      alert('Please enter a breed name to search.');
    }
  });

  // Display an image
  function displayImage(imageUrl) {
    console.log('Displaying image:', imageUrl);
    dogImage.src = imageUrl;
    // Clear the comments and ratings
    imageRatings.innerHTML = '';
  }

  // Display breed info
  function displayBreedInfo(imageUrl) {
    let breed = extractBreedFromUrl(imageUrl);
    // Split the breed name into words
    let words = breed.split(' ');
    // Capitalize the first letter of each word
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    // If there are two words, reverse them
    if (words.length === 2) {
      words.reverse();
    }
    // Join the words back together
    breed = words.join(' ');
    breedInfo.textContent = breed;
    console.log('Displaying breed info:', breed);
  }

  // Display ratings
  function displayRatings(imageUrl) {
    const ratingsElement = document.getElementById('imageRatings');
    const imageRatings = ratingsData[imageUrl] || { ratings: [], comments: [] };
    const averageRating = imageRatings.ratings.length ? (imageRatings.ratings.reduce((a, b) => a + b, 0) / imageRatings.ratings.length).toFixed(2) : 'No ratings yet';
    const commentsHtml = imageRatings.comments.length ? imageRatings.comments.map(comment => `<p>${comment}</p>`).join('') : '<p>No comments yet</p>';
    ratingsElement.innerHTML = `<div>Average Rating: ${averageRating}</div><div>Comments: ${commentsHtml}</div>`;
    console.log('Displaying ratings:', averageRating, 'and comments:', commentsHtml);
  }

  // Event listener for the next button
  nextButton.addEventListener('click', () => {
    console.log('Next button clicked');
    if (currentIndex < imageHistory.length - 1) {
      // If there are more images in the history, go to the next one
      currentIndex++;
      displayImage(imageHistory[currentIndex]);
      displayBreedInfo(imageHistory[currentIndex]);
      displayRatings(imageHistory[currentIndex]);
    } else {
      // If there are no more images in the history, fetch a new random image
      fetchAndDisplayRandomImage();
    }
  });

  // Event listener for the previous button
  prevButton.addEventListener('click', () => {
    console.log('Previous button clicked');
    if (currentIndex > 0) {
      // If there are previous images, go back to the last one
      currentIndex--;
      displayImage(imageHistory[currentIndex]);
      displayBreedInfo(imageHistory[currentIndex]);
      displayRatings(imageHistory[currentIndex]);
    }
  });

  // Event listener for the comment form
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageUrl = imageHistory[currentIndex];
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
    console.log('Comment submitted:', comment, 'with rating:', rating);
  });

  loadRatingsData();
  fetchAndDisplayRandomImage();
});
