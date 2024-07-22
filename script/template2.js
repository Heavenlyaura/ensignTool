// Retrieve and parse data from localStorage
const storedCountAndCredits = localStorage.getItem('creditsAndCounts');
const countsAndCredits = JSON.parse(storedCountAndCredits);
const storedNotCompletedCourses = localStorage.getItem('notCompleted')
const notCompletedCourses = JSON.parse(storedNotCompletedCourses)
const totalCredits = parseInt(localStorage.getItem('totalCredit')) || 0;
const upperDivCredit = parseInt(localStorage.getItem('upperDivCredit')) || 0;
const creditSaved = localStorage.getItem('creditSaved')
function parseCreditsAndCounts(category) {
  return {
    credits: parseInt(countsAndCredits[category]?.credits || 0),
    count: parseInt(countsAndCredits[category]?.count || 0)
  };
}
const categories = [
  'American Institutions', 'Humanities', 'Physical Science',
  'Life Sciences', 'Social Science', 'Fine Arts', 'Capstone',
  'Career Success/Professionalism', 'Religion', 'Composition',
  'Quantitative Literacy', 'College & Career Success', 'Internship',
  'Social Media Marketing', 'Communication Fundamentals', 'Communication Core',
  'Technical Support Engineer', 'IT Fundamentals', 'System Administration'
];
const parsedData = {};
categories.forEach(category => {
  parsedData[category] = parseCreditsAndCounts(category);
});
function sumVariables(...args) {
  return args.reduce((total, num) => total + num, 0);
}
function generateListItem(category, requiredCredits, requiredCount, text) {
  const { credits, count } = parsedData[category];
  return `<li>${text}: ${requiredCredits - credits}/${requiredCredits} (${count} course(s) left)</li>`;
}
function getCoursesFromCategory(category) {
  return notCompletedCourses.filter(course => course.caption === category);
}
const associateGenerals = [
  'GS 170',
  'COMM 122',
  'ENG 101',
  'ENG 201',
  'MATH 107',
  'BAP 115'
]
const BachelorGenerals = [
  'ENS 497',
  'HIST 175',
  'COMM 497',
  'LS 303',
  'IT497'
]
function getCourses(listOfCourses, targetCouseList) {
  const uncompleted = []
  listOfCourses.forEach(element => {
    uncompleted.push(targetCouseList.find(obj => obj.courseCode === element))
  });
  return uncompleted
}
function calculateTotalCredits(courses) {
  if (courses) {
    return courses.filter(course => course !== undefined).reduce((total, course) => {
      return total + Number(course.creditCell);
    }, 0);
  }
  return 0; // Return 0 if courses is undefined or empty
}

const generalAssociates = getCourses(associateGenerals, notCompletedCourses)
const generalAssociatesTotal = calculateTotalCredits(generalAssociates)
const generalBachelors = getCourses(BachelorGenerals, notCompletedCourses)
const generalBachelorsTotal = calculateTotalCredits(generalBachelors)

export function templateComm2022() {
  const template = `
    <p>(Day and Date), 2024</p>
    <br>
    <p>Dear (Student Name),</p>
    <br>
    <p>My name is (Advisor Name) from the BYU-Pathway Worldwide Advising Team. Thanks for contacting us.</p>
    <br>
    <p>We understand you have requested a graduation review. The next review has been done using your Degree Audit (Degree and Catalog Year)</p>
    <br>
    <p>Requirements</p>
    <p>GPA: ___/2.0<br>
    Minimum Total Credits: ${totalCredits}/120<br>
    In Residency* Credits: ___/(25% of the total)<br>
    Upper Division** Credits: ${upperDivCredit}/40 or 30<br>
    Minimum Grade Accepted: C in 2022 and prior catalogs, C- in 2023.</p>
    <br>
    <p>*In Residency credits are credits taken directly in Ensign College, online or on-campus.<br>
    **Upper Division credits are credits with a 300-level or 400-level in the course code.</p>
    <br>
    <ul class="emailList">
      ${generateListItem('Social Media Marketing', 16, countsAndCredits["Social Media Marketing"].count, '1st Cretificate')}
      ${generateListItem('Communication Fundamentals', 15, countsAndCredits["Communication Fundamentals"].count, '2nd Certificate')}
      ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
      <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
      ${generateListItem('Communication Core', 13, countsAndCredits["Communication Core"].count, '3rd Certificate')}
      ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
      <li>Bachelor Generals: ${6 - generalBachelorsTotal}/6</li>
  </ul>
  <br>
    <p>We hope this graduation review has been clearly understood.</p>
    <p>In conclusion, ___</p>
    <p>If you have more questions about your graduation requirements please let us know.</p>
        `;
  return template;
}
export function detailsComm2022() {
  const detail = `
  <ul class="detailList">
  ${generateListItem('Social Media Marketing', 16, countsAndCredits["Social Media Marketing"].count, '1st Certificate')}
  ${generateListItem('Communication Fundamentals', 15, countsAndCredits["Communication Fundamentals"].count, '2nd Certificate')}
  ${generateListItem('Communication Core', 13, countsAndCredits["Communication Core"].count, '3rd Certificate')}
  ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
  ${generateListItem('Composition', 6, countsAndCredits['Composition'].count, 'Composition')}
  ${generateListItem('Quantitative Literacy', 3, countsAndCredits['Quantitative Literacy'].count, 'Quantitative Literacy')}
  ${generateListItem('College & Career Success', 2, countsAndCredits['College & Career Success'].count, 'College & Career Success')}
  ${generateListItem('Internship', 3, countsAndCredits['Internship'].count, 'Internship')}
  </ul>
  `;
  return detail;
}
export function templateComm2024() {
  const template = `
  <p>(Day and Date), 2024</p>
  <br>
  <p>Dear (Student Name),</p>
  <br>
  <p>My name is (Advisor Name) from the BYU-Pathway Worldwide Advising Team. Thanks for contacting us.</p>
  <br>
  <p>We understand you have requested a graduation review. The next review has been done using your Degree Audit (Degree and Catalog Year)</p>
  <br>
  <p>Requirements</p>
  <p>GPA: ___/2.0<br>
  Minimum Total Credits: ${totalCredits}/90<br>
  In Residency* Credits: ___/30<br>
  Upper Division** Credits: ${upperDivCredit}/30<br>
  Minimum Grade: C- <br>
  <br>
  <p>*In Residency credits are credits taken directly in Ensign College, online or on-campus.<br>
  **Upper Division credits are credits with a 300-level or 400-level in the course code.</p>
  
  <ul class="emailList">
    ${generateListItem('Social Media Marketing', 15, countsAndCredits["Social Media Marketing"].count, '1st Certificate')}
    ${generateListItem('Communication Fundamentals', 15, countsAndCredits["Communication Fundamentals"].count, '2nd Certificate')}
    ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
    <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
    ${generateListItem('Communication Core', 15, countsAndCredits["Communication Core"].count, '3rd Certificate')}
    ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
    <li>Bachelor Generals: ${9 - generalBachelorsTotal}/9</li>
    <li>Elective Courses: [Enter Elective Courses]</li>
  </ul>
  <p>We hope this graduation review has been clearly understood.</p>
  <p>In conclusion, ___</p>
  <p>If you have more questions about your graduation requirements please let us know.</p>
  `;
  return template;
}
export function detailComm2024() {
  const detail = `
  <ul class="detailList">
    ${generateListItem('Social Media Marketing', 15, countsAndCredits["Social Media Marketing"].count, 'Certificate 1')}
    ${generateListItem('Communication Fundamentals', 15, countsAndCredits["Communication Fundamentals"].count, 'Certificate 2')}
    ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
    <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
    ${generateListItem('Communication Core', 15, countsAndCredits["Communication Core"].count, 'Certificate 3')}
    ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
    <li>Bachelor Generals: ${9 - generalBachelorsTotal}/9</li>
  </ul>`

  return detail
}
export function templateIt2022() {
  const template = `
  <p>(Day and Date), 2024</p>
  <br>
  <p>Dear (Student Name),</p>
  <br>
  <p>My name is (Advisor Name) from the BYU-Pathway Worldwide Advising Team. Thanks for contacting us.</p>
  <br>
  <p>We understand you have requested a graduation review. The next review has been done using your Degree Audit (Degree and Catalog Year)</p>
  <br>
  <p>Requirements</p>
  <p>GPA: ___/2.0<br>
  Minimum Total Credits: ${totalCredits}/120<br>
  In Residency* Credits: ___/(25% of the total)<br>
  Upper Division** Credits: ${upperDivCredit}/40 or 30<br>
  Minimum Grade Accepted: C in 2022 and prior catalogs, C- in 2023.</p>
  <br>
  <p>*In Residency credits are credits taken directly in Ensign College, online or on-campus.<br>
  **Upper Division credits are credits with a 300-level or 400-level in the course code.</p>
  <br>
  <ul class="emailList">
    ${generateListItem('Technical Support Engineer', 15, countsAndCredits["Technical Support Engineer"].count, 'Certificate 1')}
    ${generateListItem('IT Fundamentals', 15, countsAndCredits["IT Fundamentals"].count, 'Certificate 2')}
    ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
    <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
    ${generateListItem('System Administration', 13, countsAndCredits["System Administration"].count, 'Certificate 3')}
    ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
    <li>Bachelor Generals: ${6 - generalBachelorsTotal}/6</li>
  </ul>
  <br>
  <p>We hope this graduation review has been clearly understood.</p>
  <p>In conclusion, ___</p>
  <p>If you have more questions about your graduation requirements please let us know.</p>
  `
  return template
}
export function detailIt2022() {
  const detail = `
  <ul class="detailList">
    ${generateListItem('Technical Support Engineer', 16, countsAndCredits["Technical Support Engineer"].count, 'Certificate 1')}
    ${generateListItem('IT Fundamentals', 15, countsAndCredits["IT Fundamentals"].count, 'Certificate 2')}
    ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
    <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
    ${generateListItem('System Administration', 13, countsAndCredits["System Administration"].count, 'Certificate 3')}
    ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
    <li>Bachelor Generals: ${6 - generalBachelorsTotal}/6</li>
  </ul>`

  return detail
}
export function templateIt2024() {
  const template = `
  <p>(Day and Date), 2024</p>
  <br>
  <p>Dear (Student Name),</p>
  <br>
  <p>My name is (Advisor Name) from the BYU-Pathway Worldwide Advising Team. Thanks for contacting us.</p>
  <br>
  <p>We understand you have requested a graduation review. The next review has been done using your Degree Audit (Degree and Catalog Year)</p>
  <br>
  <p>Requirements</p>
  <p>GPA: ___/2.0<br>
  Minimum Total Credits: ${totalCredits}/90<br>
  In Residency* Credits: ___/30<br>
  Upper Division** Credits: ${upperDivCredit}/30<br>
  Minimum Grade: C- <br>
  <br>
  <p>*In Residency credits are credits taken directly in Ensign College, online or on-campus.<br>
  **Upper Division credits are credits with a 300-level or 400-level in the course code.</p>
  
  <ul class="emailList">
    ${generateListItem('Technical Support Engineer', 15, countsAndCredits["Technical Support Engineer"].count, 'Certificate 1')}
    ${generateListItem('IT Fundamentals', 15, countsAndCredits["IT Fundamentals"].count, 'Certificate 2')}
    ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
    <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
    ${generateListItem('System Administration', 13, countsAndCredits["System Administration"].count, 'Certificate 3')}
    ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
    <li>Bachelor Generals: ${9 - generalBachelorsTotal}/9</li>
  </ul>
  <p>We hope this graduation review has been clearly understood.</p>
  <p>In conclusion, ___</p>
  <p>If you have more questions about your graduation requirements please let us know.</p>`
  return template
}
export function detailIt2024() {
  const detail = `<ul class="emailList">
  ${generateListItem('Technical Support Engineer', 15, countsAndCredits["Technical Support Engineer"].count, 'Certificate 1')}
  ${generateListItem('IT Fundamentals', 15, countsAndCredits["IT Fundamentals"].count, 'Certificate 2')}
  ${generateListItem('Religion', 14, countsAndCredits['Religion'].count, 'Religion')}
  <li>Associate Generals: ${14 - generalAssociatesTotal}/14</li>
  ${generateListItem('System Administration', 13, countsAndCredits["System Administration"].count, 'Certificate 3')}
  ${generateListItem('Internship', 3, countsAndCredits['Internship'], 'Internship')}
  <li>Bachelor Generals: ${9 - generalBachelorsTotal}/9</li>
</ul>`
  return detail;
}

export function degreeAnalysis() {
  const degreeAnalysis = `
  <p>Hello [Student],</p>
    <p>My name is (Advisor) from the BYU-Pathway Worldwide Advising Team. Thanks for contacting us. We understand you are interested in the new three-year degree program. We have analyzed the requirements and these are our observations.</p>

    <h2>General Observations</h2>
    <ul>
        <li>Estimated Credits Left: ${90 - totalCredits}  (Plus the difference of the missing upper-division credits)</li>
        <li>Credits completed:${totalCredits} </li>
        <li>In Residency Credits: 0/30</li>
        <li>Upper Division Credits: ${upperDivCredit}/30</li>
        ${generateListItem('Religion', 14, 7, Religion)}
        <li>General Education Credits: 0/11</li>
        <li>Leadership and Self-reliance credits: 0/14</li>
        <li>Internship/Professional Project/Senior Project: 0/1-6 (It depends on the degree)</li>
        <li>Core Courses: 0/1-5 (It depends on the degree)</li>
    </ul>

    <h2>Certificate Observations</h2>
    <p>Your degree is (Student’s current Degree [EDIT]), [catalog 202X EDIT]. Changing to the three-year degree will require a change to the 2024 catalog. Due to this, your certificates will have the following changes:</p>
    <p>Degree: New Degree</p>
    <ul>
        <li>Cert. 1 - [EDIT]: You will have to take 0 courses to fulfill this first certificate.</li>
        <li>Cert. 2 - [EDIT]: You will have to take 0 courses to fulfill your second certificate.</li>
        <li>Cert. 3 - [EDIT]: You will have to take 0 courses to fulfill your third certificate.</li>
    </ul>
    <p>[Please note that for the [C1/C2/C3 EDIT]. certificate to be considered complete in the 3-year degree, you must have been awarded the diploma. Please CONFIRM if you already have been awarded the diploma. We invite you to request the diploma if you do not have it.]</p>
    <p>If you would like to know which courses have each certificate, please check the following link and click on each certificate name to see the courses: <a href="https://www.byupathway.edu/degrees/program-list">https://www.byupathway.edu/degrees/program-list</a></p>

    <p>*Upper Division Credits are those (300-400-level courses)</p>
    <p>*In Residency, are online courses from BYU-Idaho or Ensign, not transferred.</p>
    <p>In conclusion, The change might save you up to ${creditSaved} credits compared to your current degree. I hope this information helps you decide whether to change your program.</p>
    <p>While we, as Advisors, try to provide students with the best information available, we cannot guarantee the exact number of courses needed to complete your degree when switching to the Three-Year Degree. This is only an estimate to help you make an informed decision.</p>
    <p>Please reply to this email confirming: “Yes, I confirm I want to switch to the three-year degree” or not.</p>
    <p>If you confirm “yes”, please let us know your credit workload per semester. Once we have your confirmation, we'll proceed to submit your request. Notice that switching catalog years may be subject to different certificate and degree requirements. Once you have been moved to the 2024 Catalog year, you cannot be moved back to your old catalog.</p>
    <p>If you have more questions, don’t hesitate to reach out to us.</p>
`
  return degreeAnalysis;
}

 