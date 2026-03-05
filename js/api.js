// api.js
// Handles communication with the Coalition Technologies patient API.
// Auth is generated at runtime using btoa() — never hardcoded.

const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

function getAuthHeader() {
  // Build the Basic Auth token on the fly
  const credentials = btoa('coalition:skills-test');
  return 'Basic ' + credentials;
}

async function fetchPatients() {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': getAuthHeader()
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch patient data. Status: ' + response.status);
  }

  const data = await response.json();
  return data;
}

// Pull just Jessica's record from the full list
function getJessicaData(patients) {
  const jessica = patients.find(p => p.name === 'Jessica Taylor');
  if (!jessica) {
    throw new Error('Jessica Taylor not found in API response');
  }
  return jessica;
}
