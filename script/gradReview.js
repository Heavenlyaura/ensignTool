document.addEventListener('DOMContentLoaded', () => {
  const uncompletedDiv = document.querySelector('.uncompleted');
  const storedCourses = localStorage.getItem('notCompleted')
  const uncompletedCourses = JSON.parse(storedCourses)
  if (storedCourses) {
    let list = document.createElement('ul')
    uncompletedCourses.forEach(course => {
      let listItem = document.createElement('li')
      let listText = `${course.courseCode}: ${course.courseTitle} - ${course.creditCell} - ${course.caption}`
      listItem.textContent = listText
      list.appendChild(listItem)
    });
    uncompletedDiv.appendChild(list)
  }


})