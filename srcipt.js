const startBtn = document.getElementById("start-btn")
const nextBtn = document.getElementById("next-btn")
const questionContainer = document.getElementById("question-container")
const bar = document.getElementById("header")
let score = 0
const questions = [
    {
        question: 'What is 2+2?',
        answers: [
            { text : '4' , correct: true },
            { text : '22', correct: false }
        ]
    },
    {
        question: 'What is 2+5?',
        answers: [
            { text : '7' , correct: true },
            { text : '25', correct: false }
        ]
    },
    {
        question: 'You is the creator of this game?',
        answers: [
            { text : 'Jenil Chudgar' , correct: true },
            { text : 'Chudgar Jenil' , correct: false },
            { text : 'Chudgar Jenil' , correct: false },
            { text : 'Chudgar Jenil' , correct: false },
        ]
    }
]
const questionElement = document.getElementById("question")
const answerBtns = document.getElementById("answer-btns")
let shuffledQuestions, currenttQuestionIndex

startBtn.addEventListener("click",start)
nextBtn.addEventListener("click",next)

function start() {
    score = 0
    startBtn.classList.add("hide")
    bar.classList.add("hide")
    bar.innerText = ""
    shuffledQuestions = questions.sort(() => Math.random - .5)
    currenttQuestionIndex = 0
    questionContainer.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currenttQuestionIndex])
}

function resetState(){
    clearStatusClass(document.body)
    nextBtn.classList.add("hide")
    while (answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild)
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add("btn","btn-primary")
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click',selectAnswer)
        answerBtns.appendChild(button)
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    setBodyStatusClass(document.body,correct)
    Array.from(answerBtns.children).forEach(button => {
        setBtnStatusClass(button,button.dataset.correct)
        button.disabled = true
    });
    nextBtn.classList.remove("hide")
}


async function setBodyStatusClass(e,correct){
    clearStatusClass(e)
    bar.classList.remove("hide")
    bar.style.fontSize = "1.8rem"
    nextBtn.disabled = true
    if(correct){
        let audio = new Audio('audio/correct.mp3')
        audio.play()
        e.classList.add("correct")
        score++
        bar.innerText = "Correct!"
    }
    else{
        let audio = new Audio('audio/wrong.mp3')
        audio.play()
        e.classList.add("wrong")
        bar.innerText = "Wrong!"
    }
    await new Promise(r => setTimeout(r, 1000))
    nextBtn.disabled = false
}

async function setBtnStatusClass(e,correct) {
    clearStatusClass(e)
    if(correct){
        e.classList.add("btn","btn-success")
    }
    else{
        e.classList.add("btn","btn-danger")
    }
}

function clearStatusClass(e) {
    e.classList.remove("correct")
    e.classList.remove("btn","btn-success")
    e.classList.remove("wrong")
    e.classList.remove("btn","btn-danger")
}

async function next() {
    nextBtn.classList.add("hide")
    bar.classList.add("hide")
    if (shuffledQuestions.length > currenttQuestionIndex+1)
    {   Array.from(answerBtns.children).forEach(button => {
        button.disabled = false
    });
        currenttQuestionIndex++
        setNextQuestion()
    }
    else{
        resetState()
        nextBtn.classList.add("hide")
        questionContainer.classList.add("hide")
        startBtn.classList.remove("hide")
        bar.innerText = ""
        startBtn.innerText = "Reset"
        bar.classList.remove("hide")
        bar.innerText = "Your score is: "+score
    }
}