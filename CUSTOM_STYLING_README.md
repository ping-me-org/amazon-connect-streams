# Custom Amazon Connect Streams with Styling

This is a customized fork of [amazon-connect/amazon-connect-streams](https://github.com/amazon-connect/amazon-connect-streams) that includes custom styling capabilities for the CCP (Contact Control Panel) interface.

## 🎨 Features

### Custom Styling Capabilities
- **Modern UI Design**: Professional gradient buttons and modern typography
- **Color-coded Actions**: 
  - 🟢 Green accept buttons
  - 🔴 Red reject/end call buttons  
  - 🟠 Orange hold buttons
  - ⚪ Gray mute buttons
- **Enhanced UX**: Hover effects, smooth transitions, and loading animations
- **Responsive Design**: Mobile-friendly adjustments
- **Custom Scrollbars**: Styled scrollbars for better visual consistency

### Technical Implementation
- **CSS Injection**: Automatically injects custom styles into CCP iframe
- **Container Styling**: Applies styling to the parent container
- **Cross-origin Safe**: Handles iframe restrictions gracefully
- **Webpack Integration**: Built into the streams library bundle

## 🚀 Quick Start

### 1. Use Pre-built Version
The easiest way is to use the pre-built `connect-streams-min.js` file from the `release/` directory:

```html
<script src="./connect-streams-min.js"></script>
```

### 2. Build from Source
```bash
# Clone this repository
git clone https://github.com/ping-me-org/amazon-connect-streams.git
cd amazon-connect-streams

# Switch to custom styling branch
git checkout custom-styling

# Install dependencies
npm install

# Build custom version
npm run build-streams
```

## 🔧 Customization

### Modifying Styles
Edit `src/custom-ccp-styles.css` to customize the appearance:

```css
/* Example: Change button colors */
.ccp-button.accept {
  background: linear-gradient(135deg, #your-color 0%, #your-color-dark 100%) !important;
}
```

### Adding New Styles
Modify `src/custom-ccp-injector.js` to add new styling logic:

```javascript
function getCustomCSS() {
  return `
    /* Your custom CSS here */
    .your-custom-class {
      /* styles */
    }
  `;
}
```

## 🔄 Staying Up-to-Date

### Using the Update Script
Use the provided `update-custom-ccp.sh` script:

```bash
# Complete update cycle (sync, build, deploy)
./update-custom-ccp.sh full

# Just rebuild after making changes
./update-custom-ccp.sh build

# Check current status
./update-custom-ccp.sh status
```

### Manual Updates
1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master
   git checkout custom-styling
   git rebase master
   ```

2. **Rebuild**:
   ```bash
   npm run build-streams
   ```

3. **Deploy to your project**:
   ```bash
   cp release/connect-streams-min.js /path/to/your/project/
   ```

## 📁 File Structure

```
src/
├── custom-ccp-styles.css      # CSS styles for CCP
├── custom-ccp-injector.js     # Style injection logic
└── core.js                    # Modified to include styling
webpack/
└── connect-streams.config.js  # Updated webpack config
release/
├── connect-streams.js         # Unminified build
└── connect-streams-min.js     # Minified build (use this)
```

## 🎯 Usage in Your Project

### Basic Setup
```javascript
// Initialize CCP with custom styling
connect.core.initCCP(containerDiv, {
  ccpUrl: 'https://your-instance.awsapps.com/connect/ccp-v2/',
  // ... other options
});

// Custom styles will be automatically applied
```

### Advanced Configuration
```javascript
// Access the style injector directly
if (window.CCPStyleInjector) {
  // Apply custom container styling
  window.CCPStyleInjector.styleContainer(containerDiv);
  
  // Get the CSS string for debugging
  console.log(window.CCPStyleInjector.getCustomCSS());
}
```

## 🐛 Troubleshooting

### Styles Not Applying
- **Cross-origin restrictions**: Some styling may not work due to iframe security
- **Check console**: Look for styling injection success/failure messages
- **Container styling**: Even if iframe styling fails, container styling should work

### Build Issues
- **Node version**: Ensure you're using Node.js 12+
- **Dependencies**: Run `npm install` to ensure all dependencies are installed
- **Clean build**: Delete `node_modules` and `release/` then rebuild

## 📝 Customization Examples

### Change Color Scheme
```css
/* Blue theme */
.ccp-button {
  background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%) !important;
}

/* Dark theme */
.ccp-container {
  background-color: #2d3748 !important;
  color: #e2e8f0 !important;
}
```

### Add Company Branding
```css
.ccp-header::before {
  content: "Your Company Name";
  font-weight: bold;
  margin-right: 10px;
}
```

## 🔗 Links

- **Original Repository**: [amazon-connect/amazon-connect-streams](https://github.com/amazon-connect/amazon-connect-streams)
- **Your Fork**: [ping-me-org/amazon-connect-streams](https://github.com/ping-me-org/amazon-connect-streams)
- **Custom Branch**: [custom-styling](https://github.com/ping-me-org/amazon-connect-streams/tree/custom-styling)

## 📄 License

This project maintains the same Apache 2.0 license as the original Amazon Connect Streams library.
