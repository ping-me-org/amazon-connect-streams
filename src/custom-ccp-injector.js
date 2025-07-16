/**
 * Custom CCP Style Injector
 * This module injects custom CSS into the CCP iframe to customize its appearance
 */

/**
 * Replaces logos in the CCP iframe
 * @param {Document} iframeDoc - The iframe document
 */
function replaceLogo(iframeDoc) {
  try {
    console.log("🔍 Starting logo replacement...");

    // Debug: Log all elements that might contain logos
    const allElements = iframeDoc.querySelectorAll("*");
    let logoElements = [];

    allElements.forEach((el) => {
      const className = el.className || "";
      const tagName = el.tagName || "";
      if (
        className.includes("Flex") ||
        className.includes("Logo") ||
        className.includes("Brand") ||
        tagName === "SVG"
      ) {
        logoElements.push({
          tag: tagName,
          class: className,
          element: el,
        });
      }
    });

    console.log("🔍 Found potential logo elements:", logoElements);

    // Find and replace FlexVerticalCenterContainer logos
    const flexContainers = iframeDoc.querySelectorAll(
      '[class*="FlexVerticalCenterContainer"], [class*="Flex"], [class*="Logo"], [class*="Brand"]'
    );

    console.log("🔍 Found flex containers:", flexContainers.length);

    flexContainers.forEach((container, index) => {
      console.log(`🔍 Processing container ${index}:`, container.className);

      // Remove existing SVGs
      const svgs = container.querySelectorAll("svg");
      console.log(`🔍 Found ${svgs.length} SVGs in container ${index}`);
      svgs.forEach((svg) => {
        console.log("🗑️ Removing SVG:", svg);
        svg.remove();
      });

      // Create custom logo element with embedded SVG
      const logoDiv = iframeDoc.createElement("div");
      logoDiv.className = "ping-custom-logo";
      logoDiv.innerHTML = getPingLogoSVG();
      logoDiv.style.cssText = `
        max-width: 120px !important;
        max-height: 40px !important;
        width: auto !important;
        height: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      `;

      // Replace content
      container.innerHTML = "";
      container.appendChild(logoDiv);
      console.log("✅ Added custom logo to container", index);
    });

    // Also look for SVGs directly
    const allSvgs = iframeDoc.querySelectorAll("svg");
    console.log("🔍 Found total SVGs:", allSvgs.length);

    allSvgs.forEach((svg, index) => {
      console.log(`🔍 SVG ${index}:`, svg.outerHTML.substring(0, 100));

      // Replace with custom logo
      const logoDiv = iframeDoc.createElement("div");
      logoDiv.className = "ping-custom-logo";
      logoDiv.innerHTML = getPingLogoSVG();
      logoDiv.style.cssText = `
        max-width: 120px !important;
        max-height: 40px !important;
        width: auto !important;
        height: auto !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      `;

      if (svg.parentNode) {
        svg.parentNode.replaceChild(logoDiv, svg);
        console.log("✅ Replaced SVG", index, "with custom logo");
      }
    });

    console.log("✅ Custom logos replaced successfully");
  } catch (error) {
    console.warn("⚠️ Could not replace logos:", error.message);
    console.error("Full error:", error);
  }
}

/**
 * Injects custom CSS into the CCP iframe
 * @param {HTMLIFrameElement} iframe - The CCP iframe element
 */
function injectCustomStyles(iframe) {
  try {
    // Wait for iframe to load
    iframe.addEventListener("load", function () {
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;

        // Create style element
        const styleElement = iframeDoc.createElement("style");
        styleElement.type = "text/css";
        styleElement.innerHTML = getCustomCSS();

        // Add to iframe head
        const head =
          iframeDoc.head || iframeDoc.getElementsByTagName("head")[0];
        head.appendChild(styleElement);

        // Replace logos after a short delay to ensure DOM is ready
        setTimeout(() => {
          replaceLogo(iframeDoc);

          // Set up mutation observer to catch dynamically added logos
          const observer = new MutationObserver(() => {
            replaceLogo(iframeDoc);
          });

          observer.observe(iframeDoc.body, {
            childList: true,
            subtree: true,
          });
        }, 1000);

        console.log("✅ Custom CCP styles injected successfully");
      } catch (error) {
        console.warn(
          "⚠️ Could not inject custom styles into CCP iframe (cross-origin restriction):",
          error.message
        );
        // This is expected for cross-origin iframes
      }
    });
  } catch (error) {
    console.error("❌ Error setting up style injection:", error);
  }
}

/**
 * Returns the custom CSS string
 */
function getCustomCSS() {
  return `
/* Custom CCP Styling */
/* This CSS will be injected into the CCP iframe to customize its appearance */

/* Main CCP container */
.ccp-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  background-color: #f8f9fa !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}

/* Header styling */
.ccp-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  border-radius: 8px 8px 0 0 !important;
  padding: 12px !important;
}

/* Button styling */
.ccp-button, button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  border-radius: 6px !important;
  color: white !important;
  padding: 8px 16px !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
}

.ccp-button:hover, button:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4) !important;
}

/* Accept call button - green */
.ccp-button.accept, button[data-testid*="accept"], button[aria-label*="accept" i] {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%) !important;
}

/* Reject/End call button - red */
.ccp-button.reject, .ccp-button.end, button[data-testid*="reject"], button[data-testid*="end"], button[aria-label*="end" i], button[aria-label*="reject" i] {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%) !important;
}

/* Hold button - orange */
.ccp-button.hold, button[data-testid*="hold"], button[aria-label*="hold" i] {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%) !important;
}

/* Mute button styling */
.ccp-button.mute, button[data-testid*="mute"], button[aria-label*="mute" i] {
  background: linear-gradient(135deg, #a0aec0 0%, #718096 100%) !important;
}

/* Status indicators */
.ccp-status {
  border-radius: 20px !important;
  padding: 4px 12px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

/* Input fields */
.ccp-input, input[type="text"], input[type="tel"], input[type="number"] {
  border: 2px solid #e2e8f0 !important;
  border-radius: 6px !important;
  padding: 8px 12px !important;
  font-size: 14px !important;
  transition: border-color 0.3s ease !important;
}

/* Phone number display */
.ccp-phone-number {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #2d3748 !important;
  background-color: #f7fafc !important;
  padding: 8px 12px !important;
  border-radius: 6px !important;
  border: 1px solid #e2e8f0 !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px !important;
}

::-webkit-scrollbar-track {
  background: #f1f1f1 !important;
  border-radius: 4px !important;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1 !important;
  border-radius: 4px !important;
}

/* Logo replacement styles */
.ping-custom-logo {
  max-width: 120px !important;
  max-height: 40px !important;
  width: auto !important;
  height: auto !important;
}

/* Hide ALL inline SVGs - Amazon embeds SVG code directly */
svg {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

/* Hide default Amazon/AWS logos */
.amazon-logo, .aws-logo, [class*="amazon"], [class*="aws"],
svg[class*="logo"], img[alt*="amazon" i], img[alt*="aws" i],
[class*="FlexVerticalCenterContainer"] svg,
path[d*="M"], path[d*="A"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

/* Replace FlexVerticalCenterContainer content with custom logo */
[class*="FlexVerticalCenterContainer"] {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNjkxIDg4NSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWF4LXdpZHRoOiAxMDAlOyBtYXgtaGVpZ2h0OiAxMDAlOyI+PHRpdGxlPnBpbmdwaWxvdF9sb2dvPC90aXRsZT48ZGVmcz48cGF0aCBkPSJNMzQ0Ljk4NTksNjkwLjAzMjQgQzUzNS41MTY5LDY5MC4wMzI0IDY4OS45NzA5LDUzNS41NTk0IDY4OS45NzA5LDM0NS4wMDM0IEM2ODkuOTcwOSwxNTQuNDQ4NCA1MzUuNDkxOSwtMS4yNDM0NDk3OWUtMTQgMzQ0Ljk4NTksLTEuMjQzNDQ5NzllLTE0IEMxNTQuNDc4OSwtMS4yNDM0NDk3OWUtMTQgOC44ODE3ODQyZS0xNSwxNTQuNDczNCA4Ljg4MTc4NDJlLTE1LDM0NS4wMjg0IEM4Ljg4MTc4NDJlLTE1LDUzNS41ODQ0IDE1NC40NTM5LDY5MC4wNTc0IDM0NC45ODU5LDY5MC4wNTc0IEwzNDQuOTg1OSw2OTAuMDMyNCBaIE0zNTEuNjQ4OSw1MDkuMTc1NCBMMTgxLjMzMTksNTA5LjE3NTQgQzE3Ny40MDM5LDUwOS4xNzU0IDE3NS40NjM5LDUwNC40MjU0IDE3OC4yNDg5LDUwMS42NjU0IEwyMjcuMTMwOSw0NjEuNDgwNCBDMjI5LjI5MzksNDU5LjM0MjQgMjI5LjQxODksNDU1Ljg2MDQgMjI3LjQwNDksNDUzLjU3MjQgQzIyNS4yOTA5LDQ1MS4xNjA0IDIyMi44Mjk5LDQ0OC4zNTA0IDIyMS43ODQ5LDQ0Ny4wODI0IEMxOTcuNDkzOSw0MTcuMDE4NCAxODMuNDIwOSwzNzguMzUwNCAxODQuODYyOSwzMzYuMzc1NCBDMTg3Ljg0NTksMjQ5LjU4OTQgMjU4LjQzNDksMTc4LjcxODQgMzQ1LjE4NDksMTc1LjQzNjQgQzQ0MC4zMTM5LDE3MS44MzA0IDUxOC41ODQ5LDI0Ny44OTg0IDUxOC41ODQ5LDM0Mi4yNDM0IEM1MTguNTg0OSw0MzQuNDI1NCA0NDMuODY4OSw1MDkuMTc1NCAzNTEuNjczOSw1MDkuMTc1NCBMMzUxLjY0ODksNTA5LjE3NTQgWiIgaWQ9InBhdGgtMSI+PC9wYXRoPjwvZGVmcz48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0icGluZ3BpbG90X2xvZ28iPjxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj48dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPjwvbWFzaz48dXNlIGlkPSJNYXNrIiBmaWxsPSIjNURBREUyIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT48L2c+PC9nPjwvc3ZnPg==') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  min-width: 120px !important;
  min-height: 40px !important;
  position: relative !important;
}

/* Replace any container that might have logos */
[class*="Flex"], [class*="Logo"], [class*="Brand"] {
  position: relative !important;
}

[class*="Flex"]::after, [class*="Logo"]::after, [class*="Brand"]::after {
  content: "" !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 120px !important;
  height: 40px !important;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgNjkxIDg4NSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWF4LXdpZHRoOiAxMDAlOyBtYXgtaGVpZ2h0OiAxMDAlOyI+PHRpdGxlPnBpbmdwaWxvdF9sb2dvPC90aXRsZT48ZGVmcz48cGF0aCBkPSJNMzQ0Ljk4NTksNjkwLjAzMjQgQzUzNS41MTY5LDY5MC4wMzI0IDY4OS45NzA5LDUzNS41NTk0IDY4OS45NzA5LDM0NS4wMDM0IEM2ODkuOTcwOSwxNTQuNDQ4NCA1MzUuNDkxOSwtMS4yNDM0NDk3OWUtMTQgMzQ0Ljk4NTksLTEuMjQzNDQ5NzllLTE0IEMxNTQuNDc4OSwtMS4yNDM0NDk3OWUtMTQgOC44ODE3ODQyZS0xNSwxNTQuNDczNCA4Ljg4MTc4NDJlLTE1LDM0NS4wMjg0IEM4Ljg4MTc4NDJlLTE1LDUzNS41ODQ0IDE1NC40NTM5LDY5MC4wNTc0IDM0NC45ODU5LDY5MC4wNTc0IEwzNDQuOTg1OSw2OTAuMDMyNCBaIE0zNTEuNjQ4OSw1MDkuMTc1NCBMMTgxLjMzMTksNTA5LjE3NTQgQzE3Ny40MDM5LDUwOS4xNzU0IDE3NS40NjM5LDUwNC40MjU0IDE3OC4yNDg5LDUwMS42NjU0IEwyMjcuMTMwOSw0NjEuNDgwNCBDMjI5LjI5MzksNDU5LjM0MjQgMjI5LjQxODksNDU1Ljg2MDQgMjI3LjQwNDksNDUzLjU3MjQgQzIyNS4yOTA5LDQ1MS4xNjA0IDIyMi44Mjk5LDQ0OC4zNTA0IDIyMS43ODQ5LDQ0Ny4wODI0IEMxOTcuNDkzOSw0MTcuMDE4NCAxODMuNDIwOSwzNzguMzUwNCAxODQuODYyOSwzMzYuMzc1NCBDMTg3Ljg0NTksMjQ5LjU4OTQgMjU4LjQzNDksMTc4LjcxODQgMzQ1LjE4NDksMTc1LjQzNjQgQzQ0MC4zMTM5LDE3MS44MzA0IDUxOC41ODQ5LDI0Ny44OTg0IDUxOC41ODQ5LDM0Mi4yNDM0IEM1MTguNTg0OSw0MzQuNDI1NCA0NDMuODY4OSw1MDkuMTc1NCAzNTEuNjczOSw1MDkuMTc1NCBMMzUxLjY0ODksNTA5LjE3NTQgWiIgaWQ9InBhdGgtMSI+PC9wYXRoPjwvZGVmcz48ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBpZD0icGluZ3BpbG90X2xvZ28iPjxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj48dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPjwvbWFzaz48dXNlIGlkPSJNYXNrIiBmaWxsPSIjNURBREUyIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT48L2c+PC9nPjwvc3ZnPg==') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  z-index: 1000 !important;
}

/* More specific logo hiding */
[class*="Flex"] svg, [class*="Logo"] svg, [class*="Brand"] svg {
  display: none !important;
}

/* Replace any remaining logos with custom background */
[class*="Flex"]::after, [class*="Logo"]::after, [class*="Brand"]::after {
  content: "" !important;
  display: inline-block !important;
  width: 120px !important;
  height: 40px !important;
  background-image: url('./ping_q_logo.svg') !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
}

/* Animation for state changes */
.ccp-state-transition {
  transition: all 0.3s ease !important;
}

/* Custom loading spinner */
.ccp-loading {
  border: 3px solid #f3f3f3 !important;
  border-top: 3px solid #667eea !important;
  border-radius: 50% !important;
  width: 30px !important;
  height: 30px !important;
  animation: spin 1s linear infinite !important;
  margin: 20px auto !important;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
}

/**
 * Applies custom styling to the CCP container (parent element)
 * @param {HTMLElement} container - The container element that holds the CCP iframe
 */
function styleContainer(container) {
  if (!container) return;

  // Apply custom styles to the container
  container.style.cssText = `
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    border: 1px solid #e2e8f0;
  `;

  console.log("✅ Custom container styles applied");
}

/**
 * Returns the embedded Ping logo SVG
 */
function getPingLogoSVG() {
  return `
    <svg width="120" height="40" viewBox="0 0 691 885" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="max-width: 100%; max-height: 100%;">
      <title>pingpilot_logo</title>
      <defs>
        <path d="M344.9859,690.0324 C535.5169,690.0324 689.9709,535.5594 689.9709,345.0034 C689.9709,154.4484 535.4919,-1.24344979e-14 344.9859,-1.24344979e-14 C154.4789,-1.24344979e-14 8.8817842e-15,154.4734 8.8817842e-15,345.0284 C8.8817842e-15,535.5844 154.4539,690.0574 344.9859,690.0574 L344.9859,690.0324 Z M351.6489,509.1754 L181.3319,509.1754 C177.4039,509.1754 175.4639,504.4254 178.2489,501.6654 L227.1309,461.4804 C229.2939,459.3424 229.4189,455.8604 227.4049,453.5724 C225.2909,451.1604 222.8299,448.3504 221.7849,447.0824 C197.4939,417.0184 183.4209,378.3504 184.8629,336.3754 C187.8459,249.5894 258.4349,178.7184 345.1849,175.4364 C440.3139,171.8304 518.5849,247.8984 518.5849,342.2434 C518.5849,434.4254 443.8689,509.1754 351.6739,509.1754 L351.6489,509.1754 Z" id="path-1"></path>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="pingpilot_logo">
          <mask id="mask-2" fill="white">
            <use xlink:href="#path-1"></use>
          </mask>
          <use id="Mask" fill="#5DADE2" xlink:href="#path-1"></use>
        </g>
      </g>
    </svg>
  `;
}

// Export functions
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    injectCustomStyles,
    styleContainer,
    getCustomCSS,
    getPingLogoSVG,
  };
} else if (typeof window !== "undefined") {
  window.CCPStyleInjector = {
    injectCustomStyles,
    styleContainer,
    getCustomCSS,
    getPingLogoSVG,
  };
}
