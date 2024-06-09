// CreateTable.js

import { updateCompletedCredits, calculateCompletedCredits } from './credits.js';

export function createTableFromJson(data) {
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = ''; // Clear any existing content
  for (const category in data) {
    // Create table
    const table = document.createElement('table');

    // Create and append category header
    const categoryHeader = document.createElement('caption');
    categoryHeader.textContent = category;

    table.appendChild(categoryHeader)

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Course Code', 'Course Title', 'Equivalent Courses', 'Credits', 'Completed'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    for (const course in data[category]) {
      const courseData = data[category][course];
      const row = document.createElement('tr');

      const courseCodeCell = document.createElement('td');
      courseCodeCell.textContent = courseData.courseCode;
      courseCodeCell.setAttribute('data-upperdiv', courseData.upperDivision);
      row.appendChild(courseCodeCell);

      const courseTitleCell = document.createElement('td');
      courseTitleCell.textContent = courseData.courseTitle;


      row.appendChild(courseTitleCell);

      const equivalentCell = document.createElement('td');
      equivalentCell.textContent = Object.values(courseData.equivalent).join(', ');
      row.appendChild(equivalentCell);

      const creditCell = document.createElement('td');
      creditCell.className = 'credit-cell'
      creditCell.textContent = courseData.credit; // Display credits from JSON data
      row.appendChild(creditCell);

      // Create Completed dropdown cell
      const completedCell = document.createElement('td');
      const select = document.createElement('select');
      const optionYes = document.createElement('option');
      optionYes.value = 'Yes';
      optionYes.textContent = 'Yes';
      const optionNo = document.createElement('option');
      optionNo.value = 'No';
      optionNo.textContent = 'No';
      select.appendChild(optionYes);
      select.appendChild(optionNo);
      select.value = 'No';
      select.addEventListener('change', () => updateCompletedCredits());
      completedCell.appendChild(select);
      row.appendChild(completedCell);

      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    tableContainer.appendChild(table);
  }

  populateSubstitutionDropdown(); // Populate substitution dropdown after creating tables
}

export function addCourseToTable(courseCode, credits) {
  const table = document.getElementById('added-courses-table');
  const row = table.insertRow();

  // Insert cells to match the columns of the initial table
  row.insertCell(0).textContent = courseCode;
  row.insertCell(1).textContent = ''; // No course title for added courses
  row.insertCell(2).textContent = ''; // No equivalent courses for added courses
  const creditCell = row.insertCell(3); // Insert a reference to the cell containing credits
  creditCell.textContent = credits;
  creditCell.classList.add('credit-cell'); // Add the class 'credit-cell' to the cell containing credits
  row.insertCell(4).textContent = 'Yes'; // Automatically mark as completed

  // Automatically update total credits when a course is added
  updateCompletedCredits();

  // Update the substitution dropdown
  populateSubstitutionDropdown();
}

function populateSubstitutionDropdown() {
  const dropdown = document.getElementById('substitution-dropdown');
  dropdown.innerHTML = '<option value="">Select a course to substitute</option>'; // Clear existing options

  const tableContainer = document.getElementById('table-container');
  const courses = tableContainer.querySelectorAll('td:first-child');
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.textContent;
    option.textContent = course.textContent;
    dropdown.appendChild(option);
  });

  const addedCoursesTable = document.getElementById('added-courses-table');
  const addedCourses = addedCoursesTable.querySelectorAll('td:first-child');
  addedCourses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.textContent;
    option.textContent = course.textContent;
    dropdown.appendChild(option);
  });
}

export function substituteCourse(newCourseCode, newCredits, substituteCourseCode) {
  // Find and remove the substituted course from the table
  const tables = [document.getElementById('table-container'), document.getElementById('added-courses-table')];
  let oldCredits = 0;

  tables.forEach(table => {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const courseCodeCell = row.querySelector('td:first-child');
      if (courseCodeCell && courseCodeCell.textContent === substituteCourseCode) {
        const creditCell = row.querySelector('.credit-cell');
        oldCredits = parseInt(creditCell.textContent);
        row.remove();
      }
    });
  });

  // Add the new course to the table
  addCourseToTable(newCourseCode, newCredits);

  // Update the total credits
  updateCompletedCredits();
}
