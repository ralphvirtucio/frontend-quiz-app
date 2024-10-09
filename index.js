
// const toggle = document.querySelector('[aria-pressed]');


// const handleToggleTheme = (e) => {
//   const isPress = e.target.getAttribute('aria-pressed') === 'true';
//   e.target.setAttribute('aria-pressed', String(!isPress));

//   if(!isPress) {
//     e.target.dataset.theme = 'light'
//   } else {
//     e.target.dataset.theme = 'dark'
//   }
// }


// // Event Listeners
// toggle.addEventListener("click", handleToggleTheme)
// const subButtons = document.querySelectorAll(".btn__subject")
// const answers = document.querySelectorAll('input[type="radio"]')


// subButtons.forEach(btn => {
//   btn.addEventListener('click', async (e) => {
//     const value = e.target.textContent.trim()
    
//     try {
//       const res = fetchData(value)

//       res.then(data => {
//         console.log(data, 'button ' + value)
//       })
//     } catch (e) {
//       console.error(e)
//     }
//   })
  
// })

const fetchData = async (query) => { 
  try {
    const res = await fetch('data.json');

    if(!res.ok) {
      throw new Error("Something went wrong: " + res.status)
    }

    const data = await res.json()

    console.log(data)

    // return quiz
    
  } catch (error) {
    console.error(error.message)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})