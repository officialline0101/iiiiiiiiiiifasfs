const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiaNcGdNdvvRTHTh593wdzKoEPoZCcgiGLpzm9EeHCrCO2obZCU5L3OpuIeEq4Vyk7/exec'; // ここにデプロイしたURLを記入

async function updateAvailability(year, month) {
  console.log(`Updating availability for ${year}-${month + 1}`);
  const response = await fetch(`${APPS_SCRIPT_URL}?year=${year}&month=${month}`);
  console.log(`API response status: ${response.status}`);
  const availability = await response.json();
  console.log('Availability:', availability);
  
  document.querySelectorAll('.flatpickr-day').forEach(function(dayElem) {
    const date = dayElem.dateObj;
    const dateString = date.toISOString().split('T')[0];
    if (availability[dateString]) {
      const badge = document.createElement('div');
      badge.className = 'availability-badge';
      badge.textContent = availability[dateString];
      dayElem.appendChild(badge);
    }
  });
}

flatpickr("#first-choice-date", {
  onMonthChange: function(selectedDates, dateStr, instance) {
    const year = instance.currentYear;
    const month = instance.currentMonth;
    updateAvailability(year, month);
  },
  onYearChange: function(selectedDates, dateStr, instance) {
    const year = instance.currentYear;
    const month = instance.currentMonth;
    updateAvailability(year, month);
  },
  onReady: function(selectedDates, dateStr, instance) {
    const year = instance.currentYear;
    const month = instance.currentMonth;
    updateAvailability(year, month);
  }
});
