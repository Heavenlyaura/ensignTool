export function saveSelectedValues() {
  const tableContainer = document.getElementById('table-container');
  const selectElements = tableContainer.querySelectorAll('select');
  const selectedValues = {};
  selectElements.forEach(select => {
    const courseId = select.closest('tr').querySelector('td:first-child').textContent;
    selectedValues[courseId] = select.value;
    const completed = select.closest('tr').querySelector('td:last-child').textContent;
    selectedValues
  });
  console.log(selectedValues)
  return selectedValues;
}

export function restoreSelectedValues(selectedValues) {
  for (const courseId in selectedValues) {
    const tableContainer = document.getElementById('table-container');
    const selectElements = tableContainer.querySelectorAll('select');
    // const select = document.querySelector(`[data-course-id="${courseId}"]`);
    let loop  = 0
    selectElements.forEach(select => {
      const courseId = select.closest('tr').querySelector('td:first-child').textContent;
      if (courseId) {
        loop+=1
        console.log('Loop:', loop)
        
        select.value = selectedValues[courseId];
        select.disabled = true; // Disable the select element
      }
    });
    // select.value = selectedValues[courseId];

    // // Find the corresponding table row and update completed status
    // const tableRow = select.closest('tr');
    // const completedCell = tableRow.querySelector('td:last-child');
    // completedCell.textContent = selectedValues[courseId];
  }
}