Επισκόπηση
Εφαρμογή “Cat Cafe” με Node/Express backend και React/Vite frontend. Το backend χειρίζεται χρήστες, γάτες και κρατήσεις, ενώ το frontend παρέχει SPA πλοήγηση.

Προαπαιτούμενα
Node.js & npm

MongoDB (τοπική εγκατάσταση ή διαθέσιμο instance)

Προαιρετικά: nodemon για ανάπτυξη backend

Δομή έργου
backend/   -> API (Express, MongoDB)
frontend/  -> Πελάτης (React, Vite, TypeScript)
Ρύθμιση Backend
Εγκατάσταση

cd backend
npm install
Μεταβλητές περιβάλλοντος
Δημιουργήστε αρχείο .env με:

JWT_SECRET=<μυστικό JWT>
PORT=3000        # προεπιλογή 3000
Το JWT μυστικό απαιτείται για έλεγχο ταυτότητας
Το port μπορεί να παρακαμφθεί μέσω PORT

Βάση δεδομένων
Η σύνδεση γίνεται στο mongodb://localhost:27017/catCafeDB—προσαρμόστε τη διεύθυνση στο src/db.js αν χρειάζεται

Μετατροπές σχήματος (προαιρετικό)

npm run migrate:cat-image-url
```​:codex-file-citation[codex-file-citation]{line_range_start=6 line_range_end=10 path=backend/package.json git_url="https://github.com/Zozelle/final-project-cf/blob/main/backend/package.json#L6-L10"}​
Ανάπτυξη

npm run dev
Εκκινεί τον server με nodemon

Production

npm start
Εκτελεί node src/server.js για σταθερή λειτουργία

Ρύθμιση Frontend
Εγκατάσταση

cd frontend
npm install
Ανάπτυξη

npm run dev
Εκκινεί Vite development server

Build

npm run build
Εκτελεί TypeScript build και δημιουργεί παραγωγικό bundle στο dist/

Προεπισκόπηση

npm run preview
Εξυπηρετεί το παραγόμενο dist/ τοπικά για έλεγχο πριν το deploy

Deploy
Βεβαιωθείτε ότι η MongoDB είναι διαθέσιμη και ότι οι μεταβλητές περιβάλλοντος έχουν ρυθμιστεί.

Εκτελέστε npm run build στο frontend και ανεβάστε τον φάκελο dist/ σε οποιονδήποτε static web server (Nginx, AWS S3 κ.λπ.).

Στο backend, εκτελέστε npm start (κατά προτίμηση μέσω process manager όπως pm2).

Ρυθμίστε το frontend ώστε να καλεί το API του backend (π.χ. μέσω μεταβλητής περιβάλλοντος VITE_API_URL).
