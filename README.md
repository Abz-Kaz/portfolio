# Abdullah Kazmi's Portfolio Project 🚀

Welcome to your portfolio project! This template is built with a **React (Vite) frontend** and a **Node.js (Express) backend**. It has a premium, modern dark-themed UI with glassmorphism styling and custom animations. 

Crucially, this repository has been designed as a **learning playground** for you. The structure is simple, standard, and filled with empty slots and educational code comments so you can dive in and build it out yourself!

---

## 📁 Project Structure

```text
portfolio-abdullah-kazmi/
├── client/                  # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/      # React Components (Hero, About, Projects, Contact, Navbar)
│   │   ├── App.jsx          # Mounts and layouts components
│   │   ├── index.css        # The complete UI design styling & variables
│   │   └── main.jsx         # React entry point
│   ├── index.html           # Main HTML file (SEO meta-tags go here!)
│   └── package.json         # Frontend packages & scripts
│
├── server/                  # Backend (Node.js + Express)
│   ├── server.js            # Express server & API endpoints
│   ├── .env                 # Server configuration environment variables
│   └── package.json         # Backend packages & scripts
│
└── README.md                # This Guide
```

---

## ⚡ How to Run the Project

You can run both the frontend and backend simultaneously in two separate terminals.

### 1. Start the Backend (Node.js)
Open a terminal in the `server` directory and run:
```bash
npm run dev
```
*This starts the server on [http://localhost:5000](http://localhost:5000) using `nodemon`. The console will print log messages when endpoints are loaded or requested.*

### 2. Start the Frontend (React)
Open another terminal in the `client` directory and run:
```bash
npm run dev
```
*This starts the Vite React dev server on [http://localhost:5173](http://localhost:5173) (or another open port shown in the terminal). Open this URL in your web browser.*

---

## 🛠️ How It Works (Learning Reference)

### 1. Style Customizations (CSS)
All layouts, fonts, glassmorphism card designs, and gradients are declared in [`client/src/index.css`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/client/src/index.css). 
- We use custom CSS variables (`--primary`, `--secondary`, `--bg-main`) at the top of the file. You can change these colors to instantly change the theme of the entire website!

### 2. Data Fetching
In [`client/src/components/Projects.jsx`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/client/src/components/Projects.jsx), React uses the standard browser `fetch()` API during the `useEffect` hook to pull active projects from the backend `http://localhost:5000/api/projects`.
- If the backend is running, the page loads your projects dynamically.
- If the backend is offline, the React app automatically catches the error and falls back to displaying local offline mock projects.

### 3. Contact Form Submission
In [`client/src/components/Contact.jsx`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/client/src/components/Contact.jsx), submitting the contact form sends a `POST` request with the JSON payload containing the user's name, email, and message to the server (`/api/contact`).
- The backend in [`server/server.js`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/server/server.js) validates the fields and logs them to the terminal.

---

## 🎯 Next Steps & Challenges (Learn by Doing)

### 🏃 Challenge 1: Fill in Your Bio & Roles
- Open [`client/src/components/Hero.jsx`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/client/src/components/Hero.jsx) and replace the biography placeholder with a cool introduction. 
- You can also change the strings in the `roles` array (e.g. `['Student', 'Full-Stack Developer', 'Tech Enthusiast']`) to change the words in the typing animation!

### 🏃 Challenge 2: Edit Your Skills
- Open [`client/src/components/About.jsx`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/client/src/components/About.jsx) and modify the lists under `frontendSkills`, `backendSkills`, and `toolSkills`. Add the actual programming languages you want to learn or use!

### 🏃 Challenge 3: Modify Projects returned by Backend
- Open [`server/server.js`](file:///C:/Users/abdul/.gemini/antigravity/scratch/portfolio-abdullah-kazmi/server/server.js) and modify the items inside `initialProjects` with actual projects you want to build. When you refresh the React app, they will automatically update!

### 🏃 Challenge 4: Level Up with a Database (Advanced)
- Install a simple JSON-based file database (like `lowdb` or `sqlite3`) or connect a cloud database (like MongoDB).
- Instead of using the static `initialProjects` array in `server.js`, fetch the list from the database!
