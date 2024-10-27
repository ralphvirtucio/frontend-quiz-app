const subject_btns = document.querySelectorAll("[name='subject']")


const fetchData = async (query) => {
  try {
    const response = await fetch('data.json')

    const data = await response.json()

    const selectedQuiz = data.quizzes.filter(quiz => quiz.title.includes(query))
    
    changeToQuestion(selectedQuiz[0])
  } catch (error) {
    console.error("something went wrong", error)
  }
}

const changeToQuestion = (subject) => {
  window.location.href = "/questions.html"
  sessionSetItem('quiz', JSON.stringify(subject))
}

subject_btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    fetchData(e.target.value)
  })
})


const sessionSetItem = (key, value) => {
  sessionStorage.setItem(key, value)
}
const sessionGetItem = (key) => {
  const item = sessionStorage.getItem('quiz')
  
  return JSON.parse(item)
}


const createSubjectTitle = (subject) => {
  const subjectText = subject.title
  const subjectIcon = subject.icon
  const subjectIconClass= `icon__${subject.title.toLowerCase()}`

  const createdSubjectTitle = `<div class="${subjectIconClass}">
    <img src="${subjectIcon}" alt="${subjectText}">
    </div>
    <h1>${subjectText}</h1>
  </div>`

  return createdSubjectTitle
}


window.addEventListener('DOMContentLoaded', () => {

  const questionLetters = ["A", "B", "C", "D"]
  let currentQuestionIdx = 0

  const questionPage = document.querySelector('.question-page')
  const mainQuiz = document.querySelector(".quiz");
  const subjectTitleContainer = questionPage.querySelector('.js-subject-title')
  const questionTotalEl = mainQuiz.querySelector('#js-question-total')
  const questionEl = mainQuiz.querySelector('.question')
  const questionMenu = document.querySelector('.menu')
  const choicesEl = questionMenu.querySelector('.choices')

  const selectedQuiz = sessionGetItem('quiz')

  const subjectTitle = createSubjectTitle(selectedQuiz)
  const questionTotal = `${currentQuestionIdx + 1} of ${selectedQuiz.questions.length}`

  const {question, options, answer } = selectedQuiz.questions[currentQuestionIdx]
  

  subjectTitleContainer.innerHTML = subjectTitle
  questionTotalEl.textContent = questionTotal
  questionEl.textContent = question

  options.forEach((option, i) => {
    const lowerCaseLetter = questionLetters[i].toLowerCase();
    const choiceId = `option-${lowerCaseLetter}`;
    const choice = document.createElement('div');
    choice.classList.add('choice');

    // Create label and input elements separately
    const label = document.createElement('label');
    label.setAttribute('for', choiceId);
    
    const icon = document.createElement('div');
    icon.classList.add('icon', 'icon--choice');
    icon.textContent = questionLetters[i]; // Use textContent for the icon

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    input.value = option
    input.id = choiceId;

    label.appendChild(icon);
    label.appendChild(input);
    label.appendChild(document.createTextNode(`${option}`)); // Treat as text

    choice.appendChild(label); // Append label to choice
    choicesEl.append(choice);   // Append choice to the choices container
  })


  questionMenu.addEventListener('submit', (e) => submitQuestion(e, answer, choicesEl))


})


function submitQuestion(e, answer, choicesEl) {
    e.preventDefault()

  const choices = choicesEl.querySelectorAll(".choice")
  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData)


  const { choice }=  data
  const arrChoice = Array.from(choices)
  const selectedChoice = arrChoice.filter(el => {
    const input = el.querySelector('input')

    return input.value === choice
  })

  const isAnswer = selectedChoice.some(el => {
    const input = el.querySelector('input')
    return input.value === answer
  })

  if (isAnswer) {
    selectedChoice[0].style.border = "3px solid green"

  } else {
    selectedChoice[0].style.border = "3px solid red"

  }
}
// const submitQuestion = (e, answer) => { 
//   e.preventDefault()

//   const formData = new FormData(e.target)
//   const data = Object.fromEntries(formData)

//   const { choice }=  data

//   console.log(this.choi)
// }