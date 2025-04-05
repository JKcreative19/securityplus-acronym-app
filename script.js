
// Acronyms + Ports grouped into Security+ domains
const acronyms = [
  {
    term: "ACL",
    meaning: "Access Control List",
    category: "3.0 Implementation",
    explanation: "ACLs define rules to allow or deny network traffic based on IP, port, or protocol."
  },
  {
    term: "AES",
    meaning: "Advanced Encryption Standard",
    category: "3.0 Implementation",
    explanation: "AES is a symmetric encryption standard used for securing sensitive data."
  },
  {
    term: "DDoS",
    meaning: "Distributed Denial of Service",
    category: "1.0 Threats, Attacks, and Vulnerabilities",
    explanation: "DDoS attacks flood a system with traffic from multiple sources to make it unavailable."
  },
  {
    term: "SIEM",
    meaning: "Security Information and Event Management",
    category: "4.0 Operations and Incident Response",
    explanation: "SIEM collects and analyzes logs for real-time threat detection and alerting."
  },
  {
    term: "MFA",
    meaning: "Multi-Factor Authentication",
    category: "3.0 Implementation",
    explanation: "MFA increases security by requiring multiple forms of identity verification."
  },
  {
    term: "443",
    meaning: "HTTPS",
    category: "Important Ports",
    explanation: "Port 443 is used for secure web traffic using TLS/SSL."
  },
  {
    term: "80",
    meaning: "HTTP",
    category: "Important Ports",
    explanation: "Port 80 is used for standard unencrypted web traffic."
  },
  {
    term: "22",
    meaning: "SSH",
    category: "Important Ports",
    explanation: "Port 22 is used for secure remote access via Secure Shell."
  },
  {
    term: "3389",
    meaning: "RDP",
    category: "Important Ports",
    explanation: "Port 3389 allows remote desktop connections to Windows machines."
  },
  {
    term: "53",
    meaning: "DNS",
    category: "Important Ports",
    explanation: "Port 53 is used to resolve domain names to IP addresses."
  }
];

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomSubset(arr, count) {
  return shuffle([...arr]).slice(0, Math.min(count, arr.length));
}

// State
let filteredAcronyms = getRandomSubset(acronyms, 50);
let currentIndex = 0;
let score = 0;
let wrongAnswers = [];
let timerInterval;
let timeLimit = 30;
let timeLeft = timeLimit;

// UI updates
function updateTimerBar() {
  const bar = document.getElementById("timerBar");
  bar.style.width = ((timeLeft / timeLimit) * 100) + "%";
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = timeLimit;
  updateTimerBar();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      checkAnswer("⏱ Time's up!", filteredAcronyms[currentIndex].meaning, filteredAcronyms[currentIndex].explanation);
    }
  }, 1000);
}

// Question display
function showQuestion() {
  if (filteredAcronyms.length === 0) return;
  const question = filteredAcronyms[currentIndex];
  document.getElementById("acronym").textContent = question.term;
  document.getElementById("feedback").textContent = "";
  const choices = generateChoices(question.meaning);
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => {
      clearInterval(timerInterval);
      checkAnswer(choice, question.meaning, question.explanation);
    };
    choicesDiv.appendChild(btn);
  });

  startTimer();
}

// Multiple choice options
function generateChoices(correct) {
  const options = [correct];
  while (options.length < 4) {
    const rand = acronyms[Math.floor(Math.random() * acronyms.length)].meaning;
    if (!options.includes(rand)) options.push(rand);
  }
  return shuffle(options);
}

// Feedback
function checkAnswer(selected, correct, explanation) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    score++;
    feedback.innerHTML = `<span style="color: green;">✅ Correct!</span><br>${explanation}`;
  } else {
    feedback.innerHTML = `<span style="color: red;">❌ Wrong! Correct: ${correct}</span><br>${explanation}`;
    wrongAnswers.push(filteredAcronyms[currentIndex]);
  }
  document.getElementById("score").textContent = "Score: " + score;
}

// Review
function showReview() {
  const review = document.getElementById("review");
  const list = document.getElementById("reviewList");
  list.innerHTML = "";
  wrongAnswers.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.term}</strong>: ${item.meaning}<br><em>${item.explanation}</em>`;
    list.appendChild(li);
  });
  review.style.display = "block";
}

// Navigation
function nextQuestion() {
  currentIndex++;
  if (currentIndex >= filteredAcronyms.length) {
    clearInterval(timerInterval);
    showReview();
  } else {
    showQuestion();
  }
}

// Category dropdown
function filterByCategory() {
  const selected = document.getElementById("categorySelect").value;
  if (selected === "all") {
    filteredAcronyms = getRandomSubset(acronyms, 50);
  } else {
    filteredAcronyms = getRandomSubset(acronyms.filter(a => a.category === selected), 50);
  }
  currentIndex = 0;
  score = 0;
  wrongAnswers = [];
  document.getElementById("score").textContent = "Score: 0";
  document.getElementById("review").style.display = "none";
  showQuestion();
}

// Populate category select
function populateCategoryDropdown() {
  const dropdown = document.getElementById("categorySelect");
  const categories = [...new Set(acronyms.map(a => a.category))];
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    dropdown.appendChild(opt);
  });
}

// Init
window.onload = () => {
  populateCategoryDropdown();
  showQuestion();
};
