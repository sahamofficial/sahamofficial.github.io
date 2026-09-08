# Saham Ali Portfolio - Next.js Migration

Your portfolio has been successfully migrated from pure HTML/CSS to **Next.js 16** with **TypeScript**, **Tailwind CSS**, and **App Router**.

## What Changed

### ✅ Completed
- **Framework**: Converted from static HTML to Next.js with React
- **Structure**: Organized with App Router (`src/app/`)
- **Styling**: All CSS themes preserved in `/public/assets/css/`
- **Assets**: All images, fonts, and vendor libraries copied to `/public/assets/`
- **Pages**: Main portfolio page fully implemented with all sections
- **Metadata**: SEO metadata, Open Graph, and Twitter cards configured
- **Scripts**: All JavaScript libraries loaded (Bootstrap, AOS, Glightbox, Swiper, Typed.js, etc.)

### 📦 Key Files
- `src/app/layout.tsx` - Root layout with all CSS/JS includes and metadata
- `src/app/page.tsx` - Main portfolio page with all sections
- `public/assets/` - All static assets (CSS themes, images, vendor libraries)
- `package.json` - Dependencies and build scripts

## How to Run

### Development
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Key Features

### Multi-Theme Support
Your site has 10+ themes - all working as before:
- Neo (Neomorphism)
- Terminal (IDE-style)
- Bento (Grid layout)
- Glass (Frosted glass)
- Aurum (Premium dark)
- Clay (Soft UI)
- Maximal (Retro)
- Win11 (Windows desktop)
- Soft Light
- And more...

Theme switching is handled by the `theme-toggle.js` script.

### Sections Included
1. **Hero** - Animated intro with Typed.js
2. **About** - Personal bio and info
3. **Stats** - Counters with Purecounter.js
4. **Skills** - Backend, Frontend, Tools & Design
5. **Resume** - Education and experience
6. **Portfolio** - Filterable projects with Isotope.js
7. **Services** - Service offerings
8. **Contact** - Contact form with FormSubmit

### Interactive Elements
- **AOS** (Animate On Scroll) - Scroll animations
- **GLightbox** - Image gallery lightbox
- **Swiper** - Touch carousel
- **Typed.js** - Text animation
- **Purecounter** - Number counting animations
- **Bento Tilt** - 3D tilt effect
- **Three.js** - 3D background effects
- **Bootstrap** - Responsive grid

### Contact Form
Form submissions go to `sahamaliofficial@gmail.com` via FormSubmit:
```
POST https://formsubmit.co/ajax/sahamaliofficial@gmail.com
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with all CSS/JS
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles
public/
├── favicon.png
├── assets/
│   ├── css/                # All theme CSS files
│   ├── js/                 # Custom JavaScript
│   ├── img/                # Images
│   └── vendor/             # Bootstrap, AOS, Swiper, etc.
```

## Next Steps

1. **Update Content**: Edit `src/app/page.tsx` to add your:
   - Real portfolio projects
   - Actual work experience
   - Education details
   - Custom services

2. **Update Assets**: Replace placeholder images in `public/assets/img/`

3. **Customize Themes**: Modify CSS files in `public/assets/css/`

4. **Add Pages**: Create additional pages as needed (e.g., blog, project details)

5. **Deploy**: Deploy to Vercel (recommended for Next.js):
   ```bash
   npm i -g vercel
   vercel deploy
   ```

## Environment Variables

Create `.env.local` if you need custom configuration:
```
NEXT_PUBLIC_FORM_EMAIL=your-email@example.com
```

## Troubleshooting

### Scripts not loading?
- Check browser console for errors
- Verify `/public/assets/` is accessible
- Ensure scripts load after page mount (they do via `<script>` tags in layout)

### Styles not applying?
- Clear browser cache (Ctrl+Shift+Delete)
- Check that CSS files are in `/public/assets/css/`
- Verify theme data-attribute is set correctly

### Forms not submitting?
- Check FormSubmit settings: https://formsubmit.co/
- Verify email address in form action
- Test with actual data

## Build Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Start production server
npm run lint      # ESLint check
```

## Dependencies

- **next**: 16.x (React framework)
- **react**: 19.x (UI library)
- **typescript**: 5.x (Type safety)
- **tailwindcss**: CSS framework
- **bootstrap**: Grid and utilities

All vendor libraries (Three.js, AOS, Glightbox, Swiper, etc.) are loaded via `<script>` tags from `/public/assets/vendor/`.

## Notes

- Your original HTML files are backed up in `backup_old/`
- All client-side functionality is preserved
- The site is now fully optimized for Next.js
- TypeScript provides better development experience
- SEO is improved with proper metadata
- Automatic code splitting for better performance

## Support

For issues or questions about the migration, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Original Assets/Vendor Documentation](public/assets/vendor/)

---

**Migration completed successfully!** 🎉

Your portfolio is now a modern Next.js application while maintaining all original functionality and design.
