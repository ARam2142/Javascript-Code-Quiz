const highScores = document.querySelector('.viewhighscores');
//elements for question page
const intro = document.querySelector('.intro');
const timer = document.querySelector('#time');
const startBtn = document.querySelector('#start');
const quizQuestions = document.querySelector('#question');
const quizContainer = document.querySelector('#question-container');
const questionPage = document.querySelector('.question-page');
const choiceA = document.querySelector('#A');
const choiceB = document.querySelector('#B');
const choiceC = document.querySelector('#C');
const choiceD = document.querySelector('#D');
const answers = document.querySelector('#answers');
const wrongMsg = document.querySelector('#wrong');
const correctMsg = document.querySelector('#correct');
//end of quiz page
const gameOver = document.querySelector('.end-quiz');
const scores = document.querySelector('.scores-display');
const highScore = document.querySelector('#high-score');

//questions and answers 
const questionSet = [
  
  {
    question: "Who invented JavaScript?",
    optionA: "Douglas Crockford",
    optionB: "Sheryl Sandberg",
    optionC: "Brendan Eich",
    optionD: "Donald Trump",
    correctAnswer: "optionC"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    optionA: "Angular",
    optionB: "jQuery",
    optionC: "RequireJS",
    optionD: "ESLint",
    correctAnswer: "optionD"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    optionA: "Node.js",
    optionB: "TypeScript",
    optionC: "npm",
    optionD: "Python",
    correctAnswer: "optionC"
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    optionA: "<javascript>",
    optionB: "scripting",
    optionC: "js",
    optionD: "script",
    correctAnswer: "optionD"
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    optionA: "The <body> section",
    optionB: "The <head> section",
    optionC: "css file",
    optionD: "Both the <head> section and the <body> section are correct",
    correctAnswer: "optionD"
  },
];

console.log(questionSet);
//variables to be used
var secondsLeft = 60;
var timerInterval;
var currentQuestion;
var currQuestionInd = 0;
var finalQuestionind;


//load question and answers to quiz screen
function generateQuizQuestion() {
  //currQuestionInd++;
  if(currQuestionInd === questionSet.length) {
    displayScore();
  }
  currentQuestion = questionSet[currQuestionInd]; 
  quizQuestions.textContent = currentQuestion.question;
  choiceA.textContent = currentQuestion.optionA;
  choiceB.textContent = currentQuestion.optionB;
  choiceC.textContent = currentQuestion.optionC;
  choiceD.textContent = currentQuestion.optionD;
  choiceA.addEventListener('click', checkAnswer);
  choiceB.addEventListener('click', checkAnswer);
  choiceC.addEventListener('click', checkAnswer);
  choiceD.addEventListener('click', checkAnswer);
  
}
//displayQuiz();

let lastQuestion = questionSet.length - 1;
//go to next question
function nextQuestion () {
  if (currQuestionInd < lastQuestion) {
    currQuestionInd++;
    generateQuizQuestion();
  } else {
    displayScore();
  }
}

//function to check answer if true or false
function checkAnswer(e) {
  //incorrect answer
  var answer = e.currentTarget.textContent;
  var answerKey = questionSet[currQuestionInd].correctAnswer;
  
  if (answer !== questionSet[currQuestionInd][answerKey]) {
    secondsLeft-=5;
    wrongMsg.style.display = "block";
    setTimeout(function (){
      wrongMsg.style.display = "none";
    },1000);
  }
  else {
    //correct message appears when making correct answer
    correctMsg.style.display = "block";
    setTimeout(function (){
      correctMsg.style.display = "none";
    },1000);
   }
  nextQuestion();
}

//will display final score at end of quiz
function displayScore () {
  clearInterval(timerInterval);
  timer.textContent = 0;

  if(secondsLeft < 0) {
    secondsLeft = 0;
  }
  highScore.textContent = secondsLeft;

  document.querySelector('.question-page').style.display ="none";
  document.querySelector("#high-score").style.display ="block";
  document.querySelector('.end-quiz').style.display = "block";
}

//timer will countdown as soon as the button is clicked
function startTimer() {
    timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = secondsLeft;
    
      //if timer is at zero display results
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        //end of the quiz
        displayScore();
      }
  
    }, 1000);
}

//as soon as the button is clicked the first question will be displayed
function initiateQuiz() {
  //hides introductory paragraph on homepage
  document.querySelector('.intro').classList.add("hide");
  //hides start button
  document.querySelector('#start').classList.add('hide')
  //document.querySelector('.scores-display').style.display = "hide";
  questionPage.classList.remove('hide');
  //highScore.classList.remove('hide');

}

//start button
startBtn.addEventListener("click", function() {
  startTimer();
  initiateQuiz();
  generateQuizQuestion();
  checkAnswer();
});


