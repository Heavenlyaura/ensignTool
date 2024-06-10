export function calculateCompletedCredits(upperDivParam) {
  let totalCredits = 0; // Initialize with the provided credit
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');
  let upperDivCredit = 0;
  const addedCoursesTable = document.getElementById('added-courses-table');
  const addedCreditCells = addedCoursesTable.querySelectorAll('.credit-cell');

  selectElements.forEach(select => {
    if (select.value === 'Yes') {
      const creditCell = select.closest('tr').querySelector('.credit-cell');
      if (creditCell && !isNaN(parseInt(creditCell.textContent))) {
        totalCredits += parseInt(creditCell.textContent);
        const courseCode = select.closest('tr').querySelector('td');
        let upperDivision = courseCode.getAttribute('data-upperDiv')
        if (upperDivision == 'Yes') {
          upperDivCredit += parseInt(creditCell.textContent)
        }
      }
    }
  });

  addedCreditCells.forEach(creditCell => {
    const creditValue = parseInt(creditCell.textContent);
    if (!isNaN(creditValue)) { // Ensure the value is a valid number
      totalCredits += creditValue;
      const courseCode = creditCell.closest('tr').querySelector('td');
      let upperDivision = courseCode.getAttribute('data-upperDiv')
      if (upperDivision == 'Yes') {
        upperDivCredit += parseInt(creditCell.textContent)
      }
    }
  });
  return { totalCredits, upperDivCredit };
}
function getSelectedValue() {
  const selectedRadioButton = document.querySelector('input[name="old-pathway"]:checked');
  const selectedValue = selectedRadioButton ? selectedRadioButton.value : 'None';
  // alert("Selected Topic: " + selectedValue);
  return selectedValue
}

export function updateCompletedCredits(upperDivParam) {

  const oldCatalog = 120
  const newCatalog = 90
  let { totalCredits, upperDivCredit } = calculateCompletedCredits(upperDivParam);
  const creditsDisplay = document.getElementById('total-credits');
  const upperDiv = document.getElementById('upperDivCredit');
  const leftOnOld = document.getElementById('old-catalog');
  const leftOnNew = document.getElementById('new-catalog');
  const creditSaved = document.getElementById('saved');
  const pathway = document.querySelector('#pathway')
  let selectedValue = getSelectedValue()

  let choice = pathway.value
  if (choice === 'Yes' && selectedValue === "No") {
    totalCredits += 7
  }
  else if (choice === "Yes" && selectedValue === "Yes") {
    totalCredits += 15
  }
  const remainingCreditsNew = newCatalog - totalCredits;
  const remainingCreditsOld = oldCatalog - totalCredits
  localStorage.setItem('totalCredit', totalCredits);
  localStorage.setItem('upperDivCredit', upperDivCredit);

  upperDiv.textContent = `Upper Division Credits: ${upperDivCredit}/30`
  creditsDisplay.textContent = `Total Completed Credits: ${totalCredits}`;
  leftOnOld.textContent = `Credits Left On Old Catalog: ${remainingCreditsOld}`;
  leftOnNew.textContent = `Credits Left On New Catalog: ${remainingCreditsNew}`;
  creditSaved.textContent = `Credits Saved: ${newCatalog - totalCredits}`;
}
export function storeNotCompletedCourses() {
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');
  const notCompletedCourses = [];
  if (tableContainer) {
    const tables = document.querySelectorAll('table')
    tables.forEach((table) => {
      const caption = table.querySelector('caption').textContent
      const rows = table.querySelectorAll('tr')
      rows.forEach((row, index) => {
        // Skip the header
        if (index > 0) {
          const cells = row.querySelectorAll('td')
          const completeCells = row.querySelectorAll('.addComplete');

          if (cells.length > 0) {
            const completedCell = cells[cells.length - 1]
            const select = completedCell.querySelector('select')
            const courseData = {}
            if (select && select.value !== 'Yes') {
              const courseCode = cells[0].textContent
              const upperDiv = cells[0].getAttribute('data-upperDiv')
              const courseTitle = cells[1].textContent
              const creditCell = cells[3].textContent
              courseData.caption = caption
              courseData.courseCode = courseCode
              courseData.courseTitle = courseTitle
              courseData.creditCell = creditCell
              courseData.upperDiv = upperDiv
              notCompletedCourses.push(courseData)
            }
          }
        }
      });
    })
  }
  localStorage.setItem('notCompleted', JSON.stringify(notCompletedCourses));
}

