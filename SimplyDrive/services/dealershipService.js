import { devEnvConstants } from "../constants/devEnvConstants.js";

export async function getDealerships() {
  const url = `https://api.simplydrive.app/Api/Dealership/RetrieveDealershipData?dealerID=${devEnvConstants.testDealerID}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return await response.json();
}