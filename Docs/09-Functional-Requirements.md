# Functional Requirements

Version: 0.1.0

Status: Draft

Owner: Founder

Last Updated: 2026-07-02

---

# Purpose

Acest document definește funcționalitățile pe care aplicația CareerOS trebuie să le implementeze în MVP.

---

# FR-001 Authentication

Descriere:

Utilizatorul trebuie să își poată crea un cont și autentifica.

Cerințe:

- Register
- Login
- Logout
- Forgot Password
- Email Verification

---

# FR-002 User Profile

Descriere:

Utilizatorul își poate completa și modifica profilul.

Date:

- Prenume
- Nume
- Email
- Țară
- Limbă
- Nivel experiență

---

# FR-003 Career Goal

Descriere:

Utilizatorul poate selecta un obiectiv profesional.

Exemple:

- Backend Developer
- Frontend Developer
- Data Analyst
- Product Manager

Reguli:

- Un singur Goal activ.
- Goal-ul poate fi schimbat.
- Schimbarea Goal-ului necesită regenerarea planului.

---

# FR-004 AI Assessment

Descriere:

Aplicația colectează informații despre utilizator.

Date colectate:

- experiență;
- competențe;
- timp disponibil;
- obiectiv;
- proiecte;
- studii.

Rezultat:

Career Blueprint.

---

# FR-005 Career Blueprint

Descriere:

AI generează un plan personalizat.

Planul conține:

- Milestones
- Tasks
- Durată estimată
- Career Score inițial

---

# FR-006 Daily Tasks

Descriere:

Utilizatorul primește task-uri zilnice.

Acțiuni:

- Completează task
- Amână task
- Reprogramează task

---

# FR-007 Progress

Descriere:

Aplicația urmărește progresul.

Se calculează:

- Progress Goal
- Progress Milestone
- Progress Task

---

# FR-008 AI Mentor

Descriere:

Utilizatorul poate comunica cu mentorul AI.

Mentorul poate:

- răspunde la întrebări;
- explica task-uri;
- oferi feedback;
- recomanda modificări.

---

# FR-009 Dashboard

Dashboard-ul trebuie să afișeze:

- Goal activ
- Career Score
- Progress
- Task-urile zilei
- Milestone curent
- Ultimele recomandări AI

---

# FR-010 Notifications

Utilizatorul primește notificări pentru:

- task-uri restante;
- milestone finalizat;
- plan actualizat.

---

# MVP Rule

Nicio funcționalitate nu se implementează dacă nu este definită în acest document.