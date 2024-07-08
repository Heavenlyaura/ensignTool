import { getCommNew, getCommOld, getItNew, getItOld } from "./fetchData.js";
import { createTableFromJson, addCourseToTable } from "./createTable.js";
import { saveSelectedValues, restoreSelectedValues, saveAddCourseTable } from "./saveRestore.js";
import { storeNotCompletedCourses } from "./credits.js";

document.addEventListener('DOMContentLoaded', () => {

  // window.addEventListener('beforeunload', function (e) {
  //   var confirmationMessage = 'Are you sure you want to leave? You will lose your progress.';
  //   e.returnValue = confirmationMessage;
  //   return confirmationMessage;
  // });
  localStorage.clear()
  const degreeChoice = document.querySelectorAll('.degreeChoice');
  const addCourseSetion = document.querySelector('.addCourseSetion');
  const addedCoursesTable = document.querySelector('.add-course-table');
  const chooseCatalog = document.querySelector('.chooseCatalog');
  const catalogYear = document.querySelectorAll('.catalogYear'); // Assuming this is a NodeList
  const completeReview = document.querySelector('.completeReview');

  completeReview.addEventListener('click', () => {
    storeNotCompletedCourses()
    saveAddCourseTable()
  })

  addCourseSetion.style.display = 'none';
  addedCoursesTable.style.display = 'none';
  chooseCatalog.style.display = 'none';
  completeReview.style.display = 'none';

  const loadCourses = async (getOld, getNew) => {
    catalogYear.forEach(year => {
      year.addEventListener('click', async () => {
        let data;
        if (year.value === '2022' || year.value === '2023') {
          data = await getOld();
          localStorage.setItem('catalog', 2022)
        } else {
          data = await getNew();
          localStorage.setItem('catalog', 2024)
        }
        createTableFromJson(data);
        addCourseSetion.style.display = 'block';
        addedCoursesTable.style.display = 'block';
        completeReview.style.display = 'block';
      });
    });
  };

  degreeChoice.forEach(degree => {
    degree.addEventListener('click', () => {
      chooseCatalog.style.display = 'block';
      if (degree.value === 'Communication') {
        loadCourses(getCommOld, getCommNew);
        localStorage.setItem('degree', 'communication')
      } else {
        loadCourses(getItOld, getItNew);
        localStorage.setItem('degree', 'information technology')
      }
    });
  });

  document.getElementById('add-course-button').addEventListener('click', () => {
    const courseCodeInput = document.getElementById('course-code-input');
    const creditsInput = document.getElementById('credits-input');
    const addUpperDiv = document.getElementById('UpperDivisionCheck');
    const courseCode = courseCodeInput.value.trim().toUpperCase();
    const credits = parseInt(creditsInput.value.trim());

    if (courseCode !== '' && !isNaN(credits)) {
      const substitutionDropdown = document.getElementById('substitution-dropdown');
      const substitutedValue = substitutionDropdown.value
      let checked = false
      if (addUpperDiv.checked) {
        checked = true
      }
      if (substitutedValue) {
        substituteCourse(courseCode, credits, substitutedValue, checked);
      } else {
        addCourseToTable(courseCode, credits, checked);
      }

      // Reset input fields
      courseCodeInput.value = '';
      creditsInput.value = '';
      addUpperDiv.checked = false
    } else {
      alert("Please fill out all fields correctly.");
    }
  });
});
