async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // or you could return an empty object, or handle the error in some other way
  }
}
async function getCommOld() {
  // let api = 'https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/commOldCatalog.json';
  let api = './data/commOldCatalog.json';
  return await fetchData(api);
}
async function getCommNew() {
  // let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/commNewCatalog.json";
  let api = './data/commNewCatalog.json';
  return await fetchData(api);
}
async function getItOld() {
  // let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/ITOldCatalog.json";
  let api = './data/ITOldCatalog.json';
  return await fetchData(api);
}
async function getItNew() {
  // let api = "https://raw.githubusercontent.com/Heavenlyaura/ensignTool/main/data/iTNewCatalog.json";
  let api = './data/ITOldCatalog.json';

  return await fetchData(api);
}

export { getCommNew, getCommOld, getItNew, getItOld }


