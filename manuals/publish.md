# Publishing Guide for @wolfgangspahn/solidjs-charts

This guide outlines the complete process for publishing the SolidJS Charts library to npm.

## Prerequisites

### 1. NPM Account Setup
- Create an account at [npmjs.com](https://www.npmjs.com/)
- Verify your email address
- Enable two-factor authentication (recommended)

### 2. Local NPM Authentication
```bash
npm login
# Follow the prompts to authenticate with your npm account
```

### 3. Verify NPM Configuration
```bash
npm whoami
# Should display your npm username
```

## Pre-Publishing Checklist

### 1. Code Quality & Testing
```bash
# Run tests to ensure everything works
npm test

# Lint the codebase
npm run lint

# Build the library
npm run build
```

### 2. Version Management
```bash
# Check current version
npm version

# Bump version (choose one):
npm version patch    # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor    # 1.0.0 -> 1.1.0 (new features)
npm version major    # 1.0.0 -> 2.0.0 (breaking changes)
```

### 3. Verify Package Contents
```bash
# Preview what will be published
npm pack --dry-run

# Check package contents
tar -tzf *.tgz
```

### 4. Test Installation Locally
```bash
# Create a test directory
mkdir test-install && cd test-install
npm init -y

# Install your local package
npm install ../solidjs-charts

# Test import
echo "import { Chart } from '@wolfgangspahn/solidjs-charts';" > test.js
```

## Publishing Process

### 1. Final Build
```bash
# Ensure clean build
rm -rf dist/
npm run build
```

### 2. Commit Final Changes
```bash
git add .
git commit -m "chore: prepare for v$(npm pkg get version | tr -d '"') release"
git push origin main
```

### 3. Create Git Tag
```bash
# Tag the release
git tag v$(npm pkg get version | tr -d '"')
git push origin --tags
```

### 4. Publish to NPM
```bash
# Publish the package
npm publish

# For scoped packages (first time), you may need:
npm publish --access public
```

## Post-Publishing Tasks

### 1. Verify Publication
```bash
# Check if package exists
npm view @wolfgangspahn/solidjs-charts

# Test installation from npm
npm install @wolfgangspahn/solidjs-charts
```

### 2. Update Documentation
- Update README.md with new version info
- Create GitHub release notes
- Update CHANGELOG.md if it exists

### 3. Demo Deployment (Optional)
```bash
# Build and deploy the demo to GitHub Pages
cd dev/
npm run build
# Deploy dist/ to gh-pages branch
```

## Package Configuration Summary

The package is already configured with:

### package.json Key Settings
```json
{
  "name": "@wolfgangspahn/solidjs-charts",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.umd.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md", "LICENSE"],
  "publishConfig": {
    "access": "public"
  }
}
```

### Build Outputs
- `dist/index.esm.js` - ES Modules build (12.59 kB)
- `dist/index.umd.js` - UMD build (8.73 kB)
- `dist/index.d.ts` - TypeScript declarations
- Complete TypeScript declaration maps

### Excluded from Package (.npmignore)
- `dev/` - Demo application
- `src/` - Source code (only dist/ is published)
- `tests/` - Test files
- Development configuration files
- Node modules and build artifacts

## Troubleshooting

### Common Issues

#### 1. Authentication Errors
```bash
# Re-authenticate
npm logout
npm login
```

#### 2. Package Name Conflicts
- Scoped packages avoid conflicts: `@wolfgangspahn/solidjs-charts`
- Check availability: `npm view @wolfgangspahn/solidjs-charts`

#### 3. Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 4. Version Conflicts
```bash
# Check current published version
npm view @wolfgangspahn/solidjs-charts version

# Ensure local version is higher
npm version patch
```

## Automated Publishing (GitHub Actions)

Consider setting up automated publishing with GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish to NPM
on:
  push:
    tags: [ 'v*' ]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Quick Publishing Commands

For experienced users, here's the condensed version:

```bash
# 1. Pre-publish
npm test && npm run build && npm version patch

# 2. Commit and tag
git add . && git commit -m "chore: release v$(npm pkg get version | tr -d '"')" && git push
git tag v$(npm pkg get version | tr -d '"') && git push --tags

# 3. Publish
npm publish

# 4. Verify
npm view @wolfgangspahn/solidjs-charts
```

---

**Note**: This package is ready for publishing. All configuration is complete, documentation is comprehensive, and the build system produces optimized bundles with TypeScript support.