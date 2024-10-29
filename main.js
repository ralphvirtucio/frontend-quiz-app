const subjectForm = document.querySelector('#subject-menu')
const themeSwitcher = document.querySelector('#themeSwitcher')
const subjectButtons = subjectForm.querySelectorAll('.subject')

const body = document.body

const savedTheme = localStorage.getItem("theme") || "light"
body.classList.add(`${savedTheme}-theme`);
themeSwitcher.setAttribute("aria-label", `Switch to ${savedTheme === "light" ? "dark" : "light"} theme`)

themeSwitcher.addEventListener("click", () => {
  const isDark = body.classList.toggle('dark-theme')
  body.classList.toggle('light-theme', !isDark)

  const newTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", newTheme)
  themeSwitcher.setAttribute("aria-label", `Switch to ${newTheme === "light" ? "dark" : "light"} theme`);
})

const sessionStoreQuiz = (quiz, subject) => {
  const selectedQuiz = quiz.find(data => data.title.toLowerCase() === subject)
  sessionStorage.setItem('quiz', JSON.stringify(selectedQuiz))
}

const convertNodeListToArr = (nodeList) => {
  return Array.from(nodeList)
}

const getQuizData = async (e) => {
  const selectedSubject = e.currentTarget.textContent.trim().toLowerCase()

  try {
    const response = await fetch('data.json')

    if(response.status !== 200) {
      throw new Error("Please refresh your browser or check your connection")
    }

    const data  = await response.json()

    const {quizzes} = data

    sessionStoreQuiz(convertNodeListToArr(quizzes), selectedSubject)

  } catch(error) {
    console.error('Something went wrong', error)
  }
}

subjectButtons.forEach(node => {
  sessionStorage.removeItem('quiz')
  node.addEventListener('click', getQuizData)
})

window.addEventListener('DOMContentLoaded', () => {
  sessionStorage.removeItem('quiz')
})