# Private GitHub sync

Status: Local watcher and manual sync files are prepared. GitHub account verification, private repository creation, first push, and live test are pending.

The site starts at `index.html` and uses `css/`, `js/`, and `assets/`. It has no `package.json` or build step.

## Finish account setup

Sign in to the GitHub account linked to `mubin.works@gmail.com` yourself. Verify the username and email in GitHub Settings > Emails. Create repository `mubin-portfolio-2026` as **Private**, with README, .gitignore, and license unchecked. In this project folder run:

```powershell
git init -b main
git add -A
git commit -m "Initial private portfolio backup"
git remote add origin https://github.com/YOUR_VERIFIED_USERNAME/mubin-portfolio-2026.git
git push -u origin main
```

Replace `YOUR_VERIFIED_USERNAME` with the verified account username. Confirm the repo says Private and compare its files with this folder before relying on GitHub as backup.

## Daily sync

Double-click `start-auto-push.bat` after the first push. Keep its window open. It waits 30 seconds after the last save, commits changes with a timestamp, and pushes to `origin main`. Press Ctrl+C or close the window to stop. Start it again after a restart. `auto-push.log` records the result.

Double-click `sync.bat` for one manual sync. If the remote moved ahead, it tries pull with rebase and pushes again. A conflict stops the sync and writes an error. Neither script force-pushes.

Do not commit .env files, API keys, passwords, tokens, credentials, private keys, or ZIP backups. Review new files before syncing. The .gitignore excludes common secrets, dependencies, editor and OS files, and logs.

Connect Cloudflare Pages yourself later using this private repo and the `main` branch.
