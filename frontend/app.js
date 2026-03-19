let currentUserId = null;

async function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  document.getElementById("registerMsg").innerText = data.message;

  if (data.user) {
    currentUserId = data.user.id;
  }
}

async function saveProfile() {
  const city = document.getElementById("city").value;
  const modality = document.getElementById("modality").value;
  const seniority = document.getElementById("seniority").value;
  const skills = document.getElementById("skills").value.split(",");

  const res = await fetch("http://localhost:3001/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: currentUserId,
      city,
      modality,
      seniority,
      skills
    })
  });

  const data = await res.json();
  document.getElementById("profileMsg").innerText = data.message;
}

async function getRecommendations() {
  const res = await fetch("http://localhost:3001/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: currentUserId })
  });

  const data = await res.json();
  const container = document.getElementById("recommendations");
  container.innerHTML = "";

  data.forEach((job) => {
    container.innerHTML += `
      <div class="card">
        <h3>${job.title}</h3>
        <p><b>Empresa:</b> ${job.company}</p>
        <p><b>Score:</b> ${job.score}</p>
        <p><b>Desglose:</b></p>
        <ul>
          <li>Skills: ${job.breakdown.skills}/50</li>
          <li>Modalidad: ${job.breakdown.modality}/20</li>
          <li>Seniority: ${job.breakdown.seniority}/20</li>
          <li>Recencia: ${job.breakdown.recency}/10</li>
        </ul>
        <p><b>Razones:</b> ${job.reasons.join(", ")}</p>
        <button onclick="applyJob(${job.id})">Postular</button>
      </div>
    `;
  });
}

async function applyJob(jobId) {
  const res = await fetch("http://localhost:3001/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: currentUserId, jobId })
  });

  const data = await res.json();
  alert(data.message);
}

async function loadApplications() {
  const res = await fetch("http://localhost:3001/applications");
  const data = await res.json();

  const container = document.getElementById("applications");
  container.innerHTML = "";

  data.forEach((app) => {
    container.innerHTML += `
      <div class="card">
        <p><b>Postulación #${app.id}</b></p>
        <p>Vacante ID: ${app.jobId}</p>
        <p>Estado: ${app.status}</p>
      </div>
    `;
  });
}