const quizEl = document.querySelector('.quiz')
const scoreEl = document.querySelector('.score')
const questionTitle = document.querySelector('.question__title')
const quizInfo = document.querySelector('.quiz__info')
const questionLength = document.querySelector('.quiz__length')
const question = document.querySelector('.quiz__question')
const questionChoice = document.querySelector('.question__choice')
const choicesEl = questionChoice.querySelector('.choices')
const submitBtn = document.querySelector('.submit-btn')
const nextBtn = document.querySelector('.next-btn')


const quiz = JSON.parse(sessionStorage.getItem('quiz'))

const {icon, questions, title} = quiz

const letters = ["A", "B", "C", "D"]
const userAnswer = []
let userScore = 0

scoreEl.style.display = 'none'

document.title = `${quiz.title} Quiz`

const iconEl = document.createElement('img')
const titleEl = document.createElement('h1')
const progress = document.createElement('progress')

iconEl.setAttribute('src', icon)
iconEl.setAttribute('alt', title.toLowerCase())
progress.setAttribute('type', 'range')
progress.setAttribute('name', 'progress')
progress.setAttribute('max', '100')
progress.setAttribute('id', 'quiz-progress')


titleEl.textContent = title

questionTitle.append(iconEl)
questionTitle.append(titleEl)

let currentQuestionIdx = 0
let startQuestion = questions[currentQuestionIdx]

progress.value = currentQuestionIdx

quizInfo.append(progress)

questionLength.textContent = `Question ${currentQuestionIdx + 1} of ${questions.length}`
question.textContent = startQuestion.question

nextBtn.style.display = 'none'



const createChoiceButton = (question) => {
  choicesEl.innerHTML = '';

  question.options.forEach((option, index) => {
    const choiceContainer = document.createElement('div')
    const choice = document.createElement('button')
    const choiceLetter = document.createElement('span')
    const choiceOption = document.createElement('p')
    choiceContainer.classList.add('option')
    choice.setAttribute('type', 'button')

    choice.dataset.choice = option
    choiceLetter.textContent = letters[index]
    choiceOption.append(document.createTextNode(option))

    choice.append(choiceLetter)
    choice.append(choiceOption)

    choiceContainer.append(choice)

    choice.addEventListener('click', handleChoiceClick)

    choicesEl.append(choiceContainer)

  })
}

const handleChoiceClick = (e) => {
  if(!userAnswer.length) {
    userAnswer.push(e.currentTarget)
    userAnswer[0].style.border ="3px solid violet"
  }
}
createChoiceButton(startQuestion)

nextBtn.addEventListener('click', (e) => {
  e.preventDefault()
  displayUserScore(userScore, currentQuestionIdx)

  if(currentQuestionIdx < questions.length - 1) {
    currentQuestionIdx++
  }

  progress.value = currentQuestionIdx * 10

  userAnswer.pop()
  questionLength.textContent = `Question ${currentQuestionIdx + 1} of ${questions.length}`
  question.textContent = questions[currentQuestionIdx].question
  createChoiceButton(questions[currentQuestionIdx])


  nextBtn.style.display = 'none'
  submitBtn.style.display = 'block'
})

submitBtn.addEventListener('click', (e) => {
  if(!userAnswer.length) {
    alert('Please select an answer')
    return
  }

  const selectedAnswer = userAnswer[0].dataset.choice

  if(selectedAnswer === questions[currentQuestionIdx].answer) {
    userAnswer[0].style.borderColor = "green"
    userScore++
  }

  if(selectedAnswer !== questions[currentQuestionIdx].answer) {
    userAnswer[0].style.borderColor = "red"

    const choices = document.querySelectorAll('.option')
    choices.forEach(choice => {
      const button = choice.querySelector('button')

      if(button.dataset.choice === questions[currentQuestionIdx].answer) {
          button.style.border ="3px solid green"
      }
    })
  }

  nextBtn.style.display = 'block'
  submitBtn.style.display = 'none'

})

const displayUserScore = (score, index) => {
  if(index === questions.length - 1) {
    quizEl.style.display = 'none'
    scoreEl.style.display = 'block'
    scoreEl.textContent = score
  }
}