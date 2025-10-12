# Prompt Context Builder

A lightweight web application that helps you **design structured AI prompts** with reusable templates, clear sections, and customizable presets. It eliminates “vibe coding” by guiding you through well-defined prompt components like Role, Objective, Instructions, Context, and Output formatting.

---

## 🚀 Features

* 🧩 **Structured Prompt Sections** — Input clear roles, objectives, constraints, and output formats.
* 🎨 **Custom UI & Animations** — Modern, responsive design with dynamic floating orbs and soft gradients.
* ⚡ **Preset System** — Quickly load pre-defined prompt templates for roles like:

  * AI Career Coach
  * UX Writer for App Notifications
  * AI Health & Wellness Coach
  * Spanish Language Tutor
  * AI Startup Advisor
* 📋 **One-Click Copy** — Instantly copy your fully formatted prompt to the clipboard.
* ♿ **Accessible Design** — ARIA-compliant forms and keyboard-navigable custom select menus.
* 💡 **No Build Step Needed** — Runs directly in the browser; just open `index.html`.

---

## 🧠 How It Works

The app uses vanilla **HTML, CSS, and JavaScript** to create an interactive prompt-building interface.

1. **Select a Preset**
   Choose from pre-loaded prompt templates or start from scratch.

2. **Fill In Fields**
   Enter custom text for Role, Objective, Instructions, Context, etc.

3. **Generate Prompt**
   Click **Copy Prompt To Clipboard** — your prompt is formatted into a markdown-ready structure for AI models.

---

## 📁 Project Structure

```
.
├── index.html       # Main app UI
├── app.js           # Application logic and preset management
├── style.css        # Styling, animations, and responsive layout
└── .gitignore       # Ignores tempDevDocs/ folder
```

---

## 🛠️ Installation & Usage

No build process required.
Simply clone the repo and open the HTML file in your browser.

```bash
git clone https://github.com/yourusername/prompt-context-builder.git
cd prompt-context-builder
open index.html
```

Or double-click `index.html` to launch locally.

---

## 🧩 Technologies Used

* **HTML5** — Semantic layout and accessibility
* **CSS3** — Custom gradients, glassmorphism, and floating animations
* **Vanilla JavaScript (ES6)** — State management, preset hydration, clipboard API
* **ARIA Roles & Keyboard Events** — Accessibility and UX polish

---

## 🥺 Development Notes

* No external dependencies or frameworks.
* Clipboard copy uses the modern `navigator.clipboard` API with fallback support.
* Custom select dropdown is built manually for better design control and accessibility.
* Works offline — no network dependencies.

---

## 🌈 Preview

![Prompt Context Builder Screenshot](https://via.placeholder.com/1200x600?text=Prompt+Context+Builder)

---

## 📜 License

MIT License © 2025 — Jeff Balagosa

---

## 💬 Credits

Designed and developed with ✨ clarity and structure in mind — to make **AI prompt engineering predictable, reusable, and effective**.
