const acronyms = [
  {
    "term": "ACL",
    "meaning": "Access Control List",
    "category": "Network Security",
    "explanation": "ACLs define rules to allow or deny network traffic based on criteria like IP address or port number."
  },
  {
    "term": "AES",
    "meaning": "Advanced Encryption Standard",
    "category": "Cryptography",
    "explanation": "AES is a symmetric encryption algorithm used worldwide to securely encrypt data."
  },
  {
    "term": "APT",
    "meaning": "Advanced Persistent Threat",
    "category": "Threats & Vulnerabilities",
    "explanation": "An APT is a prolonged and targeted cyberattack typically conducted by a group with significant resources."
  },
  {
    "term": "CIA",
    "meaning": "Confidentiality, Integrity, Availability",
    "category": "Security Concepts",
    "explanation": "CIA is the core model for information security: protect data secrecy, accuracy, and availability."
  },
  {
    "term": "DDoS",
    "meaning": "Distributed Denial of Service",
    "category": "Threats & Vulnerabilities",
    "explanation": "DDoS attacks overwhelm a service with traffic from multiple sources, making it unavailable."
  },
  {
    "term": "DLP",
    "meaning": "Data Loss Prevention",
    "category": "Data Protection",
    "explanation": "DLP systems detect and prevent unauthorized data transfers to protect sensitive information."
  },
  {
    "term": "DNS",
    "meaning": "Domain Name System",
    "category": "Network Security",
    "explanation": "DNS translates domain names into IP addresses to locate services on the internet."
  },
  {
    "term": "DMZ",
    "meaning": "Demilitarized Zone",
    "category": "Network Security",
    "explanation": "A DMZ is a network area that adds a buffer between the public internet and internal network."
  },
  {
    "term": "EFS",
    "meaning": "Encrypting File System",
    "category": "Data Protection",
    "explanation": "EFS is a Windows feature that encrypts files to protect them from unauthorized access."
  },
  {
    "term": "FDE",
    "meaning": "Full Disk Encryption",
    "category": "Data Protection",
    "explanation": "FDE encrypts all data on a hard drive to protect it if the device is lost or stolen."
  },
  {
    "term": "FTP",
    "meaning": "File Transfer Protocol",
    "category": "Network Security",
    "explanation": "FTP is a standard network protocol used to transfer files between systems."
  },
  {
    "term": "GPO",
    "meaning": "Group Policy Object",
    "category": "Access Control",
    "explanation": "GPOs are settings in Windows used to control user and computer configurations in a domain."
  },
  {
    "term": "HIDS",
    "meaning": "Host-based Intrusion Detection System",
    "category": "Monitoring",
    "explanation": "HIDS monitors a host for suspicious activity or policy violations."
  },
  {
    "term": "HTTPS",
    "meaning": "Hypertext Transfer Protocol Secure",
    "category": "Network Security",
    "explanation": "HTTPS encrypts communication between web browsers and websites using TLS."
  },
  {
    "term": "IAM",
    "meaning": "Identity and Access Management",
    "category": "Identity Management",
    "explanation": "IAM is the framework for managing digital identities and access rights."
  },
  {
    "term": "IDS",
    "meaning": "Intrusion Detection System",
    "category": "Monitoring",
    "explanation": "An IDS monitors network traffic for signs of malicious activity."
  },
  {
    "term": "IPS",
    "meaning": "Intrusion Prevention System",
    "category": "Monitoring",
    "explanation": "IPS actively blocks detected threats in addition to monitoring like an IDS."
  },
  {
    "term": "IPSec",
    "meaning": "Internet Protocol Security",
    "category": "Cryptography",
    "explanation": "IPSec secures IP communications by authenticating and encrypting each IP packet."
  },
  {
    "term": "LDAP",
    "meaning": "Lightweight Directory Access Protocol",
    "category": "Identity Management",
    "explanation": "LDAP is used to access and manage directory services like Active Directory."
  },
  {
    "term": "MAC",
    "meaning": "Mandatory Access Control",
    "category": "Access Control",
    "explanation": "MAC is a strict access model where the system enforces rules set by administrators."
  },
  {
    "term": "MD5",
    "meaning": "Message Digest 5",
    "category": "Cryptography",
    "explanation": "MD5 is a hashing algorithm that produces a 128-bit hash value, now considered weak."
  },
  {
    "term": "MITM",
    "meaning": "Man-in-the-Middle",
    "category": "Threats & Vulnerabilities",
    "explanation": "MITM attacks intercept communication between parties to steal or alter data."
  },
  {
    "term": "MFA",
    "meaning": "Multi-Factor Authentication",
    "category": "Identity Management",
    "explanation": "MFA requires users to verify identity using multiple methods (e.g. password + phone)."
  },
  {
    "term": "NAC",
    "meaning": "Network Access Control",
    "category": "Network Security",
    "explanation": "NAC enforces policies to control which devices can connect to a network."
  },
  {
    "term": "NIST",
    "meaning": "National Institute of Standards and Technology",
    "category": "Security Frameworks",
    "explanation": "NIST develops cybersecurity standards and best practices."
  },
  {
    "term": "NTFS",
    "meaning": "New Technology File System",
    "category": "Data Protection",
    "explanation": "NTFS is a file system used by Windows that supports permissions and encryption."
  },
  {
    "term": "OTP",
    "meaning": "One-Time Password",
    "category": "Authentication",
    "explanation": "An OTP is a password valid for only one login session or transaction."
  },
  {
    "term": "PaaS",
    "meaning": "Platform as a Service",
    "category": "Cloud Security",
    "explanation": "PaaS provides a platform allowing customers to develop and manage applications."
  },
  {
    "term": "PBKDF2",
    "meaning": "Password-Based Key Derivation Function 2",
    "category": "Cryptography",
    "explanation": "PBKDF2 strengthens passwords by hashing them with added complexity and salting."
  },
  {
    "term": "PKI",
    "meaning": "Public Key Infrastructure",
    "category": "Cryptography",
    "explanation": "PKI manages digital certificates and public-key encryption."
  },
  {
    "term": "RADIUS",
    "meaning": "Remote Authentication Dial-In User Service",
    "category": "Identity Management",
    "explanation": "RADIUS provides centralized authentication for users connecting to a network."
  },
  {
    "term": "RAID",
    "meaning": "Redundant Array of Independent Disks",
    "category": "Data Protection",
    "explanation": "RAID uses multiple hard drives for redundancy or performance."
  },
  {
    "term": "RBAC",
    "meaning": "Role-Based Access Control",
    "category": "Access Control",
    "explanation": "RBAC assigns access based on a user\u2019s role in the organization."
  },
  {
    "term": "RDP",
    "meaning": "Remote Desktop Protocol",
    "category": "Remote Access",
    "explanation": "RDP allows users to connect to and control another computer remotely."
  },
  {
    "term": "RSA",
    "meaning": "Rivest Shamir Adleman",
    "category": "Cryptography",
    "explanation": "RSA is a widely used public key encryption algorithm."
  },
  {
    "term": "SaaS",
    "meaning": "Software as a Service",
    "category": "Cloud Security",
    "explanation": "SaaS delivers software applications over the internet on-demand."
  },
  {
    "term": "SAML",
    "meaning": "Security Assertion Markup Language",
    "category": "Authentication",
    "explanation": "SAML is used for exchanging authentication data between parties, especially for SSO."
  },
  {
    "term": "SHA",
    "meaning": "Secure Hash Algorithm",
    "category": "Cryptography",
    "explanation": "SHA is a family of cryptographic hash functions used for data integrity."
  },
  {
    "term": "SIEM",
    "meaning": "Security Information and Event Management",
    "category": "Monitoring",
    "explanation": "SIEM collects, analyzes, and correlates logs to detect threats."
  },
  {
    "term": "SNMP",
    "meaning": "Simple Network Management Protocol",
    "category": "Network Management",
    "explanation": "SNMP is used to monitor and manage network devices."
  },
  {
    "term": "SOC",
    "meaning": "Security Operations Center",
    "category": "Monitoring",
    "explanation": "A SOC is a team that monitors, detects, and responds to security incidents."
  },
  {
    "term": "SSH",
    "meaning": "Secure Shell",
    "category": "Network Security",
    "explanation": "SSH is a protocol for secure remote login and command execution."
  },
  {
    "term": "SSL",
    "meaning": "Secure Sockets Layer",
    "category": "Network Security",
    "explanation": "SSL was used to encrypt web traffic before being replaced by TLS."
  },
  {
    "term": "TOTP",
    "meaning": "Time-based One-Time Password",
    "category": "Authentication",
    "explanation": "TOTP generates temporary passcodes that expire after a short time."
  },
  {
    "term": "UDP",
    "meaning": "User Datagram Protocol",
    "category": "Network Security",
    "explanation": "UDP is a fast, connectionless transport layer protocol."
  },
  {
    "term": "URL",
    "meaning": "Uniform Resource Locator",
    "category": "Web Security",
    "explanation": "A URL is the address used to access resources on the internet."
  },
  {
    "term": "USB",
    "meaning": "Universal Serial Bus",
    "category": "Physical Security",
    "explanation": "USB is a standard for connecting peripheral devices."
  },
  {
    "term": "UTM",
    "meaning": "Unified Threat Management",
    "category": "Security Devices",
    "explanation": "UTM devices combine multiple security functions into a single appliance."
  },
  {
    "term": "VLAN",
    "meaning": "Virtual Local Area Network",
    "category": "Network Security",
    "explanation": "VLANs separate networks logically without needing separate physical hardware."
  },
  {
    "term": "VPN",
    "meaning": "Virtual Private Network",
    "category": "Network Security",
    "explanation": "VPNs encrypt traffic between a device and the internet for secure remote access."
  },
  {
    "term": "WAF",
    "meaning": "Web Application Firewall",
    "category": "Web Security",
    "explanation": "WAFs protect web apps from threats like SQL injection and cross-site scripting."
  },
  {
    "term": "WPA2",
    "meaning": "Wi-Fi Protected Access 2",
    "category": "Network Security",
    "explanation": "WPA2 is a secure wireless encryption protocol using AES."
  }
];
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomSubset(arr, count) {
  return shuffle([...arr]).slice(0, Math.min(count, arr.length));
}

let filteredAcronyms = getRandomSubset(acronyms, 50);
let currentIndex = 0;

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
    btn.onclick = () => checkAnswer(choice, question.meaning, question.explanation);
    choicesDiv.appendChild(btn);
  });
}

function generateChoices(correctAnswer) {
  const options = [correctAnswer];
  while (options.length < 4) {
    const random = acronyms[Math.floor(Math.random() * acronyms.length)].meaning;
    if (!options.includes(random)) options.push(random);
  }
  return shuffle(options);
}

function checkAnswer(selected, correct, explanation) {
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    feedback.innerHTML = `<span style="color: green;">✅ Correct!</span><br>${explanation}`;
  } else {
    feedback.innerHTML = `<span style="color: red;">❌ Wrong! The correct answer is: ${correct}</span><br>${explanation}`;
  }
}

function nextQuestion() {
  currentIndex = (currentIndex + 1) % filteredAcronyms.length;
  showQuestion();
}

function filterByCategory() {
  const selected = document.getElementById("categorySelect").value;
  if (selected === "all") {
    filteredAcronyms = getRandomSubset(acronyms, 50);
  } else {
    const matching = acronyms.filter(a => a.category === selected);
    filteredAcronyms = getRandomSubset(matching, 50);
  }
  currentIndex = 0;
  showQuestion();
}

function populateCategoryDropdown() {
  const categories = [...new Set(acronyms.map(a => a.category))];
  const dropdown = document.getElementById("categorySelect");
  categories.forEach(cat => {
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
