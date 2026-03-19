const express = require("express");
const cors = require("cors");
const jobs = require("./jobs.json");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let profiles = [];
let events = [];
let applications = [];

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(user);
  res.json({ message: "Usuario registrado correctamente", user });
});

app.post("/profile", (req, res) => {
  const { userId, city, modality, seniority, skills } = req.body;

  if (!userId || !city || !modality || !seniority || !skills) {
    return res.status(400).json({ message: "Faltan datos del perfil" });
  }

  const profile = {
    userId,
    city,
    modality,
    seniority,
    skills
  };

  profiles.push(profile);
  res.json({ message: "Perfil guardado", profile });
});

app.post("/recommend", (req, res) => {
  const { userId } = req.body;

  const profile = profiles.find((p) => p.userId == userId);

  if (!profile) {
    return res.status(404).json({ message: "Perfil no encontrado" });
  }

  const recommendations = jobs.map((job) => {
    const matches = job.skills.filter((s) => profile.skills.includes(s)).length;
    const skillsScore = (matches / job.skills.length) * 50;

    let modalityScore = 0;
    if (profile.modality === job.modality) {
      modalityScore = 20;
    } else if (
      profile.modality === "Remoto" &&
      (job.modality === "Remoto" || job.modality === "Híbrido")
    ) {
      modalityScore = 20;
    } else {
      modalityScore = 10;
    }

    let seniorityScore = profile.seniority === "Junior" ? 20 : 10;

    let recencyScore = job.days < 7 ? 10 : 6;

    const total = Math.round(
      skillsScore + modalityScore + seniorityScore + recencyScore
    );

    return {
      ...job,
      score: total,
      breakdown: {
        skills: Math.round(skillsScore),
        modality: modalityScore,
        seniority: seniorityScore,
        recency: recencyScore
      },
      reasons: [
        "Coincide con tus habilidades",
        "Cumple con tu modalidad preferida",
        "La vacante fue publicada recientemente"
      ]
    };
  });

  recommendations.sort((a, b) => b.score - a.score);

  res.json(recommendations);
});

app.post("/event", (req, res) => {
  const { userId, jobId, type } = req.body;

  const event = {
    id: events.length + 1,
    userId,
    jobId,
    type
  };

  events.push(event);
  res.json({ message: "Evento guardado", event });
});

app.post("/apply", (req, res) => {
  const { userId, jobId } = req.body;

  const application = {
    id: applications.length + 1,
    userId,
    jobId,
    status: "En revisión"
  };

  applications.push(application);

  events.push({
    id: events.length + 1,
    userId,
    jobId,
    type: "APPLY"
  });

  res.json({ message: "Postulación registrada", application });
});

app.get("/applications", (req, res) => {
  res.json(applications);
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});