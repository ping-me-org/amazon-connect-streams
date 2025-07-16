# 🎨 Custom Amazon Connect Streams for Ping

This is **ping-me-org**'s customized fork of [amazon-connect/amazon-connect-streams](https://github.com/amazon-connect/amazon-connect-streams) with enhanced styling and UI improvements.

## ✨ What's Different

- **Modern UI Design**: Professional gradient buttons and typography
- **Color-coded Actions**: Green accept, red reject, orange hold buttons
- **Enhanced UX**: Hover effects, smooth transitions, loading animations
- **Custom Styling Injection**: Automatically styles the CCP iframe
- **Responsive Design**: Mobile-friendly adjustments

## 🚀 Quick Start

### Use Pre-built Version
```html
<script src="https://github.com/ping-me-org/amazon-connect-streams/raw/custom-styling/release/connect-streams-min.js"></script>
```

### Build from Source
```bash
git clone https://github.com/ping-me-org/amazon-connect-streams.git
cd amazon-connect-streams
git checkout custom-styling
npm install
npm run build-streams
```

## 📖 Documentation

See [CUSTOM_STYLING_README.md](./CUSTOM_STYLING_README.md) for detailed documentation, customization examples, and maintenance instructions.

## 🔄 Staying Updated

This fork is regularly synced with the upstream Amazon Connect Streams repository to include the latest features and security updates.

Use the included `update-custom-ccp.sh` script for easy maintenance:
```bash
./update-custom-ccp.sh full  # Sync, build, and deploy
```

## 🏢 Organization

This repository is maintained by the **ping-me-org** organization for use in Ping's customer communication platform.

---

**Original Repository**: [amazon-connect/amazon-connect-streams](https://github.com/amazon-connect/amazon-connect-streams)  
**License**: Apache 2.0 (same as original)
