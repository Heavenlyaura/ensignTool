import { getCommNew, getCommOld, getItNew, getItOld } from "./fetchData.js";
import { createTableFromJson, addCourseToTable, substituteCourse } from "./createTable.js"
import { storeNotCompletedCourses, updateCompletedCredits } from "./credits.js";
import { saveSelectedValues, restoreSelectedValues, saveAddCourseTable } from "./saveRestore.js";

document.addEventListener('DOMContentLoaded', () => {
  localStorage.clear();
  const degreeOptions = document.querySelectorAll('.degree')
  const next = document.querySelector('#next')
  const footerSection = document.querySelector('.footer-section')
  const analysis = document.querySelector('.analysis')
  const pathway = document.querySelector('#pathway')
  const alternative = document.querySelector('.alternative')
  const oldPathway = document.querySelector('.old-pathway')

  analysis.style.display = 'none'
  footerSection.style.display = 'none'
  alternative.style.display = 'none'
  oldPathway.style.display = 'none'

  document.getElementById('add-course-button').addEventListener('click', () => {
    const courseCodeInput = document.getElementById('course-code-input');
    const creditsInput = document.getElementById('credits-input');
    const addUpperDiv = document.getElementById('UpperDivisionCheck');
    const courseCode = courseCodeInput.value.trim().toUpperCase();
    const credits = parseInt(creditsInput.value.trim());

    if (courseCode !== '' && !isNaN(credits)) {
      const substitutionDropdown = document.getElementById('substitution-dropdown');
      const substitutedValue = substitutionDropdown.value
      if (substitutedValue) {
        substituteCourse(courseCode, credits, substitutedValue);
      } else {
        addCourseToTable(courseCode, credits);
      }

      if (addUpperDiv.checked) {
        updateCompletedCredits(credits)
      }
      // Reset input fields
      courseCodeInput.value = '';
      creditsInput.value = '';
      addUpperDiv.checked = false
    } else {
      alert("Please fill out all fields correctly.");
    }
  });

  pathway.addEventListener('change', () => {
    let choice = pathway.value
    if (choice === 'No') {
      oldPathway.style.display = 'none'
      alternative.style.display = 'block'
      updateCompletedCredits()
    } else {
      alternative.style.display = 'none'
      oldPathway.style.display = 'block'
      const selectedRadioButton = document.querySelectorAll('input[name="old-pathway"]');
      selectedRadioButton.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
          let radioButtonValue = radioButton.value
          if (radioButtonValue == 'No') {
            updateCompletedCredits(radioButtonValue)
          }
          else if (radioButtonValue == 'Yes') {
            updateCompletedCredits(radioButtonValue)
          }
        })
      });
    }
  })
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
          analysis.style.display = 'block'
          storeNotCompletedCourses()
          saveAddCourseTable()
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
          storeNotCompletedCourses()
        });
      }
      footerSection.style.display = 'block'
    });
  });
});

