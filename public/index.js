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

  let currentImages = [];
  let currentIndex = 0;
  let ratingsData = {};
  let allBreeds = {};

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

  function loadRatingsData() {
    const storedData = localStorage.getItem('ratingsData');
    if (storedData) {
      ratingsData = JSON.parse(storedData);
    }
  }

  function saveRatingsData() {
    localStorage.setItem('ratingsData', JSON.stringify(ratingsData));
  }

  function extractBreedFromUrl(url) {
    const regex = /breeds\/([a-z-]+)[\/-]/i;
    const match = url.match(regex);
    return match ? match[1].replace(/-/g, ' ') : 'Unknown breed';
  }

  /*function fetchAndDisplayRandomImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        // Add the new image to the currentImages array
        currentImages.push(imageUrl);
        currentIndex = currentImages.length - 1;
        displayImage(imageUrl);
        displayBreedInfo(imageUrl);
        displayRatings(imageUrl);
      })
      .catch(error => console.error('Error fetching random image:', error));
  }
  
  function fetchImagesForBreed(breedInput) {
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
          currentImages = data.message;
          currentIndex = 0;
          displayImage(currentImages[currentIndex]);
          displayBreedInfo(currentImages[currentIndex]);
        } else {
          alert('Breed not found. Please check the breed name and try again.');
        }
      })
      .catch(error => {
        console.error('Error fetching images for breed:', error);
        alert('An error occurred while fetching breed images. Please try again later.');
      });
  }
  */

  function fetchAndDisplayRandomImage() {
    // Add the loading class
    dogImage.classList.add('loading');
    
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.message;
        // Add the new image to the currentImages array
        currentImages.push(imageUrl);
        currentIndex = currentImages.length - 1;
        displayImage(imageUrl);
        displayBreedInfo(imageUrl);
        displayRatings(imageUrl);
        
        // Remove the loading class
        dogImage.classList.remove('loading');
      })
      .catch(error => {
        console.error('Error fetching random image:', error);
        
        // Remove the loading class
        dogImage.classList.remove('loading');
      });
  }
  
  function fetchImagesForBreed(breedInput) {
    // Add the loading class
    dogImage.classList.add('loading');
    
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
          currentImages = data.message;
          currentIndex = 0;
          displayImage(currentImages[currentIndex]);
          displayBreedInfo(currentImages[currentIndex]);
          
          // Remove the loading class
          dogImage.classList.remove('loading');
        } else {
          alert('Breed not found. Please check the breed name and try again.');
          
          // Remove the loading class
          dogImage.classList.remove('loading');
        }
      })
      .catch(error => {
        console.error('Error fetching images for breed:', error);
        alert('An error occurred while fetching breed images. Please try again later.');
        
        // Remove the loading class
        dogImage.classList.remove('loading');
      });
  }
  

  searchButton.addEventListener('click', () => {
    const breed = searchBar.value.trim().toLowerCase();
    if (breed) {
      fetchImagesForBreed(breed);
    } else {
      alert('Please enter a breed name to search.');
    }
  });

  function displayImage(imageUrl) {
  dogImage.src = imageUrl;
  // Clear the comments and ratings
  imageRatings.innerHTML = '';
}

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
}
 

  function displayRatings(imageUrl) {
    const ratingsElement = document.getElementById('imageRatings');
    const imageRatings = ratingsData[imageUrl] || { ratings: [], comments: [] };
    const averageRating = imageRatings.ratings.length ? (imageRatings.ratings.reduce((a, b) => a + b, 0) / imageRatings.ratings.length).toFixed(2) : 'No ratings yet';
    const commentsHtml = imageRatings.comments.length ? imageRatings.comments.map(comment => `<p>${comment}</p>`).join('') : '<p>No comments yet</p>';
    ratingsElement.innerHTML = `<div>Average Rating: ${averageRating}</div><div>Comments: ${commentsHtml}</div>`;
  }

  nextButton.addEventListener('click', () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      displayImage(currentImages[currentIndex]);
      displayBreedInfo(currentImages[currentIndex]);
      // Load the comments and ratings for the new image
      displayRatings(currentImages[currentIndex]);
    } else {
      fetchAndDisplayRandomImage();
    }
  });
  
  prevButton.addEventListener('click', () => {
    if (currentImages.length > 1) {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      displayImage(currentImages[currentIndex]);
      displayBreedInfo(currentImages[currentIndex]);
      // Load the comments and ratings for the new image
      displayRatings(currentImages[currentIndex]);
    }
  });

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

  loadRatingsData();
  fetchAndDisplayRandomImage();
});
