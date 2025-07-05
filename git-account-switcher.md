# Git Account Switcher Reference

## SSH Hosts Configuration
- **Work Account**: `git@github.com:tonidome/repo.git`
- **Personal Account**: `git@github-personal:menektoni/repo.git`

## Setting Up a New Personal Repository
```bash
# 1. Initialize repository
git init

# 2. Set personal email for this repo
git config user.email "tonidome@gmail.com"
git config user.name "Toni Domene"

# 3. Add remote using personal SSH host
git remote add origin git@github-personal:menektoni/repository-name.git

# 4. Add, commit, and push
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Setting Up a New Work Repository
```bash
# 1. Initialize repository
git init

# 2. Set work email for this repo
git config user.email "toni@fence.finance"
git config user.name "Toni"

# 3. Add remote using default SSH host
git remote add origin git@github.com:tonidome/repository-name.git

# 4. Add, commit, and push
git add .
git commit -m "Initial commit"
git push -u origin main
```

## Checking Current Configuration
```bash
# Check current user config
git config user.email
git config user.name

# Check remote URLs
git remote -v

# Check SSH connection
ssh -T git@github.com          # Test work account
ssh -T git@github-personal     # Test personal account
```

## Quick Switch Commands
```bash
# Switch to personal account for current repo
git config user.email "tonidome@gmail.com"
git remote set-url origin git@github-personal:menektoni/repo-name.git

# Switch to work account for current repo  
git config user.email "toni@fence.finance"
git remote set-url origin git@github.com:tonidome/repo-name.git
```

## Directory Structure Recommendation
```
~/Code/
├── Work/           # Work repositories
│   ├── project1/
│   └── project2/
└── Personal/       # Personal repositories (like this one!)
    ├── to_table/
    └── other-projects/
``` 