const lightStyleLink = document.querySelector('link[href="lslight.css"]');
const darkStyleLink = document.querySelector('link[href="ls.css"]');

// Check for user preference in local storage
const userTheme = localStorage.getItem('userTheme');
if (userTheme) {
  if (userTheme === 'dark') {
    darkStyleLink.disabled = false;
    lightStyleLink.disabled = true;
  } else {
    darkStyleLink.disabled = true;
    lightStyleLink.disabled = false;
  }
}






const searchForm = document.getElementById('clue-search');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const searchDate = new Date(searchForm.value).toISOString(); // Convert date to ISO 8601

  // Fetch search results from backend
  const response = await fetch('/search', {
    method: 'GET',
    query: `clue_search=${searchDate}`,
  });

  const clues = await response.json();

  displaySearchResults(clues);
});

function displaySearchResults(clues) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  // Loop through each clue in the results
  clues.forEach((clue) => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('clue-result'); // Add a CSS class for styling

    // Format and display clue details (category, date, description)
    const formattedDate = new Date(clue.dateDiscovered).toLocaleDateString(); // Format date for display
    resultElement.innerHTML = `
      <h3>${clue.category}</h3>
      <p>Date Discovered: ${formattedDate}</p>
      <p>${clue.description}</p>
    `;

    resultsContainer.appendChild(resultElement);
  });
}

