document.addEventListener('DOMContentLoaded', () => {
  const uncompletedDiv = document.querySelector('.notCompleted');
  const storedCourses = localStorage.getItem('notCompleted')
  const uncompletedCourses = JSON.parse(storedCourses)
  const addedCourseStrList = localStorage.getItem('addedCourseList')
  const addedCourses = JSON.parse(addedCourseStrList)
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

  const displayCourses = uncompletedCourses.filter(course => !addedCourses.includes(course.courseCode))

  if (storedCourses) {
    let certificateCourses = [
      'Social Media Marketing',
      'Communication Fundamentals',
      'Communication Core',
      'Technical Support Engineer',
      'IT Fundamentals',
      'System Administration'
    ];
    let religionCourses = [
      'Religion'
    ]
    let capstoneCourses = [
      ''
    ]
    let internshipCourse = [
      'Internship'
    ]


    let uncompleted = `
    <div class="uncompleteHead"> 
      <h4>Course Code</h4>
      <h4>Course Title</h4>
      <h4>Credits</h4>
      <h4 class="added">Add</h4>
    </div>
    <div>`
    displayCourses.forEach(course => {
      let isCertificate = certificateCourses.includes(course.caption);
      let certificates = isCertificate ? 'certificateCourses' : '';
      let isReligion = religionCourses.includes(course.caption)
      let religions = isReligion ? 'religionCourses' : '';
      let isCapstone = capstoneCourses.includes(course.caption)
      let capstones = isCapstone ? 'capstoneCourses' : '';
      let isInternship = internshipCourse.includes(course.caption)
      let internships = isInternship ? 'internshipCourse' : '';

      uncompleted +=
        `<span class="uncompleteBody ${certificates} ${religions} ${capstones} ${internships}">
        <p id="gradCourseCode">${course.courseCode}</p>
        <p id="gradCourseTitle">${course.courseTitle}</p>
        <p>${course.creditCell}</p>
        <button class="addGrad" data-course="${course.courseCode}" data-upperDiv="${course.upperDiv}" data-credits="${course.creditCell}">Add</button>
      </span>`;

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
      upperDiv.textContent = `Upper Division: ${upperDivCredit}/30`
      gradTotal.textContent = `Total: ${totalCredits}/90`
      parentRow.remove()
    })
  });
  finish.addEventListener('click', () => {
    if (!(totalCredits < 90) && !(upperDivCredit < 30)) {
      completeAnalysisDiv.style.display = 'block'
      let creditSaved = oldDegree - totalCredits
      if (totalCredits > 120) {
        creditSavedh3.style.color = 'red'
        creditSavedh3.textContent = `CREDIT LOST: ${creditSaved}`
      } else {
        creditSavedh3.textContent = `CREDIT SAVED: ${creditSaved}`
      }
    } else {
      alert('Credits not up to requirement')
    }
  })
})