// MAP
const map = L.map('map').setView([43.2389, 76.8897], 10); // Kazakhstan
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let selectedLat = null;
let selectedLng = null;

map.on('click', function (e) {
  selectedLat = e.latlng.lat;
  selectedLng = e.latlng.lng;
  alert("Location selected!");
});

// TEMP DATA STORAGE
let reports = [];

function addReport() {
  if (!selectedLat || !selectedLng) {
    alert("Please select location on map");
    return;
  }

  const report = {
    city: city.value,
    district: district.value,
    street: street.value,
    description: description.value,
    lat: selectedLat,
    lng: selectedLng,
    status: "published"
  };

  reports.push(report);
  renderReports();
  addMarker(report);
}

function renderReports() {
  const container = document.getElementById("reports");
  container.innerHTML = "";

  reports.forEach((r, i) => {
    container.innerHTML += `
      <div class="report status-${r.status}">
        <strong>${r.city}, ${r.street}</strong>
        <p>${r.description}</p>
        <p>Status: ${r.status}</p>
        <button onclick="takeTask(${i})">Take Task</button>
        <button onclick="cleanTask(${i})">Mark Cleaned</button>
      </div>
    `;
  });
}

function addMarker(report) {
  L.marker([report.lat, report.lng])
    .addTo(map)
    .bindPopup(`<b>${report.city}</b><br>${report.description}`);
}

function takeTask(i) {
  reports[i].status = "taken";
  renderReports();
}

function cleanTask(i) {
  reports[i].status = "cleaned";
  renderReports();
}
