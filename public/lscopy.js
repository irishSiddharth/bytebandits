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

  

  
  // Format the date as needed
  const userDate = new Date(searchForm.value);
  const year = userDate.getFullYear();
  const month = ('0' + (userDate.getMonth() + 1)).slice(-2);
  const day = ('0' + userDate.getDate()).slice(-2);
  const searchDate = `${year}-${month}-${day}T00:00:00.000+00:00`;









  // Fetch search results from backend
  const response = await fetch('/search', {
    method: 'GET',
    query: `clue_search=${searchDate}`,
  });

  const clues = await response.json();
   console.log(clues); 
 // displaySearchResults(clues);
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
