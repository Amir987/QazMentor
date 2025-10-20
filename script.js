// =========================
// ENT Mentor - MAIN SCRIPT
// =========================

// ---------- REGISTRATION ----------
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullname = document.getElementById("fullname").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirm = document.getElementById("confirm").value.trim();

      if (!fullname || !email || !password || !confirm) {
        showError("Барлық өрістерді толтырыңыз!");
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        showError("Дұрыс email енгізіңіз!");
        return;
      }

      if (password.length < 6) {
        showError("Құпия сөз ең кемі 6 таңбадан тұруы керек!");
        return;
      }

      if (password !== confirm) {
        showError("Құпия сөздер сәйкес келмейді!");
        return;
      }

      const user = { fullname, email, password };
      localStorage.setItem("entUser", JSON.stringify(user));

      const btn = document.querySelector(".btn");
      btn.textContent = "Тіркелуде...";
      btn.disabled = true;
      btn.style.opacity = "0.7";

      setTimeout(() => {
        alert("Тіркелу сәтті өтті ✅");
        window.location.href = "goal.html";
      }, 1000);
    });
  }
});

// ---------- SHOW ERROR ----------
function showError(message) {
  let existing = document.querySelector(".error-msg");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.className = "error-msg";
  div.style.background = "rgba(255,0,0,0.1)";
  div.style.border = "1px solid rgba(255,0,0,0.4)";
  div.style.padding = "10px 15px";
  div.style.borderRadius = "8px";
  div.style.marginBottom = "15px";
  div.style.textAlign = "center";
  div.style.color = "#ff4d4d";
  div.textContent = message;

  const form = document.getElementById("registerForm");
  form.insertBefore(div, form.firstChild);

  setTimeout(() => {
    if (div) div.remove();
  }, 3000);
}

// ---------- GOAL PAGE ----------
document.addEventListener("DOMContentLoaded", () => {
  const goalRange = document.getElementById("goalRange");
  const goalValue = document.getElementById("goalValue");
  const emoji = document.getElementById("emoji");
  const saveGoal = document.getElementById("saveGoal");

  if (!goalRange || !goalValue || !emoji || !saveGoal) return;

  // Обновление смайлика и значения
  goalRange.addEventListener("input", () => {
    const val = parseInt(goalRange.value);
    goalValue.textContent = val;

    if (val < 60) emoji.textContent = "😐";
    else if (val < 90) emoji.textContent = "🙂";
    else if (val < 120) emoji.textContent = "😎";
    else emoji.textContent = "🔥";
  });

  // Сохранение цели и переход на главную
  saveGoal.addEventListener("click", () => {
    const val = goalRange.value;
    localStorage.setItem("entGoal", val);

    saveGoal.textContent = "Жүктелуде...";
    saveGoal.disabled = true;
    saveGoal.style.opacity = "0.8";

    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  });
});

// ---------- HOME PAGE ----------
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("entUser"));
  const goal = localStorage.getItem("entGoal");

  const userName = document.getElementById("userName");
  const userGoal = document.getElementById("userGoal");

  if (userName && user) userName.textContent = user.fullname;
  if (userGoal && goal) userGoal.textContent = goal;

  const tabs = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".tab-content");

  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        sections.forEach((s) => s.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });
  }
});

// ---------- LANGUAGE SWITCH ----------
const translations = {
  kk: {
    register_title: "Тіркелу беті",
    fullname: "Аты-жөніңді енгіз",
    email: "Электрондық пошта",
    password: "Құпия сөз",
    confirm: "Құпия сөзді раста",
    register_btn: "Тіркелу",
    has_account: "Аккаунтың бар ма?",
    login: "Кіру",
    policy: "Тіркелу арқылы сіз біздің <a href='#'>құпиялық саясатына</a> келісесіз.",
    goal_title: "Мақсатыңды таңда 🎯",
    goal_text: "ЕНТ бойынша өзіңнің мақсатты баллыңды көрсет. Бұл сені алға жетелейді!",
    next_btn: "Келесі қадам",
    goal_info: "Жүйе таңдаған мақсатыңа сай жеке дайындық жоспарын ұсынады. Арманға жол – дәл қазір басталады!"
  },
  ru: {
    register_title: "Регистрация",
    fullname: "ФИО",
    email: "Электронная почта",
    password: "Пароль",
    confirm: "Подтвердите пароль",
    register_btn: "Зарегистрироваться",
    has_account: "Уже есть аккаунт?",
    login: "Войти",
    policy: "Регистрируясь, вы соглашаетесь с нашей <a href='#'>политикой конфиденциальности</a>.",
    goal_title: "Выбери свою цель",
    goal_text: "Укажи целевой балл по ЕНТ.",
    next_btn: "Далее",
    goal_info: "Позже система предложит план подготовки под твою цель."
  }
};

function applyLanguage(lang) {
  localStorage.setItem("lang", lang);
  const t = translations[lang];

  // Регистрация
  if (document.getElementById("registerForm")) {
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = t.register_title;
    const labels = {
      fullname: document.querySelector("label[for='fullname']"),
      email: document.querySelector("label[for='email']"),
      password: document.querySelector("label[for='password']"),
      confirm: document.querySelector("label[for='confirm']")
    };
    if (labels.fullname) labels.fullname.textContent = t.fullname;
    if (labels.email) labels.email.textContent = t.email;
    if (labels.password) labels.password.textContent = t.password;
    if (labels.confirm) labels.confirm.textContent = t.confirm;
    const btn = document.querySelector(".btn");
    if (btn) btn.textContent = t.register_btn;
  }

  // Цель
  if (document.getElementById("goalRange")) {
    const h1 = document.querySelector("h1");
    const p = document.querySelector("p");
    const btn = document.getElementById("saveGoal");
    const info = document.querySelector(".info");
    if (h1) h1.textContent = t.goal_title;
    if (p) p.textContent = t.goal_text;
    if (btn) btn.textContent = t.next_btn;
    if (info) info.textContent = t.goal_info;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "kk";
  applyLanguage(savedLang);

  const langButtons = document.querySelectorAll(".lang-switch button");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.textContent.trim() === "Русский" ? "ru" : "kk";
      applyLanguage(lang);
    });
  });
});

// ---------- AI PSYCHOLOGIST CHAT (updated endpoint) ----------
(function() {
  const chatBox = document.querySelector(".chat-box") || document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendMsgBtn") || document.querySelector(".chat-input button");

  if (!chatBox || !chatInput || !sendBtn) return;

  async function sendAiMessage() {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;

    const userBubble = document.createElement("div");
    userBubble.className = "chat-message user";
    userBubble.textContent = userMsg;
    chatBox.appendChild(userBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    chatInput.value = "";

    const aiBubble = document.createElement("div");
    aiBubble.className = "chat-message ai";
    aiBubble.textContent = "Психолог думает...";
    chatBox.appendChild(aiBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const messages = [
        { role: "system", content: "Ты — дружелюбный ИИ-психолог, который помогает школьникам готовиться к ЕНТ. Поддерживай, мотивируй, отвечай коротко, понятно и тепло." },
        { role: "user", content: userMsg }
      ];

      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || data.reply || "Ошибка в ответе 😔";
      aiBubble.textContent = reply;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (err) {
      aiBubble.textContent = "Ошибка соединения с ИИ 😔";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  sendBtn.addEventListener("click", sendAiMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendAiMessage();
  });
})();
