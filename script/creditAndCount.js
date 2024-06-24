// Define course categories
const coursesCategories = [
  'Social Media Marketing',
  'Communication Fundamentals',
  'Communication Core',
  'Technical Support Engineer',
  'IT Fundamentals',
  'System Administration',
  'Religion',
  'Composition',
  'Quantitative Literacy',
  'American Institutions',
  'Humanities',
  'Life Sciences',
  'Physical Science',
  'Social Science',
  'Fine Arts',
  'College & Career Success',
  'Career Success/Professionalism',
  'Capstone',
  'Internship',
];

const storedCourses = localStorage.getItem('notCompleted');
const addedCourseStrList = localStorage.getItem('addedCourseList');

let uncompletedCourses = [];
let addedCourses = [];

try {
  uncompletedCourses = JSON.parse(storedCourses) || [];
  addedCourses = JSON.parse(addedCourseStrList) || [];
} catch (e) {
  console.error('Error parsing JSON from localStorage', e);
}

const displayCourses = uncompletedCourses.filter(course => !addedCourses.includes(course.courseCode))

export function storeCreditAndCount() {
  // Initialize credits and counts for each category
  const creditsAndCounts = coursesCategories.reduce((acc, category) => {
    acc[category] = { credits: 0, count: 0 };
    return acc;
  }, {});
  // Function to parse and accumulate credits
  const parseAndAccumulateCredits = (course, credit, category) => {
    if (creditsAndCounts[category]) {
      creditsAndCounts[category].credits += credit;
      creditsAndCounts[category].count++;
    }
  };
  // Iterate over uncompleted courses and accumulate credits
  displayCourses.forEach(course => {
    const credit = parseInt(course.creditCell);
    if (isNaN(credit)) {
      console.warn(`Invalid creditCell value for course: ${course.caption}`);
      return;
    }
    const courseIndex = coursesCategories.indexOf(course.caption);
    if (courseIndex !== -1) {
      parseAndAccumulateCredits(course, credit, course.caption);
    }
    // BuildUncompletedCourses(uncompletedCourses, displayCourses)

  });
  const stringCreditsAndCounts = JSON.stringify(creditsAndCounts)
  localStorage.setItem('creditsAndCounts', stringCreditsAndCounts)
}
const uncompletedDiv = document.querySelector('.notCompletedReview')

export function BuildUncompletedCourses() {
  if (uncompletedCourses) {
    let uncompletedCredit = 0
    let uncompleted = `
    <div class="uncompleteHead"> 
      <h4>Course Code</h4>
      <h4>Course Title</h4>
      <h4>Credits</h4>
      <h4>Category</h4>
    </div>
    <div>`
    displayCourses.forEach(course => {
      uncompletedCredit += parseInt(course.creditCell)
      uncompleted +=
        `<span class="uncompleteBody">
        <p id="gradCourseCode">${course.courseCode}</p>
        <p id="gradCourseTitle">${course.courseTitle}</p>
        <p>${course.creditCell}</p>
        <p>${course.caption}</p>
      </span>`;

    });
    uncompletedDiv.innerHTML = uncompleted
    uncompleted += `</div>`
  }
}

