let questions = window.quizData;
let current = 0;
let score = 0;
let timer;
let review = [];

function showQuestion() {
  const q = questions[current];
  document.getElementById("questionContainer").innerText = q.question;
  const answers = document.getElementById("answersContainer");
  answers.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
  startTimer();
}

function checkAnswer(index) {
  const correct = questions[current].answer;
  if (index === correct) score++;
  else review.push({
    question: questions[current].question,
    yourAnswer: questions[current].options[index],
    correctAnswer: questions[current].options[correct],
    explanation: questions[current].explanation
  });
  stopTimer();
  current++;
  if (current < questions.length) showQuestion();
  else showResult();
}

function showResult() {
  document.getElementById("questionContainer").innerText = 
    \`Quiz Complete! Score: \${score}/\${questions.length}\`;
  document.getElementById("answersContainer").innerHTML = "";
  let resultHtml = "<h3>Review:</h3><ul>";
  review.forEach(r => {
    resultHtml += \`<li><strong>\${r.question}</strong><br>
    Your Answer: \${r.yourAnswer}<br>
    Correct: \${r.correctAnswer}<br>
    Why: \${r.explanation}</li>\`;
  });
  document.getElementById("answersContainer").innerHTML = resultHtml + "</ul>";
}

function startTimer() {
  let time = 30;
  const bar = document.getElementById("timerBar");
  bar.style.width = "100%";
  timer = setInterval(() => {
    time--;
    bar.style.width = (time / 30 * 100) + "%";
    if (time <= 0) {
      clearInterval(timer);
      checkAnswer(-1);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

document.getElementById("nextButton").onclick = () => {
  stopTimer();
  current++;
  if (current < questions.length) showQuestion();
  else showResult();
};

document.getElementById("restartButton").onclick = () => location.reload();

document.getElementById("exportButton").onclick = () => {
  const blob = new Blob([JSON.stringify({ score, review }, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "quiz_progress.json";
  a.click();
};

document.getElementById("modeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

showQuestion();
