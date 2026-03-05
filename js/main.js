// main.js
// Entry point. Fetches data then wires up all the UI pieces.

document.addEventListener('DOMContentLoaded', async function() {

  try {
    // grab all patients from the API
    const allPatients = await fetchPatients();

    // populate the left sidebar with the full list
    renderPatientList(allPatients);

    // focus on Jessica Taylor for the main content
    const jessica = getJessicaData(allPatients);

    // sort her diagnosis history so the chart goes oldest → newest
    const sortedHistory = sortHistory(jessica.diagnosis_history);

    // draw the BP chart
    buildBPChart(sortedHistory);

    // fill in the BP legend (uses most recent month)
    const latestEntry = sortedHistory[sortedHistory.length - 1];
    renderBPLegend(latestEntry);

    // fill vitals cards
    renderVitals(latestEntry);

    // diagnostic list table
    renderDiagnosticList(jessica.diagnostic_list);

    // lab results
    renderLabResults(jessica.lab_results);

    // right panel profile info
    renderProfile(jessica);

  } catch (err) {
    console.error('Something went wrong loading patient data:', err);

    // give the user a basic error message in the sidebar
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = `
      <li style="padding: 16px; color: #c0392b; font-size: .82rem; line-height: 1.5;">
        Could not load patient data.<br/>
        Please check your connection and try again.
      </li>
    `;
  }

});
