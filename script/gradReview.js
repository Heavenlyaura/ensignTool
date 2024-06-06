document.addEventListener('DOMContentLoaded', () => {
  const uncompletedDiv = document.querySelector('.uncompleted');
  const storedCourses = localStorage.getItem('notCompleted')
  const uncompletedCourses = JSON.parse(storedCourses)
  const gradTotal = document.querySelector('.grad-total')
  const upperDiv = document.querySelector('.upper-div')
  const completeAnalysisDiv = document.querySelector('.completeAnalysis')
  const finish = document.querySelector('#finish')
  const creditSavedh3 = document.querySelector('.credit-saved')
  const oldDegree = 120
  let totalCredits = parseInt(localStorage.getItem('totalCredit'))
  let upperDivCredit = parseInt(localStorage.getItem('upperDivCredit'))

  
  
  if (isNaN(totalCredits)) {
    totalCredits = 0
  }
  if (isNaN(upperDivCredit)) {
    upperDivCredit = 0
  }
  upperDiv.textContent = `Upper Division: ${upperDivCredit}/30`
  gradTotal.textContent = `Total: ${totalCredits}/90`

  completeAnalysisDiv.style.display = 'none'

  if (storedCourses) {
    let requireAllCourses = [
      'Social Media Marketing (Complete All)',
      'Communication Fundamentals (Complete All)',
      'Communication Core (Complete All)',
      'Technical Support Engineer (Complete All)',
      'IT Fundamentals (Complete All)',
      'System Administration (Complete All)'
    ];

    let uncompleted = `
    <div class="uncompleteHead"> 
      <h4>Course Code</h4>
      <h4>Course Title</h4>
      <h4>Credits</h4>
      <h4 class="added">Add</h4>
    </div>
    <div>`
    uncompletedCourses.forEach(course => {
      let isRequired = requireAllCourses.includes(course.caption);
      let courseClass = isRequired ? 'required-course' : '';

      uncompleted +=
        `<span class="uncompleteBody ${courseClass}">
      <p>${course.courseCode}</p>
      <p>${course.courseTitle}</p>
      <p>${course.creditCell}</p>
      <button class="addGrad" data-course="${course.courseCode}" data-upperDiv=${course.upperDiv} data-credits="${course.creditCell}">Add</button>
      </span>`

    });
    uncompletedDiv.innerHTML = uncompleted
    uncompleted += `</div>`
  }
  const addButton = document.querySelectorAll('.addGrad')
  addButton.forEach(button => {
    button.addEventListener('click', () => {
      const courseCredits = button.dataset.credits
      const upperDivText = button.dataset.upperdiv
      if (upperDivText === 'Yes') {
        upperDivCredit += parseInt(courseCredits)
      }
      totalCredits += parseInt(courseCredits)
      const parentRow = button.parentElement
      upperDiv.textContent = `Upper Division: ${upperDivCredit}`
      gradTotal.textContent = `Total: ${totalCredits}`
      parentRow.remove()
    })
  });
  finish.addEventListener('click', () => {
    completeAnalysisDiv.style.display = 'block'
    let creditSaved = oldDegree - totalCredits
    creditSavedh3.textContent = `CREDIT SAVED: ${creditSaved}`

  })





})