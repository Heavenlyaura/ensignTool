import { detailsComm2022, templateComm2022, templateComm2024, detailComm2024, templateIt2022, detailIt2022, templateIt2024, detailIt2024 } from "./template2.js"

document.addEventListener('DOMContentLoaded', () => {
  const catalog = localStorage.getItem('catalog')
  const degree = localStorage.getItem('degree')
  console.log(catalog)
  const gradDetails = document.querySelector('.gradDetails')
  const emailButton = document.querySelector('#viewEmail')
  const emailArea = document.querySelector('#emailArea')
  const copy = document.querySelector('#copy')
  copy.style.display = 'none'

  let details, template

  if (catalog === '2022' && degree === 'communication') {
    details = detailsComm2022()
    template = templateComm2022()
  } else if (catalog === '2024' && degree === 'communication') {
    details = detailComm2024()
    template = templateComm2024()
  } else if (catalog === '2022' && degree === 'information technology') {
    details = detailIt2022()
    template = templateIt2022()
  } else if (catalog === '2024' && degree === 'information technology') {
    details = detailComm2024()
    template = templateComm2024()
  }
  detailAndEmail(details, template)

  copy.addEventListener('click', copyToClipboard)

  function copyToClipboard() {
    const emailContent = document.getElementById('emailArea').innerText;
    const textarea = document.createElement('textarea');
    textarea.value = emailContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Email content copied to clipboard');
  }



  function detailAndEmail(catalogDetail, catalogTemplate) {
    const details = catalogDetail
    gradDetails.innerHTML = details
    emailButton.addEventListener('click', () => {
      const email = catalogTemplate
      emailArea.innerHTML = email
      copy.style.display = 'inline'
    })
  }
})