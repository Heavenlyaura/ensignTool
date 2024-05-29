export function calculateCompletedCredits(initialCredit = 0) {
  let totalCredits = 0; // Initialize with the provided credit
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');

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
    const creditValue = parseInt(creditCell.textContent);
    if (!isNaN(creditValue)) { // Ensure the value is a valid number
      totalCredits += creditValue;
    }
  });
  return totalCredits;
}

export function updateCompletedCredits(initialCredit = 0) {
  const oldCatalog = 120
  const newCatalog = 90
  let totalCredits = calculateCompletedCredits(initialCredit);
  const creditsDisplay = document.getElementById('total-credits');
  const leftOnOld = document.getElementById('old-catalog');
  const leftOnNew = document.getElementById('new-catalog');
  const creditSaved = document.getElementById('saved');
  const pathway = document.querySelector('#pathway')
  
  let choice = pathway.value
  if (choice === 'Yes') {
    totalCredits += 7
  } 
  const remainingCreditsNew = newCatalog - totalCredits;
  const remainingCreditsOld = oldCatalog - totalCredits
  

  creditsDisplay.textContent = `Total Completed Credits: ${totalCredits}`;
  leftOnOld.textContent = `Credits Left On Old Catalog: ${remainingCreditsOld}`;
  leftOnNew.textContent = `Credits Left On New Catalog: ${remainingCreditsNew}`;
  creditSaved.textContent = `Credits Saved: ${newCatalog - totalCredits}`;
}
