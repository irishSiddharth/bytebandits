const toggleButton = document.getElementById('dark-mode-toggle');
const lightStyleLink = document.querySelector('link[href="hplight.css"]');
const darkStyleLink = document.querySelector('link[href="hp.css"]');

function toggleTheme() {
  // Toggle the disabled state of both stylesheets
  lightStyleLink.disabled = !lightStyleLink.disabled;
  darkStyleLink.disabled = lightStyleLink.disabled ? !lightStyleLink.disabled : true; // Ensure dark.css is enabled when light.css is disabled
  
  const theme = lightStyleLink.disabled ? 'dark' : 'light';
  localStorage.setItem('userTheme', theme);
  
}

toggleButton.addEventListener('click', toggleTheme);



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
