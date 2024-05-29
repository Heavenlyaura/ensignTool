import { getCommNew, getCommOld, getItNew, getItOld } from "./fetchData.js";
import { createTableFromJson, addCourseToTable, substituteCourse } from "./createTable.js"
import { updateCompletedCredits } from "./credits.js";
import { saveSelectedValues, restoreSelectedValues } from "./saveRestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const degreeOptions = document.querySelectorAll('.degree')
  const next = document.querySelector('#next')

  document.getElementById('add-course-button').addEventListener('click', () => {
    const courseCodeInput = document.getElementById('course-code-input');
    const creditsInput = document.getElementById('credits-input');
    const courseCode = courseCodeInput.value.trim();
    const credits = parseInt(creditsInput.value.trim());

    if (courseCode !== '' && !isNaN(credits)) {
      const substitutionDropdown = document.getElementById('substitution-dropdown');
      console.log(substitutionDropdown)
      console.log(substitutionDropdown.value)
      const substitutedValue = substitutionDropdown.value
      if (substitutedValue) {
        substituteCourse(courseCode, credits, substitutedValue);
      } else {
        addCourseToTable(courseCode, credits);
      }
      console.log(substitutedValue)
      // Reset input fields
      courseCodeInput.value = '';
      creditsInput.value = '';
    } else {
      alert("Please fill out all fields correctly.");
    }
  });

  degreeOptions.forEach(degree => {
    degree.addEventListener('click', async () => {
      degree.disabled = true;
      let degreeName = degree.value;
      if (degreeName === "Communication") {
        const commOldData = await getCommOld();
        createTableFromJson(commOldData);

        next.addEventListener('click', async () => {
          const commNewData = await getCommNew();
          const selectedValues = saveSelectedValues();
          createTableFromJson(commNewData);
          restoreSelectedValues(selectedValues);
        });
      }
    });
  });
});

