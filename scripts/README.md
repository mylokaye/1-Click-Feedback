# Scripts Directory

This directory contains utility scripts for setting up and managing the 1-Click Feedback System.

## Available Scripts

### setup.sh

Automated setup script that helps you get the project running quickly.

**What it does:**
- Checks Node.js and npm installation
- Installs project dependencies
- Creates `.env.local` from template
- Builds the project
- Provides next steps

**Usage:**
```bash
./scripts/setup.sh
```

**Requirements:**
- Node.js 18+
- npm 9+
- Bash shell

**When to use:**
- First time setup
- After cloning the repository
- When setting up on a new machine

## Creating New Scripts

If you need to add new scripts:

1. Create a new `.sh` file in this directory
2. Add a shebang at the top: `#!/bin/bash`
3. Make it executable: `chmod +x scripts/your-script.sh`
4. Document it in this README

## Troubleshooting

### Permission Denied

If you get a "Permission denied" error:
```bash
chmod +x scripts/setup.sh
```

### Script Not Found

Make sure you're in the project root:
```bash
cd /path/to/1-click
./scripts/setup.sh
```

### Build Fails

If the build fails during setup:
1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `rm -rf .next node_modules`
3. Reinstall: `npm install`
4. Try building manually: `npm run build`

## Alternative to Scripts

If you prefer not to use scripts:

**Manual setup:**
```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your credentials
npm run build
npm run dev
```

**Using npm scripts:**
```bash
npm run setup  # Runs setup.sh
npm run dev    # Start development server
npm run build  # Build for production
```

## Windows Users

If you're on Windows, you can:

1. Use Git Bash (recommended)
2. Use WSL (Windows Subsystem for Linux)
3. Or follow the manual setup steps above

## Support

For issues with scripts:
1. Check this README
2. Review [README.md](../README.md)
3. Check [QUICK_START.md](../QUICK_START.md)
