const acronyms = [
    { term: "ACL", meaning: "Access Control List", category: "Network Security" },
    { term: "AES", meaning: "Advanced Encryption Standard", category: "Cryptography" },
    { term: "APT", meaning: "Advanced Persistent Threat", category: "Threats & Vulnerabilities" },
    { term: "CIA", meaning: "Confidentiality, Integrity, Availability", category: "Security Concepts" },
    { term: "DDoS", meaning: "Distributed Denial of Service", category: "Threats & Vulnerabilities" },
    { term: "DLP", meaning: "Data Loss Prevention", category: "Data Protection" },
    { term: "DNS", meaning: "Domain Name System", category: "Network Security" },
    { term: "DMZ", meaning: "Demilitarized Zone", category: "Network Security" },
    { term: "EFS", meaning: "Encrypting File System", category: "Data Protection" },
    { term: "FDE", meaning: "Full Disk Encryption", category: "Data Protection" },
    { term: "FTP", meaning: "File Transfer Protocol", category: "Network Security" },
    { term: "GPO", meaning: "Group Policy Object", category: "Access Control" },
    { term: "HIDS", meaning: "Host-based Intrusion Detection System", category: "Monitoring" },
    { term: "HTTPS", meaning: "Hypertext Transfer Protocol Secure", category: "Network Security" },
    { term: "IAM", meaning: "Identity and Access Management", category: "Identity Management" },
    { term: "IDS", meaning: "Intrusion Detection System", category: "Monitoring" },
    { term: "IPS", meaning: "Intrusion Prevention System", category: "Monitoring" },
    { term: "IPSec", meaning: "Internet Protocol Security", category: "Cryptography" },
    { term: "LDAP", meaning: "Lightweight Directory Access Protocol", category: "Identity Management" },
    { term: "MAC", meaning: "Mandatory Access Control", category: "Access Control" },
    { term: "MD5", meaning: "Message Digest 5", category: "Cryptography" },
    { term: "MITM", meaning: "Man-in-the-Middle", category: "Threats & Vulnerabilities" },
    { term: "MFA", meaning: "Multi-Factor Authentication", category: "Identity Management" },
    { term: "NAC", meaning: "Network Access Control", category: "Network Security" },
    { term: "NIST", meaning: "National Institute of Standards and Technology", category: "Security Frameworks" },
    { term: "NTFS", meaning: "New Technology File System", category: "Data Protection" },
    { term: "OTP", meaning: "One-Time Password", category: "Authentication" },
    { term: "PaaS", meaning: "Platform as a Service", category: "Cloud Security" },
    { term: "PBKDF2", meaning: "Password-Based Key Derivation Function 2", category: "Cryptography" },
    { term: "PKI", meaning: "Public Key Infrastructure", category: "Cryptography" },
    { term: "RADIUS", meaning: "Remote Authentication Dial-In User Service", category: "Identity Management" },
    { term: "RAID", meaning: "Redundant Array of Independent Disks", category: "Data Protection" },
    { term: "RBAC", meaning: "Role-Based Access Control", category: "Access Control" },
    { term: "RDP", meaning: "Remote Desktop Protocol", category: "Remote Access" },
    { term: "RSA", meaning: "Rivest Shamir Adleman", category: "Cryptography" },
    { term: "SaaS", meaning: "Software as a Service", category: "Cloud Security" },
    { term: "SAML", meaning: "Security Assertion Markup Language", category: "Authentication" },
    { term: "SHA", meaning: "Secure Hash Algorithm", category: "Cryptography" },
    { term: "SIEM", meaning: "Security Information and Event Management", category: "Monitoring" },
    { term: "SNMP", meaning: "Simple Network Management Protocol", category: "Network Management" },
    { term: "SOC", meaning: "Security Operations Center", category: "Monitoring" },
    { term: "SSH", meaning: "Secure Shell", category: "Network Security" },
    { term: "SSL", meaning: "Secure Sockets Layer", category: "Network Security" },
    { term: "TOTP", meaning: "Time-based One-Time Password", category: "Authentication" },
    { term: "UDP", meaning: "User Datagram Protocol", category: "Network Security" },
    { term: "URL", meaning: "Uniform Resource Locator", category: "Web Security" },
    { term: "USB", meaning: "Universal Serial Bus", category: "Physical Security" },
    { term: "UTM", meaning: "Unified Threat Management", category: "Security Devices" },
    { term: "VLAN", meaning: "Virtual Local Area Network", category: "Network Security" },
    { term: "VPN", meaning: "Virtual Private Network", category: "Network Security" },
    { term: "WAF", meaning: "Web Application Firewall", category: "Web Security" },
    { term: "WPA2", meaning: "Wi-Fi Protected Access 2", category: "Network Security" },
  ];
  
  let filteredAcronyms = [...acronyms];
  let currentIndex = 0;
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function showQuestion() {
    if (filteredAcronyms.length === 0) {
      document.getElementById("question").textContent = "No acronyms in this category.";
      document.getElementById("choices").innerHTML = "";
      return;
    }
  
    const question = filteredAcronyms[currentIndex];
    document.getElementById("acronym").textContent = question.term;
    document.getElementById("feedback").textContent = "";
  
    const choices = generateChoices(question.meaning);
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
  
    choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => checkAnswer(choice, question.meaning);
      choicesDiv.appendChild(btn);
    });
  }
  
  function generateChoices(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
      const random = acronyms[Math.floor(Math.random() * acronyms.length)].meaning;
      if (!options.includes(random)) {
        options.push(random);
      }
    }
    return shuffle(options);
  }
  
  function checkAnswer(selected, correct) {
    const feedback = document.getElementById("feedback");
    if (selected === correct) {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = `Wrong! The correct answer is: ${correct}`;
      feedback.style.color = "red";
    }
  }
  
  function nextQuestion() {
    if (filteredAcronyms.length === 0) return;
    currentIndex = (currentIndex + 1) % filteredAcronyms.length;
    showQuestion();
  }
  
  function filterByCategory() {
    const selected = document.getElementById("categorySelect").value;
    if (selected === "all") {
      filteredAcronyms = [...acronyms];
    } else {
      filteredAcronyms = acronyms.filter(a => a.category === selected);
    }
    currentIndex = 0;
    showQuestion();
  }
  
  // Fill category dropdown when page loads
  function populateCategoryDropdown() {
    const uniqueCategories = [...new Set(acronyms.map(a => a.category))];
    const dropdown = document.getElementById("categorySelect");
    uniqueCategories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      dropdown.appendChild(option);
    });
  }
  
  window.onload = () => {
    populateCategoryDropdown();
    showQuestion();
  };
  