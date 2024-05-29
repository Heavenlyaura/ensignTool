import { getCommNew, getCommOld, getItNew, getItOld } from "./fetchData.js";
import { createTableFromJson, addCourseToTable, substituteCourse } from "./createTable.js"
import { updateCompletedCredits } from "./credits.js";
import { saveSelectedValues, restoreSelectedValues } from "./saveRestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const degreeOptions = document.querySelectorAll('.degree')
  const next = document.querySelector('#next')
  const footerSection = document.querySelector('.footer-section')
  const analysis = document.querySelector('.analysis')
  const pathway = document.querySelector('#pathway')
  const alternative = document.querySelector('.alternative')

  analysis.style.display = 'none'
  footerSection.style.display = 'none'
  alternative.style.display = 'none'

  document.getElementById('add-course-button').addEventListener('click', () => {
    const courseCodeInput = document.getElementById('course-code-input');
    const creditsInput = document.getElementById('credits-input');
    const courseCode = courseCodeInput.value.trim();
    const credits = parseInt(creditsInput.value.trim());

    if (courseCode !== '' && !isNaN(credits)) {
      const substitutionDropdown = document.getElementById('substitution-dropdown');
      const substitutedValue = substitutionDropdown.value
      if (substitutedValue) {
        substituteCourse(courseCode, credits, substitutedValue);
      } else {
        addCourseToTable(courseCode, credits);
      }
      // Reset input fields
      courseCodeInput.value = '';
      creditsInput.value = '';
    } else {
      alert("Please fill out all fields correctly.");
    }
  });

  pathway.addEventListener('change', () => {
    let choice = pathway.value
    if (choice === 'No') {
      alternative.style.display = 'block'
      updateCompletedCredits()
    } else {
      alternative.style.display = 'none'
      updateCompletedCredits()
    }
  })
  degreeOptions.forEach(degree => {
    degree.addEventListener('click', async () => {
      degree.disabled = true;
      let degreeName = degree.value;
      if (degreeName === "Communication") {
        const commOldData = await getCommOld();
        console.log(commOldData)
        createTableFromJson(commOldData);

        next.addEventListener('click', async () => {
          const commNewData = await getCommNew();
          const selectedValues = saveSelectedValues();
          createTableFromJson(commNewData);
          restoreSelectedValues(selectedValues);
          analysis.style.display = 'block'
        });
      }
      else if (degreeName === "Information Technology") {
        const ItOld = await getItOld();
        createTableFromJson(ItOld);

        next.addEventListener('click', async () => {
          const ItNew = await getItNew();
          const selectedValues = saveSelectedValues();
          createTableFromJson(ItNew);
          restoreSelectedValues(selectedValues);
          analysis.style.display = 'block'
        });
      }
      footerSection.style.display = 'block'
    });
  });
});

