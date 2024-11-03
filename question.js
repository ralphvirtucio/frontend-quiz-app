const quizEl = document.querySelector('.quiz')
const scoreEl = document.querySelector('.score__section')
const questionTitle = document.querySelector('.question__title')
const quizInfo = document.querySelector('.quiz__info')
const questionLength = document.querySelector('.quiz__length')
const question = document.querySelector('.quiz__question')
const questionChoice = document.querySelector('.question__choice')
const choicesEl = questionChoice.querySelector('.choices')
const submitBtn = document.querySelector('.submit-btn')
const nextBtn = document.querySelector('.next-btn')
const errorMessage = document.querySelector('#no-answer-msg')

const scoreSubject = document.querySelector('.score__subject')
const scoreQLength = document.querySelector('#js-question-length')
const quizScore = document.querySelector('#js-score')
const playAgainBtn = document.querySelector('#play-again')
const themeSwitcher = document.querySelector('#themeSwitcher')

const body = document.body
scoreEl.style.display = 'none'


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


document.title = `${quiz.title} Quiz`

const createSubjectTitle = (parentEl) => {
  const iconContainerEl = document.createElement('div')
  const iconEl = document.createElement('img')
  const titleEl = document.createElement('h2')

  iconContainerEl.classList.add('icon-container')
  iconContainerEl.classList.add(`icon__${title.toLowerCase()}`)

  iconEl.setAttribute('src', icon)
  iconEl.setAttribute('alt', title.toLowerCase())
  iconContainerEl.append(iconEl)

  titleEl.textContent = title

  parentEl.append(iconContainerEl)
  parentEl.append(titleEl)

}


const progress = document.createElement('progress')
const choiceCorrect = document.createElement('span')
const choiceIncorrect = document.createElement('span')


choiceCorrect.classList.add('correct-incorrect-icon')
choiceIncorrect.classList.add('correct-incorrect-icon')

choiceCorrect.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#26D782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/></svg>`

choiceIncorrect.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#EE5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/></svg>`


progress.setAttribute('type', 'range')
progress.setAttribute('name', 'progress')
progress.setAttribute('max', '100')
progress.setAttribute('id', 'quiz-progress')

createSubjectTitle(questionTitle)
createSubjectTitle(scoreSubject)


scoreQLength.textContent = questions.length

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
    const choiceColOne = document.createElement('div')
    const choiceLetter = document.createElement('span')
    const choiceOption = document.createElement('p')
    choicesItem.classList.add('choice')
    choiceLetter.classList.add('letter')
    choiceColOne.classList.add('choice__col-one')
    choice.setAttribute('type', 'button')

   
    choice.dataset.choice = option
    choiceLetter.textContent = letters[index]
    choiceOption.append(document.createTextNode(option))

    choiceColOne.append(choiceLetter)
    choiceColOne.append(choiceOption)

    choice.append(choiceColOne)
  
    choicesItem.append(choice)

    choice.addEventListener('click', (e) => handleChoiceClick(e, choiceLetter))

    choicesEl.append(choicesItem)

  })
}

const handleChoiceClick = (e, selectedLetter) => {
  if(!userAnswer.length) {
    errorMessage.style.display = "none"
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
  
  if (currentQuestionIdx + 1 === 10) {
    quizEl.style.display = "none"
    scoreEl.style.display = "block"
    quizScore.textContent = userScore
  }

  if(currentQuestionIdx < questions.length - 1) {
    currentQuestionIdx++
  }


  progress.value = (currentQuestionIdx  + 1) * 10

  userAnswer.pop()
  questionLength.textContent = `Question ${currentQuestionIdx + 1} of ${questions.length}`
  question.textContent = questions[currentQuestionIdx].question
  createChoiceButton(questions[currentQuestionIdx])

  nextBtn.style.display = 'none'
  submitBtn.style.display = 'block'

})

submitBtn.addEventListener('click', (e) => {
  if(!userAnswer.length) {
    errorMessage.style.display = "flex"
    return
  }
  const {letter, answer } = userAnswer[0]
  const choices = document.querySelectorAll('.choice')
  const selectedAnswer = answer.dataset.choice

  if(selectedAnswer === questions[currentQuestionIdx].answer) {
    answer.style.borderColor = "#26D782"
    letter.style.color = "#fff"
    letter.style.backgroundColor = "#26D782"
    answer.append(choiceCorrect)
    userScore++
  }
  
  if(selectedAnswer !== questions[currentQuestionIdx].answer) {
    answer.style.borderColor = "#EE5454"
    letter.style.color = "#fff"
    letter.style.backgroundColor = "#EE5454"
    answer.append(choiceIncorrect)


    choices.forEach(choice => {
      const buttonEl = choice.querySelector('button')
      if(buttonEl.dataset.choice === questions[currentQuestionIdx].answer) {
          buttonEl.append(choiceCorrect)
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

playAgainBtn.addEventListener("click", (e) => {
  userScore = 0
  userAnswer.pop()
})