const toggleButton = document.getElementById('dark-mode-toggle');
const lightStyleLink = document.querySelector('link[href="ptlight.css"]');
const darkStyleLink = document.querySelector('link[href="pt.css"]');

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
