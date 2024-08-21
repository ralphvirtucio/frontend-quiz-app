
const toggle = document.querySelector('[aria-pressed]');


const handleToggleTheme = (e) => {
  const isPress = e.target.getAttribute('aria-pressed') === 'true';
  e.target.setAttribute('aria-pressed', String(!isPress));

  if(!isPress) {
    e.target.dataset.theme = 'light'
  } else {
    e.target.dataset.theme = 'dark'
  }
}


// Event Listeners
toggle.addEventListener("click", handleToggleTheme)