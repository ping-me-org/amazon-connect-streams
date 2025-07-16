# 🔄 Upgrade Guide for Custom Amazon Connect Streams

This guide helps you upgrade your custom CCP when Amazon releases new versions.

## 📋 Current Version Status

- **Your Custom Version**: v2.18.4-custom.1
- **Based on Amazon Version**: v2.18.4 (Latest Stable ✅)
- **Last Updated**: July 16, 2025

## 🚀 How to Upgrade

### 1. Check for New Amazon Releases
```bash
# Check latest releases
gh api repos/amazon-connect/amazon-connect-streams/releases/latest

# Or visit: https://github.com/amazon-connect/amazon-connect-streams/releases
```

### 2. Upgrade Process
When a new version is available (e.g., v2.18.5):

```bash
cd /Users/chadcompton/dev/www/scorch/ping/external-repos/amazon-connect-streams

# Sync with upstream and upgrade
./update-custom-ccp.sh sync

# Build and deploy
./update-custom-ccp.sh build deploy

# Tag your new custom version
git tag v2.18.5-custom.1
git push origin v2.18.5-custom.1
```

### 3. Update Project Documentation
Update the version comment in your HTML file:
```html
<!-- Custom build v2.18.5-custom.1 from ping-me-org/amazon-connect-streams -->
```

## 📝 Version Naming Convention

- **Format**: `v{AMAZON_VERSION}-custom.{CUSTOM_BUILD}`
- **Examples**:
  - `v2.18.4-custom.1` - First custom build based on Amazon v2.18.4
  - `v2.18.4-custom.2` - Second custom build (if you make changes)
  - `v2.18.5-custom.1` - First custom build based on Amazon v2.18.5

## 🔍 Testing After Upgrade

1. **Build Test**: Ensure the build completes without errors
2. **Functionality Test**: Test basic CCP functionality
3. **Styling Test**: Verify custom styles are still applied
4. **Integration Test**: Test with your Forge app

## 📚 Release Notes

### v2.18.4-custom.1 (Current)
- Based on Amazon Connect Streams v2.18.4
- Custom styling injection for modern UI
- Color-coded action buttons
- Enhanced UX with hover effects
- Responsive design improvements

## �� Troubleshooting

### Build Fails
```bash
# Clean and rebuild
rm -rf node_modules release
npm install
npm run build-streams
```

### Styles Not Working
- Check console for injection errors
- Verify iframe permissions
- Test container styling (should always work)

### Merge Conflicts
```bash
# If conflicts during sync
git status
# Resolve conflicts in your custom files
git add .
git rebase --continue
```

## 📞 Support

- **Repository**: https://github.com/ping-me-org/amazon-connect-streams
- **Issues**: Create GitHub issues for problems
- **Documentation**: See CUSTOM_STYLING_README.md
