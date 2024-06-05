document.addEventListener('DOMContentLoaded', () => {
  const uncompletedDiv = document.querySelector('.uncompleted');
  const storedCourses = localStorage.getItem('notCompleted')
  const uncompletedCourses = JSON.parse(storedCourses)
  const gradTotal = document.querySelector('.grad-total')
  const completeAnalysisDiv = document.querySelector('.completeAnalysis')
  const finish = document.querySelector('#finish')
  const creditSavedh3 = document.querySelector('.credit-saved')
  const oldDegree = 120
  let totalCredits = parseInt(localStorage.getItem('totalCredit'))
  completeAnalysisDiv.style.display = 'none'

  if (storedCourses) {

    let uncompleted = `
    <div class="uncompleteHead"> 
      <h4>Course Code</h4>
      <h4>Course Title</h4>
      <h4>Credits</h4>
      <h4 class="added">Add</h4>
    </div>
    <div>
    `
    uncompletedCourses.forEach(course => {
      console.log(course.creditCell)
      uncompleted +=
        `<span class="uncompleteBody">
      <p>${course.courseCode}</p>
      <p>${course.courseTitle}</p>
      <p>${course.creditCell}</p>
      <button class="addGrad" data-course="${course.courseCode}" data-credits="${course.creditCell}">Add</button>
      </span>
      `
    });
    uncompleted += `</div>`
    // console.log(uncompleted)
    uncompletedDiv.innerHTML = uncompleted
  }

  const addButton = document.querySelectorAll('.addGrad')
  addButton.forEach(button => {
    button.addEventListener('click', () => {
      const courseCredits = button.dataset.credits
      totalCredits += parseInt(courseCredits)
      const parentRow = button.parentElement
      gradTotal.textContent = `Total: ${totalCredits}`
      parentRow.remove()
    })
  });


  finish.addEventListener('click', () => {
    completeAnalysisDiv.style.display = 'block'
    let creditSaved = oldDegree - totalCredits
    creditSavedh3.textContent = creditSaved

  })




})