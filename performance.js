const performanceCard = document.querySelector(".performance-card");

if (performanceCard) {
  const dateValue = performanceCard.dataset.showDate;
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue || "");
  const countdown = performanceCard.querySelector("[data-countdown]");
  const countdownValue = performanceCard.querySelector("[data-countdown-value]");
  const countdownUnit = performanceCard.querySelector("[data-countdown-unit]");
  const dateMonth = performanceCard.querySelector("[data-date-month]");
  const dateDay = performanceCard.querySelector("[data-date-day]");
  const dateWeekday = performanceCard.querySelector("[data-date-weekday]");
  const dateFull = performanceCard.querySelector("[data-date-full]");
  const showTime = performanceCard.querySelector("[data-show-time]");

  if (!dateMatch || !countdown || !countdownValue || !countdownUnit ||
      !dateMonth || !dateDay || !dateWeekday || !dateFull || !showTime) {
    throw new Error("演出日期區塊缺少必要資料或元素。");
  }

  const [, yearText, monthText, dayText] = dateMatch;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const eventDate = new Date(year, month - 1, day);

  if (eventDate.getFullYear() !== year ||
      eventDate.getMonth() !== month - 1 ||
      eventDate.getDate() !== day) {
    throw new Error("演出日期格式無效，請使用 YYYY-MM-DD。");
  }

  dateMonth.textContent = `${monthText} / ${year}`;
  dateDay.textContent = dayText;
  dateDay.dateTime = dateValue;
  dateWeekday.textContent = new Intl.DateTimeFormat("zh-TW", {
    weekday: "long",
  }).format(eventDate);
  dateFull.dateTime = dateValue;
  dateFull.textContent = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(eventDate);
  showTime.textContent = performanceCard.dataset.showTime || "時間待公布";

  function updateCountdown() {
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const eventDay = Date.UTC(year, month - 1, day);
    const daysLeft = Math.round((eventDay - today) / 86400000);

    countdown.classList.remove("is-today", "is-past");

    if (daysLeft > 0) {
      countdownValue.textContent = String(daysLeft);
      countdownUnit.textContent = "天";
    } else if (daysLeft === 0) {
      countdown.classList.add("is-today");
      countdownValue.textContent = "今天演出！";
      countdownUnit.textContent = "";
    } else {
      countdown.classList.add("is-past");
      countdownValue.textContent = "演出已結束";
      countdownUnit.textContent = "";
    }
  }

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
}
