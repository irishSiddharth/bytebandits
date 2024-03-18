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
























