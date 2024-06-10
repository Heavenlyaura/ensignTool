export function saveSelectedValues() {
  const selectedValues = {};
  // Function to collect selected values from a table
  function collectSelectedValues(table) {
    const selectElements = table.querySelectorAll('select');
    selectElements.forEach(select => {
      const courseId = select.closest('tr').querySelector('td:first-child').textContent;
      selectedValues[courseId] = select.value;
      const completed = select.closest('tr').querySelector('td:last-child').textContent;
      selectedValues[courseId + '_completed'] = completed;
    });
  }
  // Collect values from the table with ID 'table-container'
  const tableContainer = document.getElementById('table-container');
  if (tableContainer) {
    collectSelectedValues(tableContainer);
  }
  // Collect values from the table with class 'add-course-table'
  const addCourseTable = document.querySelector('.add-course-table');
  if (addCourseTable) {
    collectSelectedValues(addCourseTable);
  }
  return selectedValues;
}


export function restoreSelectedValues(selectedValues) {
  for (const courseId in selectedValues) {
    const tableContainer = document.getElementById('table-container');
    const selectElements = tableContainer.querySelectorAll('select');
    // const select = document.querySelector(`[data-course-id="${courseId}"]`);
    selectElements.forEach(select => {
      const courseId = select.closest('tr').querySelector('td:first-child').textContent;
      if (courseId) {
        select.value = selectedValues[courseId];
        select.disabled = true; // Disable the select element
      }
    });
  }
}

export function saveAddCourseTable() {
  const addCourseTable = document.querySelector('#added-courses-table')
  const courseCodeArr = []
  const rows = addCourseTable.querySelectorAll('tr')
  rows.forEach((row, index) => {
    if (index > 0) {
      let cell = row.querySelector('td:first-child')
      courseCodeArr.push(cell.textContent)
    }
  });
  const stringList = JSON.stringify(courseCodeArr)
  localStorage.setItem('addedCourseList', stringList)
}