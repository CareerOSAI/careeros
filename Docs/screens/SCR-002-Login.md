# SCR-002 - Login

Version: 0.1.0

Status: Draft

Owner: Founder

Last Updated: 2026-07-02

---

# Purpose

Permite autentificarea utilizatorului în aplicația CareerOS.

După autentificare, utilizatorul este redirecționat către Dashboard.

---

# URL

/login

---

# Components

## LOGO

Logo CareerOS.

Click → Landing Page.

---

## Title

Welcome Back

---

## Subtitle

Sign in to continue your career journey.

---

## Login Form

Conține:

Email

Password

Remember Me

Forgot Password

Login Button

---

# Validation

Email:

- obligatoriu
- format valid

Password:

- obligatorie
- minim 8 caractere

---

# Buttons

## Login

Acțiune:

Autentifică utilizatorul.

Dacă datele sunt valide →

Dashboard.

---

## Forgot Password

Acțiune:

Merge la:

/forgot-password

---

## Create Account

Acțiune:

Merge la:

/register

---

# Errors

Email inexistent.

Parolă greșită.

Cont neverificat.

Server indisponibil.

---

# Loading State

Butonul Login devine disabled.

Se afișează spinner.

---

# Success

Redirect:

/dashboard

---

# Security

Parola nu este afișată.

Rate limiting pentru încercări multiple.

Session securizat.

---

# Analytics

Evenimente:

login_started

login_success

login_failed

forgot_password_clicked