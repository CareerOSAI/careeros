# Domain Model

Version: 0.1.0

Status: Draft

Owner: Founder

---

# Purpose

Acest document definește toate entitățile principale din CareerOS.

Orice tabel din baza de date, orice API și orice componentă din aplicație trebuie să provină din aceste entități.

Dacă o entitate nu există aici, ea nu trebuie implementată.

---

# Core Domains

CareerOS este format din următoarele domenii:

1. Identity
2. Career Planning
3. Learning
4. AI Mentor
5. Progress
6. Jobs
7. Analytics

MVP-ul va implementa doar primele cinci domenii.

---

# Entity: User

Reprezintă persoana care utilizează CareerOS.

Atribute principale:

- id
- email
- firstName
- lastName
- timezone
- language
- createdAt

Responsabilități:

- deține obiective
- deține progres
- comunică cu AI-ul

---

# Entity: Career Goal

Reprezintă obiectivul profesional principal.

Exemple:

Backend Developer

Data Analyst

UX Designer

Product Manager

Un utilizator poate avea mai multe obiective în timp.

La un moment dat doar unul este activ.

---

# Entity: Assessment

Evaluarea inițială.

Conține informații precum:

- experiență
- competențe
- timp disponibil
- nivel actual
- obiectiv

Assessment-ul este punctul de plecare pentru plan.

---

# Entity: Career Blueprint

Planul complet generat pentru utilizator.

Conține:

- milestones
- estimări
- ordine
- recomandări

Este unic pentru fiecare utilizator.

---

# Entity: Milestone

O etapă importantă.

Exemple:

Learn Git

Learn SQL

Create Portfolio

Prepare Interview

---

# Entity: Task

Cea mai mică unitate executabilă.

Exemple:

Rezolvă 5 exerciții.

Construiește un API.

Citește capitolul 3.

Task-urile trebuie să fie clare și măsurabile.

---

# Entity: Daily Plan

Lista de task-uri pentru o zi.

Se generează automat.

Poate fi regenerată.

---

# Entity: Progress

Reprezintă evoluția utilizatorului.

Conține:

- task progress
- milestone progress
- blueprint progress
- goal progress

---

# Entity: Career Score

Scor intern.

Nu reprezintă doar progresul.

Reprezintă nivelul de pregătire pentru obiectiv.

Career Score poate scădea.

---

# Entity: AI Conversation

Memoria conversațiilor dintre utilizator și mentor.

Nu toate mesajele sunt importante.

CareerOS extrage informațiile relevante și le păstrează.

---

# Entity Relationships

User

↓

Career Goal

↓

Assessment

↓

Blueprint

↓

Milestones

↓

Tasks

↓

Progress

↓

Career Score