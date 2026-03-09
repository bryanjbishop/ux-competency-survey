# UX Competency Survey 2026

A comprehensive self-assessment tool for UX designers at FamilySearch, covering competencies from Intern through Senior (UX 4) levels.

## 🌐 Live Survey

**URL:** https://bryanjbishop.github.io/ux-competency-survey/

Share this link with team members to take the survey.

## 📋 Features

- **7 Core Competencies:**
  - Product Strategy (Before you work)
  - Craft and Quality (While you work)
  - Communication and Collaboration (Working together)
  - Action and Impact (Shipping)
  - Leveling Up Others (Internal influence)
  - Independence (Self-sufficiency)
  - Skill Development (Continuous learning)
  - Technical Fluency (Design-Engineering bridge) - *UX 2-4 only*

- **5 Experience Levels:**
  - Intern
  - UX 1 - Associate Designer
  - UX 2 - Junior Designer
  - UX 3 - Mid-Level Designer
  - UX 4 - Senior Designer

- **Results Dashboard** for managers with:
  - Individual and team analytics
  - CSV/PDF export
  - Filtering by designer and level
  - Visual score distributions

## 🚀 Deployment

### Quick Deploy
After making changes and committing to `main`:

```bash
./deploy.sh
```

This script automatically:
1. Checks for uncommitted changes
2. Merges `main` into `gh-pages`
3. Pushes to GitHub Pages
4. Switches you back to your original branch

### Manual Deploy
If you prefer manual deployment:

```bash
# Commit your changes to main
git add .
git commit -m "Your update message"
git push origin main

# Deploy to GitHub Pages
git checkout gh-pages
git merge main
git push origin gh-pages
git checkout main
```

Changes will be live at https://bryanjbishop.github.io/ux-competency-survey/ in 1-2 minutes.

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bryanjbishop/ux-competency-survey.git
   cd ux-competency-survey
   ```

2. **Open in browser:**
   ```bash
   open index.html
   ```

## 📁 Project Structure

```
ux-competency-survey-tailwind/
├── index.html           # Main survey interface
├── competencies.js      # Competency framework data
├── app.js              # Application logic
├── supabase-config.js  # Database configuration
├── deploy.sh           # Deployment script
└── README.md           # This file
```

## 🔐 Manager Access

Managers can access the results dashboard:
1. Click "Manager" button in top-right
2. Sign in with credentials
3. View team results and export data

## 🎨 Tech Stack

- **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
- **Database:** Supabase
- **Hosting:** GitHub Pages
- **Fonts:** Sora (Google Fonts)

## 📝 Updating Competencies

To update competency content:

1. Edit `competencies.js`
2. Follow the existing structure:
   ```javascript
   {
       id: "level_competency",
       competency: "Competency Name",
       title: "Competency Name (Context)",
       description: "Detailed description...",
       subCompetencies: [
           {
               id: "level-comp-01",
               fullText: "Full competency description",
               shortText: "Short summary",
               improvementResources: [
                   "Resource 1",
                   "Resource 2",
                   "Resource 3"
               ]
           }
       ]
   }
   ```
3. Commit and deploy using `./deploy.sh`

## 📊 Data Export

Managers can export results as:
- **CSV** - For spreadsheet analysis
- **PDF** - For reporting and documentation

## 🤝 Contributing

This project is maintained by the FamilySearch UX team. For questions or updates, contact the design leadership team.

## 📄 License

Internal FamilySearch project - 2026

---

**Built with 💙 by FamilySearch Design Team**
