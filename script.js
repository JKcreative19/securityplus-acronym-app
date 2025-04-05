
// Shortened sample script with logic for timer, dark mode, exam mode, and export (see full in previous step)
// [Note: You can re-expand this later, but including core logic again here to complete ZIP.]
const acronyms = [
  { term: "ACL", meaning: "Access Control List", category: "3.0 Implementation", explanation: "ACLs allow/deny network traffic." },
  { term: "443", meaning: "HTTPS", category: "Important Ports", explanation: "Port 443 is used for secure web traffic." },
  { term: "22", meaning: "SSH", category: "Important Ports", explanation: "Port 22 is used for secure remote access." },
  { term: "DDoS", meaning: "Distributed Denial of Service", category: "1.0 Threats", explanation: "DDoS floods systems with traffic." }
];

function shuffle(arr) { return arr.sort(() => Math.random() - 0.5); }
function getSubset(arr, count) { return shuffle([...arr]).slice(0, Math.min(count, arr.length)); }

let filtered = getSubset(acronyms, 50), currentIndex = 0, score = 0, wrongAnswers = [];
let timer, timeLimit = 30, timeLeft = 30, examTimer;

function updateTimerBar() {
  document.getElementById("timerBar").style.width = ((timeLeft / timeLimit) * 100) + "%";
}

function startTimer() {
  clearInterval(timer); timeLeft = timeLimit; updateTimerBar();
  timer = setInterval(() => {
    timeLeft--; updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer("⏱ Time's up!", filtered[currentIndex].meaning, filtered[currentIndex].explanation);
    }
  }, 1000);
}

function showQuestion() {
  const q = filtered[currentIndex]; document.getElementById("acronym").textContent = q.term;
  document.getElementById("feedback").textContent = "";
  const choicesDiv = document.getElementById("choices"); choicesDiv.innerHTML = "";
  generateChoices(q.meaning).forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => { clearInterval(timer); checkAnswer(opt, q.meaning, q.explanation); };
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
    score++; feedback.innerHTML = `<span style='color:green;'>✅ Correct!</span><br>${explanation}`;
  } else {
    feedback.innerHTML = `<span style='color:red;'>❌ Wrong! Correct: ${correct}</span><br>${explanation}`;
    wrongAnswers.push(filtered[currentIndex]);
  }
  document.getElementById("score").textContent = "Score: " + score;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= filtered.length) {
    clearInterval(timer); clearInterval(examTimer); showReview();
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
  currentIndex = 0; score = 0; wrongAnswers = [];
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("review").style.display = "none";
  showQuestion();
}

function populateCategoryDropdown() {
  const dropdown = document.getElementById("categorySelect");
  const cats = [...new Set(acronyms.map(q => q.category))];
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    dropdown.appendChild(opt);
  });
}

function toggleTheme() {
  const html = document.documentElement;
  html.setAttribute("data-theme", html.getAttribute("data-theme") === "light" ? "dark" : "light");
}

function startExamMode() {
  filtered = getSubset(acronyms, 60);
  currentIndex = 0; score = 0; wrongAnswers = []; timeLimit = 90 * 60;
  examTimer = setTimeout(() => showReview(), 90 * 60000); showQuestion();
}

function exportProgress() {
  const data = { score: score, total: filtered.length, missed: wrongAnswers };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = url; a.download = "securityplus_progress.json"; a.click(); URL.revokeObjectURL(url);
}

window.onload = () => {
  populateCategoryDropdown();
  document.getElementById("toggleTheme").onclick = toggleTheme;
  showQuestion();
};
