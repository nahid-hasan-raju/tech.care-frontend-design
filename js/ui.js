// ui.js
// All the DOM-manipulation lives here.
// main.js calls these functions after data is fetched.

const MONTH_ORDER = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sort diagnosis history oldest → newest
function sortHistory(history) {
  return [...history].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return MONTH_ORDER.indexOf(a.month) - MONTH_ORDER.indexOf(b.month);
  });
}

// "1996-08-23" → "August 23, 1996"
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Returns the little up/down arrow + label for BP/vitals levels
function levelHTML(levelText) {
  if (!levelText) return '';

  const isHigher = levelText.toLowerCase().includes('higher');
  const isLower  = levelText.toLowerCase().includes('lower');

  let arrowSVG = '';

  if (isHigher) {
    arrowSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>`;
  } else if (isLower) {
    arrowSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>`;
  }

  return arrowSVG + levelText;
}

// Badge CSS class based on status string
function getBadgeClass(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('observation')) return 'badge badge-observation';
  if (s.includes('cured'))       return 'badge badge-cured';
  return 'badge badge-inactive';
}


// ── Render patient list in the sidebar ──
function renderPatientList(patients) {
  const ul = document.getElementById('patientList');
  ul.innerHTML = '';

  patients.forEach(patient => {
    const li = document.createElement('li');
    li.className = 'patient-row' + (patient.name === 'Jessica Taylor' ? ' active' : '');

    li.innerHTML = `
      <img
        src="${patient.profile_picture}"
        alt="${patient.name}"
        onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=D8FCF7&color=072635&size=80'"
      />
      <div class="info">
        <p class="name">${patient.name}</p>
        <p class="meta">${patient.gender}, ${patient.age}</p>
      </div>
      <span class="more">···</span>
    `;

    ul.appendChild(li);
  });
}


// ── Render blood pressure legend values ──
function renderBPLegend(latestEntry) {
  const sys = latestEntry.blood_pressure.systolic;
  const dia = latestEntry.blood_pressure.diastolic;

  document.getElementById('sysValue').textContent = sys.value;
  document.getElementById('diaValue').textContent = dia.value;

  document.getElementById('sysLevel').innerHTML = levelHTML(sys.levels);
  document.getElementById('diaLevel').innerHTML = levelHTML(dia.levels);
}


// ── Render the 3 vital stat cards ──
function renderVitals(latestEntry) {
  document.getElementById('respVal').textContent    = latestEntry.respiratory_rate.value;
  document.getElementById('respStatus').textContent = latestEntry.respiratory_rate.levels;

  document.getElementById('tempVal').textContent    = latestEntry.temperature.value;
  document.getElementById('tempStatus').textContent = latestEntry.temperature.levels;

  document.getElementById('heartVal').textContent   = latestEntry.heart_rate.value;
  document.getElementById('heartStatus').innerHTML  = levelHTML(latestEntry.heart_rate.levels);
}


// ── Render diagnostic list table ──
function renderDiagnosticList(diagnostics) {
  const tbody = document.getElementById('diagTableBody');

  if (!diagnostics || diagnostics.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" class="table-loading">No diagnostic data found.</td></tr>';
    return;
  }

  tbody.innerHTML = diagnostics.map(item => `
    <tr>
      <td style="font-weight: 600;">${item.name}</td>
      <td style="color: #555;">${item.description}</td>
      <td><span class="${getBadgeClass(item.status)}">${item.status}</span></td>
    </tr>
  `).join('');
}


// ── Render lab results list ──
function renderLabResults(labs) {
  const ul = document.getElementById('labList');

  if (!labs || labs.length === 0) {
    ul.innerHTML = '<li>No lab results available.</li>';
    return;
  }

  ul.innerHTML = labs.map(labName => `
    <li>
      <span>${labName}</span>
      <span class="lab-download" title="Download">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </span>
    </li>
  `).join('');
}


// ── Render right-side patient profile ──
function renderProfile(patient) {
  document.getElementById('patientPhoto').src       = patient.profile_picture;
  document.getElementById('patientName').textContent = patient.name;

  // Build the info items
  const infoItems = [
    {
      icon: calendarIcon(),
      label: 'Date Of Birth',
      value: formatDate(patient.date_of_birth)
    },
    {
      icon: genderIcon(),
      label: 'Gender',
      value: patient.gender
    },
    {
      icon: phoneIcon(),
      label: 'Contact Info.',
      value: patient.phone_number
    },
    {
      icon: phoneIcon(),
      label: 'Emergency Contacts',
      value: patient.emergency_contact
    },
    {
      icon: shieldIcon(),
      label: 'Insurance Provider',
      value: patient.insurance_type
    }
  ];

  const ul = document.getElementById('infoList');
  ul.innerHTML = infoItems.map(item => `
    <li class="info-item">
      <div class="info-icon">${item.icon}</div>
      <div class="info-text">
        <p class="label">${item.label}</p>
        <p class="value">${item.value}</p>
      </div>
    </li>
  `).join('');
}


// little SVG helpers so the HTML stays clean
function calendarIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>`;
}

function genderIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M6 20v-1a6 6 0 0112 0v1"/>
  </svg>`;
}

function phoneIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>`;
}

function shieldIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>`;
}
