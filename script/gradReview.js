document.addEventListener('DOMContentLoaded', () => {
  const uncompletedDiv = document.querySelector('.uncompleted');
  const storedCourses = localStorage.getItem('notCompleted')
  const uncompletedCourses = JSON.parse(storedCourses)
  if (storedCourses) {
    uncompletedCourses.forEach(course => {
      // console.log(course)
      let list = document.createElement('ul')
      let listItem = document.createElement('li')
      let listText = `${course.courseCode}: ${course.courseTitle} - ${course.creditCell}`
      console.log(listText)
      listItem.textContent = listText
      list.appendChild(listItem)
      uncompletedDiv.appendChild(list)
    });
  }


})