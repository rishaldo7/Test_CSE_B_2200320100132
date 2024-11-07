const questions = [
  {
    question: "What is the capital of Italy?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswerIndex: 3,
  },
  {
    question: "What is the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswerIndex: 1,
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswerIndex: 3,
  },
  {
    question: "Who is the GOAT?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Sunil Chetri", "Hazelwood"],
    correctAnswerIndex: 0,
  },
];
let currentQuestionIndex = 0;
let selectedAnswers = Array(questions.length).fill(null);
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(questions);
function loadQuestion() {
  const questionText = document.getElementById("q-text");
  const optionsContainer = document.getElementById("opts");
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = index;
    radio.checked = selectedAnswers[currentQuestionIndex] === index;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsContainer.appendChild(label);
  });
  document.getElementById("prev").disabled = currentQuestionIndex === 0;
  document.getElementById("next").disabled =
    currentQuestionIndex === questions.length - 1;
}
function saveAnswer() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    if (option.checked) {
      selectedAnswers[currentQuestionIndex] = parseInt(option.value);
    }
  });
}
function previousQuestion() {
  saveAnswer();
  currentQuestionIndex--;
  loadQuestion();
}
function nextQuestion() {
  saveAnswer();
  currentQuestionIndex++;
  loadQuestion();
}
function finishQuiz() {
  saveAnswer();
  let score = 0;
  selectedAnswers.forEach((answer, index) => {
    if (answer === questions[index].correctAnswerIndex) {
      score++;
    }
  });
  const scorePercentage = (score / questions.length) * 100;
  document.getElementById(
    "score"
  ).textContent = `Your score: ${scorePercentage}%`;
  document.getElementById("score").style.display = "block";
  document.querySelector(".nav-btns").style.display = "none";
}
window.onload = loadQuestion;
