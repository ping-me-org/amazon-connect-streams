# 🎨 Logo Replacement Guide

This guide explains how to customize logos in your CCP-v2 interface.

## 📋 Current Implementation

### ✅ **Version**: v2.18.4-custom.2
- **Logo File**: `ping_q_logo.svg`
- **Target**: FlexVerticalCenterContainer and other Amazon/AWS logos
- **Method**: JavaScript replacement + CSS hiding

## 🔧 How It Works

### **1. CSS Logo Hiding**
```css
/* Hide default Amazon/AWS logos */
.amazon-logo, .aws-logo, [class*="amazon"], [class*="aws"], 
svg[class*="logo"], img[alt*="amazon" i], img[alt*="aws" i],
[class*="FlexVerticalCenterContainer"] svg {
  display: none !important;
}
```

### **2. JavaScript Logo Replacement**
- **replaceLogo()** function finds and replaces logos
- **MutationObserver** catches dynamically added logos
- **Multiple selectors** for comprehensive coverage

### **3. Target Selectors**
- `[class*="FlexVerticalCenterContainer"]` - Main target
- `svg[class*="logo"]` - SVG logos
- `img[alt*="amazon" i]` - Amazon images
- `img[alt*="aws" i]` - AWS images
- `.amazon-logo`, `.aws-logo` - Direct classes

## 🚀 Customizing Your Logo

### **1. Replace the Logo File**
```bash
# Replace with your logo
cp your-logo.svg packages/forge-tel/src/frontend/connect-phone/public/ping_q_logo.svg
```

### **2. Adjust Logo Dimensions**
Edit `src/custom-ccp-injector.js`:
```javascript
logoImg.style.cssText = `
  max-width: 150px !important;  // Adjust width
  max-height: 50px !important;  // Adjust height
  width: auto !important;
  height: auto !important;
`;
```

### **3. Change Logo Path**
If you want to use a different filename:
```javascript
logoImg.src = './your-custom-logo.svg';
```

### **4. Rebuild and Deploy**
```bash
cd /Users/chadcompton/dev/www/scorch/ping/external-repos/amazon-connect-streams
./update-custom-ccp.sh build deploy
```

## 🎯 Logo Specifications

### **Recommended Format**
- **File Type**: SVG (scalable, crisp)
- **Dimensions**: 120x40px (3:1 ratio)
- **Colors**: Should work on light backgrounds
- **File Size**: < 50KB for fast loading

### **Alternative Formats**
- PNG (with transparency)
- WebP (modern browsers)
- JPG (if no transparency needed)

## 🔍 Testing Logo Replacement

### **1. Browser Console**
Look for these messages:
```
✅ Custom logos replaced successfully
✅ Custom CCP styles injected successfully
```

### **2. Visual Inspection**
- Check FlexVerticalCenterContainer areas
- Look for your logo instead of Amazon/AWS branding
- Verify logo scales properly

### **3. Cross-Origin Issues**
If logos don't replace due to iframe restrictions:
- CSS hiding should still work
- Container styling will apply
- Check browser console for warnings

## 📝 Version History

### **v2.18.4-custom.2** (Current)
- ✅ Logo replacement functionality
- ✅ FlexVerticalCenterContainer targeting
- ✅ MutationObserver for dynamic content
- ✅ Multiple logo selector support

### **v2.18.4-custom.1**
- ✅ Basic custom styling
- ✅ Color-coded buttons
- ✅ Modern UI design

## 🆘 Troubleshooting

### **Logo Not Appearing**
1. Check file path: `./ping_q_logo.svg`
2. Verify file exists in public folder
3. Check browser console for errors
4. Test with different image format

### **Logo Too Large/Small**
1. Edit dimensions in `custom-ccp-injector.js`
2. Rebuild: `./update-custom-ccp.sh build deploy`
3. Clear browser cache

### **Cross-Origin Restrictions**
1. CSS hiding should still work
2. Some iframe content may be protected
3. Check console for specific errors

## 🔄 Publishing New Versions

### **After Making Changes**
```bash
# 1. Build and deploy
./update-custom-ccp.sh build deploy

# 2. Commit changes
git add .
git commit -m "Update logo customization"

# 3. Tag new version
git tag v2.18.4-custom.3
git push origin custom-styling
git push origin v2.18.4-custom.3

# 4. Update HTML comment
# Edit packages/forge-tel/src/frontend/connect-phone/public/index.html
```

## 📚 Related Files

- **Logo File**: `packages/forge-tel/src/frontend/connect-phone/public/ping_q_logo.svg`
- **Injector**: `src/custom-ccp-injector.js`
- **HTML**: `packages/forge-tel/src/frontend/connect-phone/public/index.html`
- **Build Script**: `update-custom-ccp.sh`
