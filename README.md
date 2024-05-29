# ryan-dev-flat-phase-1-project

The script, designed for a web page, displays random dog images. It empowers users to search for specific breed images, rate and comment on them, and navigate their image viewing history. The Dog CEO API fetches the images and breed data for the script. The browser's local storage persists the ratings data across sessions.

The script's structure revolves around several functions. Each function performs a specific task:

1. **Fetching and Displaying Images**: This function fetches and displays the images.
2. **Displaying Breed Info**: This function presents the breed information.
3. **Displaying Ratings**: This function shows the ratings.
4. **Handling User Interactions**: This function manages user interactions.

The 'DOMContentLoaded' event triggers the script's initialization, indicating the complete loading and parsing of the initial HTML document. The script then sets up references to various HTML elements, initializes several variables, sets up event listeners, loads the ratings data from local storage, and fetches and displays a random image.

The script also includes several helper functions. These functions perform tasks such as:

- Extracting the breed from an image URL
- Loading and saving the ratings data
- Displaying images, breed info, and ratings

The script extensively uses the fetch function to make requests to the Dog CEO API and the then method to handle the responses. It also uses the addEventListener method to set up event listeners for user interactions. For debugging purposes, the script logs various messages to the console.

Here is a more detailed description of the code:

| Line Number | Code | Explanation |
| --- | --- | --- |
| 1 | `document.addEventListener('DOMContentLoaded', () => {` | This line sets up an event listener for the 'DOMContentLoaded' event. This event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. The function passed as the second argument will be executed when this event occurs. |
| 3-12 | `const searchBar = document.getElementById('searchBar'); ... const commentInput = document.getElementById('commentInput');` | These lines create constant references to various HTML elements in the document using their respective IDs. These references will be used throughout the script to manipulate these elements or use their values. |
| 14-18 | `let imageHistory = []; ... let lastSearch = null;` | These lines are initializing several variables that will be used to store data throughout the script. imageHistory will store the URLs of all images viewed, currentIndex will store the index of the current image in the imageHistory array, ratingsData will store the ratings data for each image, allBreeds will store all the breeds fetched from the API, and lastSearch will store the last breed searched for. |
| 21-27 | `fetch('https://dog.ceo/api/breeds/list/all') ... .catch(error => console.error('Error fetching all breeds:', error));` | This block of code is making a fetch request to the Dog CEO API to get a list of all breeds and sub-breeds. If the request is successful, the data is stored in the allBreeds variable. If an error occurs during the request, it is logged to the console. |
| 30-35 | `function loadRatingsData() { ... }` | This function loads the ratings data from local storage. If there is data stored under the key 'ratingsData', it is parsed from JSON format and stored in the ratingsData variable. |
| 38-41 | `function saveRatingsData() { ... }` | This function saves the ratings data to local storage. It does this by converting the ratingsData object to a JSON string and storing it under the key 'ratingsData'. |
| 44-48 | `function extractBreedFromUrl(url) { ... }` | This function extracts the breed from a given image URL. It does this by using a regular expression to match a specific pattern in the URL that corresponds to the breed. If a match is found, it is returned with hyphens replaced by spaces. If no match is found, the string 'Unknown breed' is returned. |
Line 1: This line declares the function extractBreedFromUrl which takes one parameter, url. This function is used to extract the breed of the dog from the URL of the image.

Line 2: This line declares a constant regex which holds the regular expression /breeds\/([a-z-]+)[\/-]/i. This regular expression is used to match the breed in the URL. Let’s break down this regular expression:

breeds\/: This matches the literal string “breeds/” in the URL.
([a-z-]+): This is a capture group that matches one or more (+) lowercase letters (a-z) or hyphens (-). This part of the URL is the breed or sub-breed of the dog.
[\/-]: This matches either a forward slash (/) or a hyphen (-), which are the characters that can follow the breed in the URL.
i: This is a flag that makes the regular expression case-insensitive, meaning it will match both uppercase and lowercase letters.
Line 3: This line declares a constant match which holds the result of the match method being called on url with regex as its argument. The match method returns an array containing the matched text as the first element, followed by the results of any capture groups. If no matches are found, match method returns null.

Line 4: This line returns the breed extracted from the URL. If a match was found (match ?), it takes the first capture group (match[1]), which is the breed, and replaces any hyphens with spaces (replace(/-/g, ' ')). This is done because some breeds are two words and are represented with a hyphen in the URL. If no match was found, it returns the string ‘Unknown breed’.

| 51-64 | `function fetchAndDisplayRandomImage() { ... }` | This function fetches a random image from the Dog CEO API and displays it. If the request is successful, the image URL is added to the imageHistory array, currentIndex is updated to the index of the new image, lastSearch is reset to null, and the image, breed info, and ratings are displayed. If an error occurs during the request, it is logged to the console. |
| 67-92 | `function fetchImagesForBreed(breedInput) { ... }` | This function fetches images for a specific breed from the Dog CEO API and displays them. It first constructs the breed path for the API request based on the input breed. Then it makes the request. If the request is successful, the image URLs are added to the imageHistory array, currentIndex is updated to the index of the first new image, and the image and breed info are displayed. If the breed is not found or an error occurs during the request, an alert is displayed. |
| 95-101 | `searchButton.addEventListener('click', () => { ... });` | This block of code sets up an event listener for the 'click' event on the search button. When the button is clicked, the breed entered in the search bar is fetched and displayed. If no breed is entered, an alert is displayed. |
| 104-108 | `function displayImage(imageUrl) { ... }` | This function displays an image. It does this by setting the src attribute of the dogImage element to the given image URL and clearing the innerHTML of the imageRatings element. |
| 111-123 | `function displayBreedInfo(imageUrl) { ... }` | This function displays breed info for a given image URL. It first extracts the breed from the URL, splits the breed name into words, capitalizes the first letter of each word, reverses the words if there are two, and joins the words back together. Then it sets the textContent of the breedInfo element to the breed. |
| 126-136 | `function displayRatings(imageUrl) { ... }` | This function displays the ratings for a given image URL. It first gets the ratings data for the image, calculates the average rating, and generates the HTML for the comments. Then it sets the innerHTML of the ratingsElement to the average rating and comments. |
| 139-150 | `nextButton.addEventListener('click', () => { ... });` | This block of code sets up an event listener for the 'click' event on the next button. When the button is clicked, if there are more images in the history, it goes to the next image and displays it. If there are no more images in the history, it fetches and displays a new random image. |
| 153-160 | `prevButton.addEventListener('click', () => { ... });` | This block of code sets up an event listener for the 'click' event on the previous button. When the button is clicked, if there are previous images in the history, it goes back to the last image and displays it. |
| 163-180 | `commentForm.addEventListener('submit', (event) => { ... });` | This block of code sets up an event listener for the 'submit' event on the comment form. When the form is submitted, it prevents the default form submission behavior, gets the current image URL, rating, and comment, adds the rating and comment to the ratingsData for the image, saves the ratings data, displays the ratings for the image, resets the form, and logs the submitted comment and rating. |
| 183 | `loadRatingsData();` | This line calls the loadRatingsData function to load the ratings data from local storage. |
| 184 | `fetchAndDisplayRandomImage();` | This line calls the fetchAndDisplayRandomImage function to fetch and display a random image. |
| 185 | `});` | This line closes the function passed as the second argument to the 'DOMContentLoaded' event listener. |

#Revised code:
JavaScript
1  document.addEventListener('DOMContentLoaded', () => {
2    // DOM element references
3    const elements = {
4      searchBar: document.getElementById('searchBar'), // The search bar
5      searchButton: document.getElementById('searchButton'), // The search button
6      prevButton: document.getElementById('prevButton'), // The previous button
7      nextButton: document.getElementById('nextButton'), // The next button
8      breedInfo: document.getElementById('breedInfo'), // The breed info display
9      imageRatings: document.getElementById('imageRatings'), // The image ratings display
10     dogImage: document.getElementById('dogImage'), // The dog image display
11     commentForm: document.getElementById('commentForm'), // The comment form
12     commentInput: document.getElementById('commentInput') // The comment input field
13   };


Lines 1-13: This is the initialization of the script. It waits for the DOM to be fully loaded before executing the script. It then creates references to various DOM elements that will be used throughout the script.
JavaScript
14   let state = {
15     imageHistory: [], // The history of images viewed
16     currentIndex: 0, // The index of the current image in the imageHistory array
17     ratingsData: {}, // The ratings data for each image
18     allBreeds: {}, // All the breeds fetched from the API
19     lastSearch: null // The last breed searched for
20   };


Lines 14-20: This is the state of the application. It keeps track of the images viewed, the current image index, the ratings data for each image, all the breeds fetched from the API, and the last breed searched for.
JavaScript
21   // Fetch all breeds and sub-breeds
22   fetch('https://dog.ceo/api/breeds/list/all')
23     .then(response => response.json())
24     .then(data => {
25       if (data.status === 'success') {
26         state.allBreeds = data.message;
27         console.log('All breeds data:', state.allBreeds); // Log all breeds data
28       }
29     })
30     .catch(error => handleError('Error fetching all breeds:', error));


Lines 21-30: This block of code fetches all the breeds and sub-breeds from the Dog CEO API. If the fetch is successful, it updates the allBreeds property of the state with the fetched data.
JavaScript
31   // Load the ratings data from local storage
32   loadRatingsData();


Lines 31-32: This line calls the loadRatingsData function, which loads the ratings data from the local storage.
JavaScript
33   // Fetch and display a random image
34   fetchAndDisplayRandomImage();


Lines 33-34: This line calls the fetchAndDisplayRandomImage function, which fetches and displays a random dog image.
JavaScript
35   // Event listener for the search button
36   elements.searchButton.addEventListener('click', handleSearchClick);


Lines 35-36: This line adds an event listener to the search button. When the search button is clicked, it calls the handleSearchClick function.
JavaScript
37   // Event listener for the next button
38   elements.nextButton.addEventListener('click', handleNextClick);


Lines 37-38: This line adds an event listener to the next button. When the next button is clicked, it calls the handleNextClick function.
JavaScript
39   // Event listener for the previous button
40   elements.prevButton.addEventListener('click', handlePrevClick);


Lines 39-40: This line adds an event listener to the previous button. When the previous button is clicked, it calls the handlePrevClick function.
JavaScript
41   // Event listener for the comment form
42   elements.commentForm.addEventListener('submit', handleCommentSubmit);


Lines 41-42: This line adds an event listener to the comment form. When the form is submitted, it calls the handleCommentSubmit function.

The rest of the code consists of function definitions that are called in the above lines. These functions handle errors, load and save ratings data, extract breed from URL, fetch and display random images, fetch images for a specific breed, handle search click, display image, display breed info, display ratings, handle next click, handle previous click, and handle comment submit.




Early Phase of Project for Pitch:
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

Initial Project pitch, summarized:


The project, “Pawsome Pics,” is a Single Page Application (SPA) designed for dog enthusiasts to search and rate images of various dog breeds. It uses HTML, CSS, and JavaScript, and interfaces with the Dog API to fetch a vast collection of dog images.

Key Features

Search Functionality: Users can search for their desired dog breed.
Image Navigation: ‘Next’ and ‘Previous’ buttons allow users to browse images without page reloads.
Rating System: Users can assign star ratings to their favorite images.
Development Strategy

Adherence to best coding practices, emphasizing DRY principles.
Use of array iteration methods to manipulate the fetched data.
Development of a functional MVP demonstrating the core features.

Project Organization

Detailed documentation of decisions and progress.
Regular consultations with instructors for guidance.
Extended Goals

Post-MVP, the project may explore the use of json-server to persist user interactions, such as ratings.