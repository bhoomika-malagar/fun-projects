
function initCalendar() {
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  if (!monthSelect || !yearSelect) return;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthSelect.innerHTML = "";
  yearSelect.innerHTML = "";

  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }

  monthSelect.value = new Date().getMonth();
  yearSelect.value = currentYear;

  monthSelect.addEventListener("change", generateCalendar);
  yearSelect.addEventListener("change", generateCalendar);

  generateCalendar();
}

function generateCalendar() {
  const grid = document.querySelector(".calendar-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const month = parseInt(document.getElementById("monthSelect").value);
  const year = parseInt(document.getElementById("yearSelect").value);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    grid.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const btn = document.createElement("button");
    btn.classList.add("date-btn");
    btn.textContent = day;

    if (isCurrentMonth && day === today.getDate()) {
      btn.style.border = "2px solid #ff69b4";
    }

    btn.addEventListener("click", () => {
      localStorage.setItem("selectedDate", `${day}-${month}-${year}`);
      window.location.href = "habits.html";
    });

    grid.appendChild(btn);
  }
}


function loadHabits() {
  const date = localStorage.getItem("selectedDate");

  if (!date) {
    const title = document.getElementById("selected-date");
    if (title) title.textContent = "No date selected!";
    return;
  }

  document.getElementById("selected-date").textContent =
    "Habits for " + date;

  let habits = JSON.parse(localStorage.getItem("habits"));

  if (!habits) {
    habits = ["Drink Water", "Workout", "Study"];
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach(habit => {
    const key = date + "-" + habit;

    const label = document.createElement("label");

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "8px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = localStorage.getItem(key) === "true";

    checkbox.addEventListener("change", () => {
      localStorage.setItem(key, checkbox.checked);
    });

    const span = document.createElement("span");
    span.textContent = habit;

    span.addEventListener("dblclick", () => {
      editHabit(habit);
    });

    left.appendChild(checkbox);
    left.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => deleteHabit(habit);

    label.appendChild(left);
    label.appendChild(deleteBtn);

    list.appendChild(label);
  });
}

function addHabit() {
  const input = document.getElementById("newHabit");
  if (!input) return;

  const value = input.value.trim();
  if (!value) return;

  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  if (!habits.includes(value)) {
    habits.push(value);
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  input.value = "";
  loadHabits();
}

function deleteHabit(habitName) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  habits = habits.filter(h => h !== habitName);
  localStorage.setItem("habits", JSON.stringify(habits));

  loadHabits();
}

function editHabit(oldName) {
  const newName = prompt("Edit habit:", oldName);
  if (!newName || newName.trim() === "") return;

  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  habits = habits.map(h => h === oldName ? newName : h);
  localStorage.setItem("habits", JSON.stringify(habits));

  loadHabits();
}

function goBack() {
  window.location.href = "index.html";
}