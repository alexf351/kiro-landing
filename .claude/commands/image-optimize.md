Optimize all images in the assets/ directory. Follow these steps:

1. **Check current state**: List all image files with sizes. Identify which are already WebP and which are PNG/JPG.

2. **Install sharp** (if not already available): `npm install sharp`

3. **Convert to WebP**: Convert all PNG/JPG files to WebP at quality 82. Keep originals as fallback.

4. **Generate responsive sizes**: For any image wider than 800px, generate a half-width version with suffix `-660w.webp` (or appropriate width) for mobile srcset.

5. **Update HTML**: In all HTML files:
   - Replace `<img>` tags with `<picture>` elements containing WebP `<source>` + original fallback `<img>`
   - Add `srcset` with mobile sizes for large images
   - Update any `<link rel="preload">` to point to WebP versions

6. **Clean up**: Remove the node_modules, package.json, and package-lock.json created by the sharp install.

7. **Report savings**: Show before/after total sizes and percentage reduction.

Do NOT modify image references in OG/Twitter meta tags (social platforms need absolute PNG URLs).
