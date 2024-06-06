let total = [];

export function calculateCompletedCredits() {
  let totalCredits = 0;
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');

  selectElements.forEach(select => {
    if (select.value === 'Yes') {
      const creditCell = select.closest('tr').querySelector('td:nth-child(4)');
      totalCredits += parseInt(creditCell.textContent);
    }
  });
  total.push(totalCredits)

  // return totalCredits;
}

export function updateCompletedCredits(credit=0) {
  let totalCredits
  // totalCredits = calculateCompletedCredits(); // Update total credits dynamically
  if (calculateCompletedCredits()) {
    calculateCompletedCredits()
  } else {
    total.push(parseInt(credit));
  }
  const creditsDisplay = document.getElementById('total-credits');
  creditsDisplay.textContent = `Total Completed Credits: ${total.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }`;
}
