document.addEventListener("DOMContentLoaded", function () {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    let currentMonthIndex = 0;
    const currentMonthElement = document.getElementById("currentMonth");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    // Function to update the displayed month
    function updateMonth() {
      currentMonthElement.textContent = months[currentMonthIndex];
    }
  
    // Event listener for the "Next" button
    nextBtn.addEventListener("click", function () {
      currentMonthIndex = (currentMonthIndex + 1) % 12;
      updateMonth();
    });
  
    // Event listener for the "Previous" button
    prevBtn.addEventListener("click", function () {
      currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
      updateMonth();
    });
  
    // Initial display
    updateMonth();
  });
  