const StoredCountandCredits = localStorage.getItem('creditsAndCounts')
const countsAndCredits = JSON.parse(StoredCountandCredits)
const totalCredits = localStorage.getItem('totalCredit')
const upperDivCredit = localStorage.getItem('upperDivCredit')

const AmericanCredit = parseInt(countsAndCredits['American Institutions'].credits)
const AmericanCount = parseInt(countsAndCredits['American Institutions'].count)
const HumanitiesCredit = parseInt(countsAndCredits['Humanities'].credits)
const HumanitiesCount = parseInt(countsAndCredits['Humanities'].count)
const PhysicalCount = parseInt(countsAndCredits['Physical Science'].credits)
const PhysicalCredit = parseInt(countsAndCredits['Physical Science'].count)
const lifeCredit = parseInt(countsAndCredits['Life Sciences'].credits)
const lifeCount = parseInt(countsAndCredits['Life Sciences'].count)
const SocialCredits = parseInt(countsAndCredits['Social Science'].credits)
const SocialCount = parseInt(countsAndCredits['Social Science'].count)
const fineCredits = parseInt(countsAndCredits['Fine Arts'].credits)
const fineCount = parseInt(countsAndCredits['Fine Arts'].count)
const capstoneCredit = parseInt(countsAndCredits['Capstone'].count)
const CapstoneCount = parseInt(countsAndCredits['Capstone'].count)
const ProfessionalismCredit = parseInt(countsAndCredits['Career Success/Professionalism'].count)
const ProfessionalismCount = parseInt(countsAndCredits['Career Success/Professionalism'].count)

function sumVariables(...args) {
  return args.reduce((total, num) => total + num, 0);
}

const breadthTotalCredit = sumVariables(AmericanCredit, HumanitiesCredit, PhysicalCredit, lifeCredit, SocialCredits, fineCredits, capstoneCredit, ProfessionalismCredit)
const breadthTotalCount = sumVariables(AmericanCount, HumanitiesCount, PhysicalCount, lifeCount, SocialCount, fineCount, CapstoneCount, ProfessionalismCredit)

console.log(countsAndCredits)

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
    <br>
    <p>GPA: ___/2.0<br>
    Minimum Total Credits: ${totalCredits}/120<br>
    In Residency* Credits: ___/(25% of the total)<br>
    Upper Division** Credits: ${upperDivCredit}/40 or 30<br>
    Minimum Grade Accepted: C in 2022 and prior catalogs, C- in 2023.</p>
    <br>
    <p>*In Residency credits are credits taken directly in Ensign College, online or on-campus.<br>
    **Upper Division credits are credits with a 300-level or 400-level in the course code.</p>
    <br>

    <ul>
      <li>Certificate 1: ${16 - countsAndCredits["Social Media Marketing"].credits}/16: You have ${countsAndCredits["Social Media Marketing"].count} course(s) left</li>

      <li>Certificate 2: ${15 - countsAndCredits["Communication Fundamentals"].credits}/15: You have ${countsAndCredits["Communication Fundamentals"].count} course(s) left</li>

      <li>Certificate 3: ${13 - countsAndCredits["Communication Core"].credits}/13: You have ${countsAndCredits["Communication Core"].count} course(s) left</li>

      <li>Religion: ${14 - countsAndCredits['Religion'].credits}/14: You have ${countsAndCredits['Religion'].count} course(s) left</li>

      <li>Composition: ${6 - countsAndCredits['Composition'].credits}/6: You have ${countsAndCredits['Composition'].count} course(s) left</li>

      <li>Quantitative Literacy: ${3 - countsAndCredits['Fine Arts'].credits}/3: ${countsAndCredits['Fine Arts'].count} course(s) left</li>

      <li>College & Career Success: ${2 - countsAndCredits['College & Career Success'].credits}/3: ${countsAndCredits['College & Career Success'].count} course(s) left</li>

      <li>Breadth Courses: ${12 - breadthTotalCredit}: You have ${breadthTotalCount} course(s) left</li>

      <li>Internship: ${3 - countsAndCredits['Internship'].credits}/1-5: ${countsAndCredits['Internship'].count} course(s) left</li>

      <li>Elective Courses: ${120 - totalCredits} Approximately ${(120 - totalCredits) / 3}</li>
  </ul>
    <p>We hope this graduation review has been clearly understood.</p>
    <br>
    <p>In conclusion, ___</p>
    <br>
    <p>If you have more questions about your graduation requirements please let us know.</p>
    `
  return template;
}
export function detailsComm2022() {
  const detail = `
  <ul class="detailList">
    <li><span>Certificate 1</span>: ${16 - countsAndCredits["Social Media Marketing"].credits}/16, ${countsAndCredits["Social Media Marketing"].count} course(s) left</li>
    <li><span>Certificate 2</span>: ${15 - countsAndCredits["Communication Fundamentals"].credits}/15, ${countsAndCredits["Communication Fundamentals"].count} course(s) left</li>
    <li><span>Certificate 3</span>: ${13 - countsAndCredits["Communication Core"].credits}/13, ${countsAndCredits["Communication Core"].count} course(s) left</li>
    <li><span>Religion</span>: ${14 - countsAndCredits['Religion'].credits}/14, ${countsAndCredits['Religion'].count} course(s) left</li>
    <li><span>Composition</span>: ${6 - countsAndCredits['Composition'].credits}/6, ${countsAndCredits['Composition'].count} course(s) left</li>
    <li><span>Quantitative Literacy</span>: ${3 - countsAndCredits['Fine Arts'].credits}/3, ${countsAndCredits['Fine Arts'].count} course(s) left</li>
    <li><span>College & Career Success</span>: ${2 - countsAndCredits['College & Career Success'].credits}/3, ${countsAndCredits['College & Career Success'].count} course(s) left</li>
    <li><span>Breadth Courses</span>: ${12 - breadthTotalCredit}, You have ${breadthTotalCount} course(s) left</li>
    <li><span>Internship</span>: ${3 - countsAndCredits['Internship'].credits}/1-5, ${countsAndCredits['Internship'].count} course(s) left</li>
    <li><span>Elective Courses</span>: ${120 - totalCredits} credit(s), Approximately ${Math.floor((120 - totalCredits) / 3)} course(s) left</li>
  </ul>`
  return detail;
}
export function templateComm2024() {
  const template = `
    <p>(Day and Date), 2024</p>

  <p>Dear (Student Name),</p>

  <p>My name is (Advisor Name) from the BYU-Pathway Worldwide Advising Team. Thanks for contacting us.</p>

  <p>We understand you have requested a graduation review. The next review has been done using your Degree Audit (Degree and Catalog Year)</p>

  <p>Requirements</p>

  <ul>
      <li>GPA: ___/2.0</li>
      <li>Minimum Total Credits: ___/90</li>
      <li>In Residency* Credits: ___/30</li>
      <li>Upper Division** Credits: ___/30</li>
      <li>Minimum Grade: C-</li>
  </ul>

  <p>*In Residency credits are credits taken directly in BYU-Idaho, online or on-campus.</p>
  <p>**Upper Division Credits are credits with a 300-level or 400-level in the course code.</p>

  <ul>
      <li>Certificate 1: ___</li>
      <li>Certificate 2: ___</li>
      <li>Certificate 3: ___</li>
      <li>Religion: ___</li>
      <li>Internship: ___</li>
      <li>Professionalism Certificate: ____</li>
      <li>General Education: ___</li>
      <li>Elective Courses: Not required</li>
  </ul>

  <p>We hope this graduation review has been clearly understood.</p>
  <p>In conclusion, ___</p>
  <p>If you have more questions about your graduation requirements please let us know.</p>
`
  return template;
}
export function detailsComm2024() {
  const detail = `
  <ul class="detailList">
    <li><span>Certificate 1</span>: ${16 - countsAndCredits["Social Media Marketing"].credits}/16, ${countsAndCredits["Social Media Marketing"].count} course(s) left</li>
    <li><span>Certificate 2</span>: ${15 - countsAndCredits["Communication Fundamentals"].credits}/15, ${countsAndCredits["Communication Fundamentals"].count} course(s) left</li>
    <li><span>Certificate 3</span>: ${13 - countsAndCredits["Communication Core"].credits}/13, ${countsAndCredits["Communication Core"].count} course(s) left</li>
    <li><span>Religion</span>: ${14 - countsAndCredits['Religion'].credits}/14, ${countsAndCredits['Religion'].count} course(s) left</li>
    <li><span>Composition</span>: ${6 - countsAndCredits['Composition'].credits}/6, ${countsAndCredits['Composition'].count} course(s) left</li>
    <li><span>Quantitative Literacy</span>: ${3 - countsAndCredits['Fine Arts'].credits}/3, ${countsAndCredits['Fine Arts'].count} course(s) left</li>
    <li><span>College & Career Success</span>: ${2 - countsAndCredits['Career Success/Professionalism'].credits}/3, ${countsAndCredits['Career Success/Professionalism'].count} course(s) left</li>
    <li><span>Breadth Courses</span>: ${12 - breadthTotalCredit}, You have ${breadthTotalCount} course(s) left</li>
    <li><span>Internship</span>: ${3 - countsAndCredits['Internship'].credits}/1-5, ${countsAndCredits['Internship'].count} course(s) left</li>
    <li><span>Elective Courses</span>: ${120 - totalCredits} credit(s), Approximately ${Math.floor((120 - totalCredits) / 3)} course(s) left</li>
  </ul>
`
  return detail
}
export function detailsIT2022() {
  const detail = `
  <ul class="detailList">
  <li><span>Religion</span>: ${14 - countsAndCredits['Religion'].credits}/14, ${countsAndCredits['Religion'].count} course(s) left</li>
  <li><span>College and Career Success</span>: ${2 - countsAndCredits['College & Career Success'].credits}/2, ${countsAndCredits['College & Career Success'].count} course(s) left</li>
  <li><span>Internship</span>: ${3 - countsAndCredits['Internship'].credits}/3, ${countsAndCredits['Internship'].count} course(s) left</li>
  <li><span>Composition</span>: ${6 - countsAndCredits['Composition'].credits}/6, ${countsAndCredits['Composition'].count} course(s) left</li>
  <li><span>Quantitative Literacy</span>: ${3 - countsAndCredits['Quantitative Literacy'].credits}/3, ${countsAndCredits['Quantitative Literacy'].count} course(s) left</li>
  <li><span>Fine Arts</span>: ${3 - countsAndCredits['Fine Arts'].credits}/3, ${countsAndCredits['Fine Arts'].count} course(s) left</li>
  <li><span>Life Science</span>: ${3 - countsAndCredits['Life Sciences'].credits}/3, ${countsAndCredits['Life Sciences'].count} course(s) left</li>
  <li><span>Physical Science</span>: ___</li>
  <li><span>Social Science</span>: ___</li>
  <li><span>Certificate 1</span>: ${16 - countsAndCredits["Technical Support Engineer"].credits}/16, You have ${countsAndCredits["Technical Support Engineer"].count} course(s) left</li>
  <li><span>Certificate 2</span>: ${15 - countsAndCredits["IT Fundamentals"].credits}/15, You have ${countsAndCredits["IT Fundamentals"].count} course(s) left</li>
  <li><span>Certificate 3</span>: ${13 - countsAndCredits["System Administration"].credits}/13, You have ${countsAndCredits["System Administration"].count} course(s) left</li>
  <li><span>Electives</span>: ${120 - totalCredits} credits, Approximately ${Math.floor((120 - totalCredits) / 3)} course(s) left</li>
  </ul>
`
  return detail;
}