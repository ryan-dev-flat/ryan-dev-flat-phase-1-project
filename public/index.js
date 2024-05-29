document.addEventListener('DOMContentLoaded', () => {
  // DOM element references
  const elements = {
    searchBar: document.getElementById('searchBar'), // The search bar
    searchButton: document.getElementById('searchButton'), // The search button
    prevButton: document.getElementById('prevButton'), // The previous button
    nextButton: document.getElementById('nextButton'), // The next button
    breedInfo: document.getElementById('breedInfo'), // The breed info display
    imageRatings: document.getElementById('imageRatings'), // The image ratings display
    dogImage: document.getElementById('dogImage'), // The dog image display
    commentForm: document.getElementById('commentForm'), // The comment form
    commentInput: document.getElementById('commentInput') // The comment input field
  };

  let state = {
    imageHistory: [], // The history of images viewed
    currentIndex: 0, // The index of the current image in the imageHistory array
    ratingsData: {}, // The ratings data for each image
    allBreeds: {}, // All the breeds fetched from the API
    lastSearch: null // The last breed searched for
  };

  // Fetch all breeds and sub-breeds
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
      if (data.status += 'success') {
        state.allBreeds = data.message;
        console.log('All breeds data:', state.allBreeds); // Log all breeds data
      }
    })
    .catch(error => handleError('Error fetching all breeds:', error));

  // Load the ratings data from local storage
  loadRatingsData();

  // Fetch and display a random image
  fetchAndDisplayRandomImage();

  // Event listener for the search button
  elements.searchButton.addEventListener('click', handleSearchClick);

  // Event listener for the next button
  elements.nextButton.addEventListener('click', handleNextClick);

  // Event listener for the previous button
  elements.prevButton.addEventListener('click', handlePrevClick);

  // Event listener for the comment form
  elements.commentForm.addEventListener('submit', handleCommentSubmit);

  function handleError(message, error) {
    console.error(message, error);
    alert('An error occurred. Please try again later.');
  }

  function loadRatingsData() {
    const storedData = localStorage.getItem('ratingsData');
    if (storedData) {
      state.ratingsData = JSON.parse(storedData);
    }
  }

  function saveRatingsData() {
    localStorage.setItem('ratingsData', JSON.stringify(state.ratingsData));
  }

  function extractBreedFromUrl(url) {
    const regex = /breeds\/([a-z-]+)[\/-]/i;
    const match = url.match(regex);
    return match ? match[1].replace(/-/g, ' ') : 'Unknown breed';
  }

  function fetchAndDisplayRandomImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        state.imageHistory.push(imageUrl);
        state.currentIndex = state.imageHistory.length - 1;
        state.lastSearch = null;
        displayImage(imageUrl);
        displayBreedInfo(imageUrl);
        displayRatings(imageUrl);
        console.log('Successfully fetched and displayed a random image.');
      })
      .catch(error => handleError('Error fetching random image:', error));
  }

  function fetchImagesForBreed(breedInput) {
    const [firstWord, secondWord] = breedInput.toLowerCase().split(' ');
    let breedPath = firstWord;
    if (secondWord) {
      if (state.allBreeds[firstWord]) {
        breedPath += `/${secondWord}`;
      } else if (state.allBreeds[secondWord]) {
        breedPath = `${secondWord}/${firstWord}`;
      }
    }
    fetch(`https://dog.ceo/api/breed/${breedPath}/images/random`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const imageUrl = data.message;
          state.imageHistory.push(imageUrl);
          state.currentIndex = state.imageHistory.length - 1;
          displayImage(imageUrl);
          displayBreedInfo(imageUrl);
          console.log('Successfully fetched and displayed an image for the breed:', breedInput);
        } else {
          alert('Breed not found. Please check the breed name and try again.');
        }
      })
      .catch(error => handleError('Error fetching images for breed:', error));
  }

  function handleSearchClick() {
    const breed = elements.searchBar.value.trim().toLowerCase();
    if (breed) {
      state.lastSearch = breed;
      fetchImagesForBreed(breed);
    } else {
      alert('Please enter a breed name to search.');
    }
  }

  function displayImage(imageUrl) {
    elements.dogImage.src = imageUrl;
    elements.imageRatings.innerHTML = '';
  }

  function displayBreedInfo(imageUrl) {
    let breed = extractBreedFromUrl(imageUrl);
    let words = breed.split(' ');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    if (words.length === 2) {
      words.reverse();
    }
    breed = words.join(' ');
    elements.breedInfo.textContent = breed;
  }

  function displayRatings(imageUrl) {
    const imageRatings = state.ratingsData[imageUrl] || { ratings: [], comments: [] };
    const averageRating = imageRatings.ratings.length ? (imageRatings.ratings.reduce((a, b) => a + b, 0) / imageRatings.ratings.length).toFixed(2) : 'No ratings yet';
    const commentsHtml = imageRatings.comments.length ? imageRatings.comments.map(comment => `<p>${comment}</p>`).join('') : '<p>No comments yet</p>';
    elements.imageRatings.innerHTML = `<div>Average Rating: ${averageRating}</div><div>Comments: ${commentsHtml}</div>`;
  }

  function handleNextClick() {
    if (state.currentIndex < state.imageHistory.length - 1) {
      // If there are more images in the history, go to the next one
      state.currentIndex++;
    } else if (state.lastSearch) {
      // If there are no more images in the history, but a breed search was performed,
      // fetch a new image of the same breed
      fetchImagesForBreed(state.lastSearch);
    } else {
      // If there are no more images in the history and no breed search was performed,
      // fetch a new random image
      fetchAndDisplayRandomImage();
    }
    displayImage(state.imageHistory[state.currentIndex]);
    displayBreedInfo(state.imageHistory[state.currentIndex]);
    displayRatings(state.imageHistory[state.currentIndex]);
    console.log('Next button clicked. Displaying next image.');
  }

  function handlePrevClick() {
    if (state.currentIndex > 0) {
      // If there are previous images, go back to the last one
      state.currentIndex--;
      displayImage(state.imageHistory[state.currentIndex]);
      displayBreedInfo(state.imageHistory[state.currentIndex]);
      displayRatings(state.imageHistory[state.currentIndex]);
      console.log('Previous button clicked. Displaying previous image.');
    }
  }

  function handleCommentSubmit(event) {
    event.preventDefault();
    const imageUrl = state.imageHistory[state.currentIndex];
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    const rating = ratingInput ? parseInt(ratingInput.value) : null;
    const comment = elements.commentInput.value.trim();

    if (!rating && !comment) {
      alert('Please leave a rating or a comment.');
      return;
    }

    if (!state.ratingsData[imageUrl]) {
      state.ratingsData[imageUrl] = { ratings: [], comments: [] };
    }

    if (rating) {
      state.ratingsData[imageUrl].ratings.push(rating);
    }
  
    if (comment) {
      state.ratingsData[imageUrl].comments.push(comment);
    }

    saveRatingsData();
    displayRatings(imageUrl);
    elements.commentForm.reset();
    console.log('Comment submitted:', comment, 'with rating:', rating);
  }
});
