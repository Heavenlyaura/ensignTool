document.addEventListener('DOMContentLoaded', async () => {
  const degreeChoice = document.querySelectorAll('.degree');
  const container = document.getElementById('commOldContainer');
  const next = document.querySelector('#next');
  let totalCompletedCredits = 0;
  let completedCourses = {};
  let addedCourses = [];
  let substitutedCourses = {};
  const oldCatalogTotalCredits = 120;
  const newCatalogTotalCredits = 90;

  async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }

  async function getCommOld() {
    let api = 'https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/commOldCatalog.json';
    return await fetchData(api);
  }

  async function getCommNew() {
    let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/commNewCatalog.json";
    return await fetchData(api);
  }

  async function getItOld() {
    let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/ITOldCatalog.json";
    return await fetchData(api);
  }

  async function getItNew() {
    let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/iTNewCatalog.json";
    return await fetchData(api);
  }

  function displayCommOld(dataOld, useCompletedCourses = false) {
    container.innerHTML = ''; // Clear the container
    for (let category in dataOld) {
      if (dataOld.hasOwnProperty(category)) {
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = category.toUpperCase();
        container.appendChild(categoryHeading);
        const table = document.createElement('table');
        table.classList.add('course-table');
        const headingsRow = document.createElement('tr');
        headingsRow.innerHTML = `
          <th>COURSE CODE</th>
          <th>COURSE TITLE</th>
          <th>EQUIVALENTS</th>
          <th>CREDITS</th>
          <th>COMPLETED</th>`;
        table.appendChild(headingsRow);
        const courses = dataOld[category];
        for (let courseKey in courses) {
          if (courses.hasOwnProperty(courseKey)) {
            const course = courses[courseKey];
            const courseRow = document.createElement('tr');
            const isCompleted = useCompletedCourses && completedCourses[course.courseCode] === 'yes';
            courseRow.innerHTML = `
              <td>${course.courseCode}</td>
              <td>${course.courseTitle}</td>
              <td>${Object.values(course.equivalent).join(', ')}</td>
              <td>${course.credit}</td>
              <td>
                <select class="completed-dropdown" ${useCompletedCourses ? 'disabled' : ''}>
                  <option value="" ${isCompleted ? '' : 'selected'}></option>
                  <option value="yes" ${isCompleted ? 'selected' : ''}>Yes</option>
                  <option value="no" ${!isCompleted ? 'selected' : ''}>No</option>
                </select>
              </td>
            `;
            table.appendChild(courseRow);
          }
        }
        container.appendChild(table);
      }
    }

    container.addEventListener('change', function (event) {
      if (event.target.classList.contains('completed-dropdown')) {
        const selectedValue = event.target.value;
        const courseRow = event.target.closest('tr');
        const courseCode = courseRow.children[0].textContent;
        const creditCell = event.target.parentNode.previousElementSibling;
        const credits = parseInt(creditCell.textContent);

        if (completedCourses[courseCode] === 'yes') {
          totalCompletedCredits -= credits;
        }

        completedCourses[courseCode] = selectedValue;

        if (selectedValue === 'yes') {
          totalCompletedCredits += credits;
        }

        updateTotalCredits();
      }
    });

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    const courseCodeInput = document.createElement('input');
    courseCodeInput.type = 'text';
    courseCodeInput.placeholder = 'Course Code';
    const creditsInput = document.createElement('input');
    creditsInput.type = 'number';
    creditsInput.placeholder = 'Number of Credits';
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Course';
    inputContainer.appendChild(courseCodeInput);
    inputContainer.appendChild(creditsInput);
    inputContainer.appendChild(addButton);

    // Create dropdown menu with all displayed courses
    function createSubstituteDropdown() {
      const dropdown = document.createElement('select');
      dropdown.id = 'substitute-dropdown';
      dropdown.innerHTML = '<option value="">Select course to substitute</option>';

      // Populate dropdown with course codes from displayed courses
      const courseRows = document.querySelectorAll('.course-table tr:not(.new-course-table) td:first-child');
      courseRows.forEach(courseRow => {
        const courseCode = courseRow.textContent.trim();
        const option = document.createElement('option');
        option.value = courseCode;
        option.textContent = courseCode;
        dropdown.appendChild(option);
      });

      return dropdown;
    }

    const substituteDropdown = createSubstituteDropdown();
    inputContainer.appendChild(substituteDropdown);

    container.appendChild(inputContainer);

    addButton.addEventListener('click', () => {
      const courseCode = courseCodeInput.value.trim();
      const credits = parseInt(creditsInput.value.trim());

      if (courseCode && credits && !isNaN(credits)) {
        const substituteCourseCode = substituteDropdown.value;
        if (substituteCourseCode) {
          // Find the row of the substitute course
          const substituteCourseRow = Array.from(container.querySelectorAll('tr')).find(row =>
            row.querySelector('td:first-child')?.textContent === substituteCourseCode);

          if (substituteCourseRow) {
            // Remove the substitute course and adjust total credits
            const creditCell = substituteCourseRow.querySelector('td:nth-child(4)');
            const creditsToSubtract = parseInt(creditCell.textContent);
            totalCompletedCredits -= creditsToSubtract * 2;
            substituteCourseRow.remove();
            substitutedCourses[substituteCourseCode] = true; // Mark course as substituted
          } else {
            alert('Course to substitute not found!');
          }
        }
        addedCourses.push({ courseCode, credits });
        appendCourse(courseCode, credits);
        courseCodeInput.value = '';
        creditsInput.value = '';
      }
    });

    // Re-display added courses
    if (addedCourses.length > 0) {
      addedCourses.forEach(course => appendCourse(course.courseCode, course.credits));
    }

    updateTotalCredits();
  }

  function appendCourse(courseCode, credits) {
    let newCourseTable = document.querySelector('.new-course-table');
    if (!newCourseTable) {
      newCourseTable = createNewCourseTable();
    }

    const courseRow = document.createElement('tr');
    courseRow.innerHTML = `
      <td>${courseCode}</td>
      <td></td>
      <td></td>
      <td>${credits}</td>
      <td>Yes</td>
    `;
    newCourseTable.appendChild(courseRow);

    totalCompletedCredits += credits;
    updateTotalCredits();
  }

  function createNewCourseTable() {
    const table = document.createElement('table');
    table.classList.add('new-course-table');
    const headingsRow = document.createElement('tr');
    headingsRow.innerHTML = `
      <th>COURSE CODE</th>
      <th>COURSE TITLE</th>
      <th>EQUIVALENTS</th>
      <th>CREDITS</th>
      <th>COMPLETED</th>`;
    table.appendChild(headingsRow);
    container.appendChild(table);
    return table;
  }

  function updateTotalCredits() {
    let totalCreditsDiv = document.querySelector('.total-completed-credits');
    if (!totalCreditsDiv) {
      totalCreditsDiv = document.createElement('div');
      totalCreditsDiv.classList.add('total-completed-credits');
      document.body.appendChild(totalCreditsDiv); // Append to body to ensure it's at the bottom
    }
    totalCreditsDiv.textContent = `Total Completed Credits: ${totalCompletedCredits}`;
  }

  function calculateCredits() {
    const creditsLeftOld = oldCatalogTotalCredits - totalCompletedCredits;
    const creditsLeftNew = newCatalogTotalCredits - totalCompletedCredits;
    const creditsSaved = creditsLeftOld - creditsLeftNew;

    let calculationDiv = document.querySelector('.credit-calculation');
    if (!calculationDiv) {
      calculationDiv = document.createElement('div');
      calculationDiv.classList.add('credit-calculation');
      document.body.appendChild(calculationDiv);
    }

    calculationDiv.innerHTML = `
      <p>Number of Credits Left on Current Catalog: ${creditsLeftOld}</p>
      <p>Number of Credits Left on New Catalog: ${creditsLeftNew}</p>
      <p>Number of Credits Saved: ${creditsSaved}</p>
    `;
  }

  degreeChoice.forEach(degree => {
    degree.addEventListener('click', async () => {
      let degreeName = degree.value;
      console.log(degreeName);
      totalCompletedCredits = 0; // Reset total completed credits
      completedCourses = {}; // Reset completed courses
      addedCourses = []; // Reset added courses
      substitutedCourses = {}; // Reset substituted courses

      if (degreeName === 'Communication') {
        const commOldCatalog = await getCommOld();
        displayCommOld(commOldCatalog);

        next.addEventListener('click', async () => {
          const commNewCatalog = await getCommNew();
          console.log(commNewCatalog);
          displayCommOld(commNewCatalog, true);
          calculateCredits();
        }, { once: true }); // Ensure the event is added only once
      } else if (degreeName === 'Information Technology') {
        const itOldCatalog = await getItOld();
        displayCommOld(itOldCatalog);

        next.addEventListener('click', async () => {
          const itNewCatalog = await getItNew();
          console.log(itNewCatalog);
          displayCommOld(itNewCatalog, true);
          calculateCredits();
        }, { once: true }); // Ensure the event is added only once
      }
    });
  });
})  
