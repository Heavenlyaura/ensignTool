import { BuildUncompletedCourses } from "./creditAndCount.js";
import { storeCreditAndCount } from "./creditAndCount.js";

document.addEventListener('DOMContentLoaded', ()=> {
  const ReviewCredits = document.querySelector('.ReviewCredits')
  let totalCredits = localStorage.getItem('totalCredit')
  let upperDivCredit = localStorage.getItem('upperDivCredit')
  BuildUncompletedCourses() 
  storeCreditAndCount()


  let reviewDivContent = `
  <p>Total Credit: ${totalCredits}</p>
  <p>Upper Division Credit: ${upperDivCredit}</p>
  <a href="viewReviewDetail.html" target="_blank">View Details</>`
  ReviewCredits.innerHTML = reviewDivContent
})