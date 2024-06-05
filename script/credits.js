export function calculateCompletedCredits() {
  let totalCredits = 0; // Initialize with the provided credit
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');
  let upperDivCredit = 0
  const addedCoursesTable = document.getElementById('added-courses-table');
  const addedCreditCells = addedCoursesTable.querySelectorAll('.credit-cell');
  // const upperDivCheck = document.querySelector('#UpperDivisionCheck')
  // const addedCreditCell = document.querySelector('#credits-input')

  selectElements.forEach(select => {
    if (select.value === 'Yes') {
      const creditCell = select.closest('tr').querySelector('.credit-cell');
      console.log(creditCell.textContent)
      if (creditCell && !isNaN(parseInt(creditCell.textContent))) { // Check if creditCell exists and is a valid number
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

export function updateCompletedCredits() {
  const oldCatalog = 120
  const newCatalog = 90
  let { totalCredits, upperDivCredit } = calculateCompletedCredits();
  console.log(totalCredits)
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
  console.log(totalCredits)

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
    const tables = tableContainer.querySelectorAll('table')
    tables.forEach((table) => {
      const caption = table.querySelector('caption').textContent
      console.log(caption)
      const rows = table.querySelectorAll('tr')
      rows.forEach((row, index) => {
        // Skip the header
        if (index > 0) {
          const cells = row.querySelectorAll('td')
          if (cells.length > 0) {

            const completedCell = cells[cells.length - 1]

            const select = completedCell.querySelector('select')
            if (select && select.value !== 'Yes') {
              const courseCode = cells[0].textContent
              const courseTitle = cells[1].textContent
              const creditCell = cells[3].textContent
              const courseData = { caption, courseCode, courseTitle, creditCell };
              console.log(courseData)
              notCompletedCourses.push(courseData)
            }
          }
        }
      });
    })
  }

  localStorage.setItem('notCompleted', JSON.stringify(notCompletedCourses));












  // selectElements.forEach(select => {
  //   if (select.value !== 'Yes') {
  //     const creditCell = select.closest('tr').querySelector('.credit-cell').textContent;
  //     const courseCode = select.closest('tr').querySelector('td:first-child').textContent;
  //     const courseTitle = select.closest('tr').querySelector('td:nth-child(2)').textContent;
  //     const courseData = { courseCode, courseTitle, creditCell };
  //     console.log(courseCode, creditCell, courseTitle)
  //     notCompletedCourses.push(courseData);
  //   }
  // });

  // Store the array of not completed courses in local storage
}
