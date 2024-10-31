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

const themeSwitcher = document.querySelector('#themeSwitcher')

const body = document.body

const savedTheme = localStorage.getItem("theme") || "light"
body.classList.add(`${savedTheme}-theme`);
themeSwitcher.setAttribute("aria-label", `Switch to ${savedTheme === "light" ? "dark" : "light"} theme`)

themeSwitcher.addEventListener("click", () => {
  console.log('click')
  const isDark = body.classList.toggle('dark-theme')
  body.classList.toggle('light-theme', !isDark)

  const newTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", newTheme)
  themeSwitcher.setAttribute("aria-label", `Switch to ${newTheme === "light" ? "dark" : "light"} theme`);
})



const quiz = JSON.parse(sessionStorage.getItem('quiz'))

const {icon, questions, title} = quiz

const letters = ["A", "B", "C", "D"]
const userAnswer = []
let userScore = 0

scoreEl.style.display = 'none'

document.title = `${quiz.title} Quiz`

const iconContainerEl = document.createElement('div')
const iconEl = document.createElement('img')
const titleEl = document.createElement('h2')
const progress = document.createElement('progress')

iconContainerEl.classList.add('icon-container')
iconContainerEl.classList.add(`icon__${title.toLowerCase()}`)

iconEl.setAttribute('src', icon)
iconEl.setAttribute('alt', title.toLowerCase())

iconContainerEl.append(iconEl)

progress.setAttribute('type', 'range')
progress.setAttribute('name', 'progress')
progress.setAttribute('max', '100')
progress.setAttribute('id', 'quiz-progress')


titleEl.textContent = title

questionTitle.append(iconContainerEl)
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
    const choicesItem = document.createElement('li')
    const choice = document.createElement('button')
    const choiceLetter = document.createElement('span')
    const choiceOption = document.createElement('p')
    choicesItem.classList.add('choice')
    choiceLetter.classList.add('letter')
    choice.setAttribute('type', 'button')

    choice.dataset.choice = option
    choiceLetter.textContent = letters[index]
    choiceOption.append(document.createTextNode(option))

    choice.append(choiceLetter)
    choice.append(choiceOption)

    choicesItem.append(choice)

    choice.addEventListener('click', (e) => handleChoiceClick(e, choiceLetter))

    choicesEl.append(choicesItem)

  })
}

const handleChoiceClick = (e, selectedLetter) => {
  if(!userAnswer.length) {
    const userAnswerObj = {
      letter: selectedLetter,
      answer: e.currentTarget,
    }
    userAnswer.push(userAnswerObj)

    const { letter, answer } = userAnswer[0]

    answer.style.border ="3px solid #A729F5"
    letter.style.backgroundColor ="#A729F5"
    letter.style.color ="#FFF"
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

  const {letter, answer } = userAnswer[0]
  const selectedAnswer = answer.dataset.choice
  if(selectedAnswer === questions[currentQuestionIdx].answer) {
    answer.style.borderColor = "#26D782"
    letter.style.color = "#fff"
    letter.style.backgroundColor = "#26D782"
    userScore++
  }
  
  if(selectedAnswer !== questions[currentQuestionIdx].answer) {
    answer.style.borderColor = "#EE5454"
    letter.style.color = "#fff"
    letter.style.backgroundColor = "#EE5454"

    const choices = document.querySelectorAll('.choice')
    choices.forEach(choice => {
      const letterEl = choice.querySelector('span')
      const buttonEl = choice.querySelector('button')
      if(buttonEl.dataset.choice === questions[currentQuestionIdx].answer) {
        buttonEl.style.borderColor = "#26D782"
        letterEl.style.color = "#fff"
        letterEl.style.backgroundColor = "#26D782"
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