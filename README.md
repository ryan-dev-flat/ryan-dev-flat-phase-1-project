# ryan-dev-flat-phase-1-project
// Pseudocode for Dog Breed Picture Search SPA MVF

// Define global variables
let currentBreed = '';
let currentImageIndex = 0;
let imagesData = [];
let ratingsData = {};

// Initialize application
DOMContentLoaded 
function initializeApp() {
  // Load any existing ratings from local storage
  loadRatings();
  // Set up event listeners
  setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
  // Event listener for search bar submission
  document.getElementById('searchBar').addEventListener('change', handleSearch);
  // Event listener for next and previous buttons
  document.getElementById('nextButton').addEventListener('click', showNextImage);
  document.getElementById('prevButton').addEventListener('click', showPrevImage);
  // Event listener for rating submission
  document.getElementById('rateButton').addEventListener('click', handleRating);
}

// Handle search bar submission  
function handleSearch(event) {
  currentBreed = event.target.value;
  fetchImagesForBreed(currentBreed);
}

// Fetch images for the selected breed
function fetchImagesForBreed(breed) {
  // Asynchronous API call to fetch images
  // Update imagesData with the response
  // Display the first image
}

// Show next image in the array
function showNextImage() {
  // Increment currentImageIndex
  // Display the image at the new index
}

// Show previous image in the array
function showPrevImage() {
  // Decrement currentImageIndex
  // Display the image at the new index
}

// Handle rating submission
function handleRating() {
  // Get rating value from the input
  // Store rating in ratingsData
  // Save ratingsData to local storage
}

// Load ratings from local storage
function loadRatings() {
  // Check if ratings exist in local storage
  // If yes, load ratings into ratingsData
}

// Save ratings to local storage
function saveRatings() {
  // Save ratingsData to local storage
}

// Display image based on index
function displayImage(index) {
  // Get image URL from imagesData
  // Update the image display area with the new image
}

// Start the application
initializeApp();
Good day,

I am pleased to present to you a project that encapsulates the culmination of our learning journey thus far. The project, titled “Pawsome Pics,” is a Single Page Application (SPA) designed to offer an engaging platform for dog enthusiasts to search and rate images of various dog breeds.

Project Overview: “Pawsome Pics” is a web-based application that leverages the capabilities of HTML, CSS, and JavaScript to deliver a user-friendly experience. It interfaces with the Dog API, a public API that provides a vast collection of dog images, which users can filter by breed.

Technical Specifications:

Frontend Composition: The application is crafted using the core building blocks of web development—HTML for structure, CSS for styling, and JavaScript for functionality.
API Integration: The Dog API serves as the data source, offering a wide array of dog images without the need for an API key, thus simplifying the data retrieval process.
Asynchronous Data Handling: All interactions with the API are conducted asynchronously, ensuring a smooth and uninterrupted user experience.
Interactive Features:

Search Functionality: A dedicated search bar allows users to input their desired dog breed, triggering a fetch request to the API.
Image Navigation: Users can browse through the images using ‘Next’ and ‘Previous’ buttons, implemented without page reloads to maintain SPA integrity.
Rating System: An optional rating feature enables users to assign star ratings to their favorite images, enhancing user engagement.
Development Strategy:

The project will adhere to best coding practices, emphasizing DRY principles and the use of functions to minimize code redundancy.
Array iteration methods such as map, forEach, and filter will be employed to manipulate the data fetched from the API.
Minimum Viable Product (MVP):

The initial focus will be on developing a functional MVP that demonstrates the core features of the application.
Early testing of the API will ensure its suitability for the project’s needs.
Anticipated Challenges:

While challenges are an expected part of the development process, they will be addressed through a systematic approach to debugging and problem-solving.
Project Organization:

Detailed documentation of decisions and progress will be maintained throughout the project lifecycle.
Regular consultations with instructors will provide guidance and ensure the project remains within scope.
Extended Goals:

Post-MVP, the project may explore the use of json-server to persist user interactions, such as ratings.
Conclusion: In summary, “Pawsome Pics” aims to deliver a delightful and interactive platform for dog lovers to explore and appreciate the beauty of various dog breeds. I look forward to your feedback and any insights you may offer as we embark on this development journey.

Thank you for your attention.