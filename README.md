# Melvin & Dad — GitHub Pages site

A responsive, accessible, static landing page for a child friendly ideas and games project. The hero uses the supplied co-founders artwork at `assets/co-founders.png`. The page uses scroll reveals, a subtle portrait drift, a fading hero headline, and a reading progress rail. Motion respects the reduced-motion preference.

## Preview locally

Open `index.html` in a browser. The page uses plain HTML, CSS and JavaScript; there is no build step or package installation.

## Artwork

The supplied illustration is stored as `assets/co-founders.png` and displayed in the hero. To replace it, upload the chosen artwork into `assets/` and update the hero `<img>` source and alt text in `index.html`.

## Make the idea form work safely

GitHub Pages serves static files. It cannot receive or privately store form submissions by itself. The Send button currently explains this and sends nothing. Before inviting children to use the form, an adult should choose and configure a private, adult-managed destination, check incoming ideas, and review that provider's privacy and retention settings.

For a simple setup, the adult can set `ADULT_EMAIL` in `script.js` to a monitored adult email address. The form then opens the visitor's email app with the idea filled in; the visitor still has to send it. This exposes the configured address in the page source, so use an address intended for public contact and let an adult supervise. For a private hosted form service, follow that service's instructions and replace the submit handler; never put secret API keys in this repository. Avoid collecting surnames, school, age, location, phone numbers, or other unnecessary details. Submissions are not displayed on the site.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new repository. For a personal site at `https://YOUR-USERNAME.github.io`, name it exactly `YOUR-USERNAME.github.io`. For a project URL, use any repository name; its site will live at `https://YOUR-USERNAME.github.io/REPOSITORY`.
2. Add these files and the `assets` folder to the repository's main branch. You can use GitHub's **Add file → Upload files** page or Git from your computer.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**. Choose the `main` branch and the `/(root)` folder, then select **Save**.
5. Wait for the Pages deployment to finish. The Pages settings will show the published URL. Open it on both a phone and computer to check the layout.
6. To update the site later, edit or upload the changed files to `main`; GitHub Pages publishes the update automatically.

GitHub Pages is public by default. Only publish content and contact details the family is comfortable making public. The page has no analytics or local submission storage.
