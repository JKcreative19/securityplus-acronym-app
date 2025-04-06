
const acronyms = [
  {
    "term": "ACL",
    "meaning": "Access Control List",
    "category": "3.0 Implementation",
    "explanation": "ACLs define who can access which resources based on rules."
  },
  {
    "term": "DDoS",
    "meaning": "Distributed Denial of Service",
    "category": "1.0 Threats",
    "explanation": "DDoS floods a system with traffic to make it unavailable."
  },
  {
    "term": "SSH",
    "meaning": "22",
    "category": "Important Ports",
    "explanation": "SSH uses port 22 for secure remote access."
  },
  {
    "term": "HTTPS",
    "meaning": "443",
    "category": "Important Ports",
    "explanation": "HTTPS uses port 443 for secure web communication."
  }
];

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
function getSubset(arr, count) {
  return shuffle([...arr]).slice(0, Math.min(count, arr.length));
}

let filtered = getSubset(acronyms, 50);
let currentIndex = 0;
let score = 0;
let wrongAnswers = [];
let timer;
let timeLimit = 30;
let timeLeft = 30;
let examTimer;

function updateTimerBar() {
  document.getElementById("timerBar").style.width = ((timeLeft / timeLimit) * 100) + "%";
}

function startTimer() {
  clearInterval(timer);
  timeLeft = timeLimit;
  updateTimerBar();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer("⏱ Time's up!", filtered[currentIndex].meaning, filtered[currentIndex].explanation);
    }
  }, 1000);
}

function showQuestion() {
  if (!filtered[currentIndex]) {
    document.getElementById("question").textContent = "✅ You've completed the quiz!";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("restartBtn").style.display = "inline-block";
    return;
  }

  const q = filtered[currentIndex];
  const isPort = q.category === "Important Ports";
  document.getElementById("acronym").textContent = isPort ? `Which port is used for: ${q.term}?` : q.term;
  document.getElementById("feedback").textContent = "";
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const opts = generateChoices(q.meaning);
  opts.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      clearInterval(timer);
      checkAnswer(opt, q.meaning, q.explanation);
    };
    choicesDiv.appendChild(btn);
  });

  startTimer();
}

function generateChoices(correct) {
  const opts = [correct];
  while (opts.length < 4) {
    const rand = acronyms[Math.floor(Math.random() * acronyms.length)].meaning;
    if (!opts.includes(rand)) opts.push(rand);
  }
  return shuffle(opts);
}

function checkAnswer(selected, correct, explanation) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    score++;
    feedback.innerHTML = `<span style='color:green;'>✅ Correct!</span><br>${explanation}`;
  } else {
    feedback.innerHTML = `<span style='color:red;'>❌ Wrong! Correct: ${correct}</span><br>${explanation}`;
    wrongAnswers.push(filtered[currentIndex]);
  }
  document.getElementById("score").textContent = "Score: " + score;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= filtered.length) {
    clearInterval(timer);
    clearInterval(examTimer);
    showReview();
    showQuestion();
  } else {
    showQuestion();
  }
}

function showReview() {
  const list = document.getElementById("reviewList");
  const div = document.getElementById("review");
  list.innerHTML = "";
  wrongAnswers.forEach(q => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${q.term}</strong>: ${q.meaning}<br><em>${q.explanation}</em>`;
    list.appendChild(li);
  });
  div.style.display = "block";
}

function filterByCategory() {
  const val = document.getElementById("categorySelect").value;
  filtered = val === "all" ? getSubset(acronyms, 50) : getSubset(acronyms.filter(q => q.category === val), 50);
  currentIndex = 0;
  score = 0;
  wrongAnswers = [];
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("review").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  showQuestion();
}

function populateCategoryDropdown() {
  const dropdown = document.getElementById("categorySelect");
  const cats = [...new Set(acronyms.map(q => q.category))];
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    dropdown.appendChild(opt);
  });
}

function toggleTheme() {
  const html = document.documentElement;
  html.setAttribute("data-theme", html.getAttribute("data-theme") === "light" ? "dark" : "light");
}

function startExamMode() {
  filtered = getSubset(acronyms, 60);
  currentIndex = 0;
  score = 0;
  wrongAnswers = [];
  timeLimit = 5400;
  examTimer = setTimeout(() => showReview(), 90 * 60000);
  document.getElementById("review").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  showQuestion();
}

function exportProgress() {
  const data = { score: score, total: filtered.length, missed: wrongAnswers };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "securityplus_progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  wrongAnswers = [];
  document.getElementById("review").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  filterByCategory();
}

window.onload = () => {
  populateCategoryDropdown();
  document.getElementById("toggleTheme").onclick = toggleTheme;
  showQuestion();
};
