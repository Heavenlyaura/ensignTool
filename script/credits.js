export function calculateCompletedCredits(initialCredit = 0) {
  let totalCredits = 0; // Initialize with the provided credit
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');
  console.log('first credit', totalCredits)

  selectElements.forEach(select => {
    if (select.value === 'Yes') {
      const creditCell = select.closest('tr').querySelector('.credit-cell');
      if (creditCell && !isNaN(parseInt(creditCell.textContent))) { // Check if creditCell exists and is a valid number
        totalCredits += parseInt(creditCell.textContent);
      }
    }
  });

  const addedCoursesTable = document.getElementById('added-courses-table');
  const addedCreditCells = addedCoursesTable.querySelectorAll('.credit-cell');
  let loop = 0
  addedCreditCells.forEach(creditCell => {
    console.log("loop:",loop +=1)
    console.log(creditCell.textContent)
    const creditValue = parseInt(creditCell.textContent);
    console.log(creditValue)
    if (!isNaN(creditValue)) { // Ensure the value is a valid number
      console.log(creditValue)
      totalCredits += creditValue;
      console.log(totalCredits)
    }
  });
  return totalCredits;
}

export function updateCompletedCredits(initialCredit = 0) {
  const totalCredits = calculateCompletedCredits(initialCredit);
  const creditsDisplay = document.getElementById('total-credits');
  creditsDisplay.textContent = `Total Completed Credits: ${totalCredits}`;
}
