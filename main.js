const subjectForm = document.querySelector('#subject-menu')
const subjectButtons = subjectForm.querySelectorAll('.subject')


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