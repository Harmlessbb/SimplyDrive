export async function getBayData() {
  const url = "https://api.simplydrive.app/Api/Dealership/RetrieveBays?dealerID=1";

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  const responseJson = await response.json(); 
  console.log(responseJson); 
  return responseJson;
}