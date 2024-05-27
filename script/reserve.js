document.addEventListener('DOMContentLoaded', async () => {
  const degreeChoice = document.querySelectorAll('.degree');
  const container = document.getElementById('commOldContainer');
  const next = document.querySelector('#next');
  let totalCompletedCredits = 0;
  let completedCourses = {};
  let addedCourses = [];


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

  async function getReligion() {
    let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/religion.json";
    return await fetchData(api);
  }

  async function getGE() {
    let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/generalEducation.json";
    return await fetchData(api);
  }

  function displayCommOld(dataOld, useCompletedCourses = false) {
    totalCompletedCredits = 0; // Reset totalCompletedCredits
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

        completedCourses[courseCode] = selectedValue;

        if (selectedValue === 'yes') {
          totalCompletedCredits += credits;
        } else if (selectedValue === 'no') {
          totalCompletedCredits -= credits;
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
    container.appendChild(inputContainer);

    addButton.addEventListener('click', () => {
      const courseCode = courseCodeInput.value.trim();
      const credits = parseInt(creditsInput.value.trim());
      if (courseCode && credits && !isNaN(credits)) {
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

  degreeChoice.forEach(degree => {
    degree.addEventListener('click', async () => {
      let degreeName = degree.value;
      console.log(degreeName);
      if (degreeName === 'Communication') {
        const commOldCatalog = await getCommOld();
        displayCommOld(commOldCatalog);

        next.addEventListener('click', async () => {
          const commNewCatalog = await getCommNew();
          console.log(commNewCatalog);
          displayCommOld(commNewCatalog, true);
          disableDropdowns();
        });
      }
    });
  });

  function disableDropdowns() {
    const dropdowns = document.querySelectorAll('.completed-dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.disabled = true;
    });
  }
});
