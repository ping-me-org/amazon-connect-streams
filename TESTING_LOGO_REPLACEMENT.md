# 🧪 Testing Logo Replacement

## 📋 Version: v2.18.4-custom.3

### ✅ **What Changed**
- **Embedded SVG**: Logo is now embedded directly in JavaScript (no external file dependency)
- **Data URLs**: CSS uses base64-encoded SVG for cross-origin compatibility
- **Enhanced Debugging**: Detailed console logging to track replacement process
- **Universal Replacement**: Targets all SVG elements in the CCP iframe

## 🔍 **How to Test**

### **1. Open Browser Developer Tools**
- Press `F12` or right-click → "Inspect"
- Go to the **Console** tab

### **2. Load Your CCP Interface**
- Navigate to your Connect phone interface
- Wait for the CCP iframe to load

### **3. Check Console Messages**
Look for these debug messages:
```
🔍 Starting logo replacement...
🔍 Found potential logo elements: [array of elements]
🔍 Found flex containers: [number]
🔍 Processing container 0: [class name]
🔍 Found [number] SVGs in container 0
🗑️ Removing SVG: [svg element]
✅ Added custom logo to container 0
🔍 Found total SVGs: [number]
🔍 SVG 0: [svg content preview]
✅ Replaced SVG 0 with custom logo
✅ Custom logos replaced successfully
✅ Custom CCP styles injected successfully
```

### **4. Visual Verification**
- Look for the **blue Ping logo** instead of Amazon branding
- Check multiple areas of the CCP interface
- Verify logo scales properly and is visible

## 🚨 **Troubleshooting**

### **If You See Cross-Origin Errors**
```
⚠️ Could not inject custom styles into CCP iframe (cross-origin restriction)
```
This is **expected** for some Connect instances. The CSS fallback should still work.

### **If No Console Messages Appear**
1. **Check file version**: Ensure you're using v2.18.4-custom.3
2. **Clear browser cache**: Hard refresh with `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. **Check file size**: The new file should be ~643KB

### **If Logo Doesn't Appear**
1. **Check CSS fallback**: Even if JavaScript fails, CSS should hide Amazon logos
2. **Inspect elements**: Right-click on logo areas and check if custom CSS is applied
3. **Check data URL**: Verify the base64 SVG data is loading

## 📊 **Expected Results**

### **✅ Success Indicators**
- Console shows "Custom logos replaced successfully"
- Blue Ping logo visible in CCP interface
- No Amazon/AWS branding visible
- Logo scales properly in different screen sizes

### **⚠️ Partial Success**
- Console shows cross-origin warnings BUT
- Amazon logos are hidden (CSS working)
- Some areas may still show Amazon branding

### **❌ Failure Indicators**
- No console messages at all
- Amazon branding still fully visible
- JavaScript errors in console

## 🔧 **Manual Testing Steps**

### **1. Element Inspection**
```javascript
// Run in browser console to check for custom elements
document.querySelectorAll('.ping-custom-logo').length
// Should return > 0 if replacement worked
```

### **2. SVG Detection**
```javascript
// Check if SVGs are hidden
document.querySelectorAll('svg').length
// Lower number = more SVGs hidden/replaced
```

### **3. CSS Verification**
```javascript
// Check if custom CSS is applied
getComputedStyle(document.querySelector('[class*="FlexVerticalCenterContainer"]')).backgroundImage
// Should contain 'data:image/svg+xml' if CSS is working
```

## 📝 **Test Results Template**

```
Date: ___________
Version: v2.18.4-custom.3
Browser: ___________
Connect Instance: ___________

Console Messages:
[ ] ✅ Custom logos replaced successfully
[ ] ✅ Custom CCP styles injected successfully
[ ] ⚠️ Cross-origin warnings (expected)

Visual Results:
[ ] Ping logo visible
[ ] Amazon logos hidden
[ ] Logo scales properly
[ ] No layout issues

Issues Found:
___________________________________________
___________________________________________
```

## 🔄 **Next Steps If Issues Found**

1. **Document the issue** with screenshots
2. **Check browser compatibility** (try different browsers)
3. **Test on different Connect instances** (if available)
4. **Report findings** for further customization

## 📚 **Related Files**

- **Source**: `/Users/chadcompton/dev/www/scorch/ping/external-repos/amazon-connect-streams/src/custom-ccp-injector.js`
- **Built**: `packages/forge-tel/src/frontend/connect-phone/public/connect-streams-min.js`
- **Guide**: `LOGO_REPLACEMENT_GUIDE.md`
