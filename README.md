# Miriam Fahim - Personal Portfolio Website

A beautiful, modern personal portfolio website designed for Product Manager roles and showcasing your experience in digital assets and innovation at LSEG.

## Features

- **Modern Design**: Clean, professional aesthetic inspired by contemporary portfolio sites
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Subtle scroll animations and transitions
- **Easy Navigation**: Fixed navbar with smooth scrolling to sections
- **SEO Friendly**: Semantic HTML structure
- **Fast Loading**: Optimized performance with minimal dependencies

## Sections

1. **Hero**: Eye-catching introduction with your name and current role
2. **About**: Professional summary and key highlights
3. **Experience**: Timeline of your career with detailed achievements
4. **Education**: Degrees, certifications, and leadership roles
5. **Contact**: Easy ways for employers to reach you

## How to View Your Website

### Option 1: Open Directly in Browser
1. Navigate to `/Users/miriamfahim/Downloads/PersonalWebsite/`
2. Double-click on `index.html`
3. Your website will open in your default browser

### Option 2: Use a Local Server (Recommended)
For the best experience, use a local server:

**Using Python (if installed):**
```bash
cd /Users/miriamfahim/Downloads/PersonalWebsite/
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser

**Using VS Code:**
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Customization Guide

### Changing Colors
Edit `styles.css` at the top where CSS variables are defined (lines 8-21):
```css
--primary-color: #2563eb;  /* Main blue color */
--accent-color: #8b5cf6;   /* Purple accent */
```

### Adding Content
- **Projects/Case Studies**: Add a new section in `index.html` after the Experience section
- **Skills List**: Add to the About section highlighting your PM skills
- **Additional Links**: Add social media or GitHub links in the Contact section

### Updating Information
- Edit text directly in `index.html`
- All content is clearly labeled with HTML comments
- Experience items follow a consistent structure for easy editing

## Deploying Your Website

### Option 1: Netlify (Easiest - Free)
1. Go to [netlify.com](https://www.netlify.com/)
2. Drag and drop the PersonalWebsite folder
3. Get an instant URL like `miriam-fahim.netlify.app`
4. Optional: Connect a custom domain

### Option 2: GitHub Pages (Free)
1. Create a GitHub account
2. Create a repository named `yourusername.github.io`
3. Upload all files
4. Your site will be live at `yourusername.github.io`

### Option 3: Vercel (Free)
1. Go to [vercel.com](https://vercel.com/)
2. Sign up and import your files
3. Deploy with one click

## File Structure

```
PersonalWebsite/
├── index.html      # Main HTML structure
├── styles.css      # All styling and design
├── script.js       # Interactive features
└── README.md       # This file
```

## Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No heavy frameworks or libraries
- Optimized images and animations
- Fast load times
- Smooth scrolling and interactions

## Tips for Showcasing to Employers

1. **Add specific metrics**: Include numbers and results in your experience section
2. **Case studies**: Consider adding a dedicated projects section with detailed PM case studies
3. **Testimonials**: Add quotes from colleagues or managers (if available)
4. **Portfolio pieces**: Link to product specs, roadmaps, or presentations (ensure no confidential info)
5. **Keep it updated**: Regularly update with new achievements and skills

## Support

For questions about customization or deployment, refer to:
- [MDN Web Docs](https://developer.mozilla.org/)
- [W3Schools](https://www.w3schools.com/)
- [CSS Tricks](https://css-tricks.com/)

## Next Steps

1. Review all content for accuracy
2. Test on different devices and browsers
3. Share with trusted friends for feedback
4. Deploy to a hosting service
5. Add the URL to your LinkedIn profile
6. Include it in your resume and job applications

---

Built with HTML, CSS, and JavaScript
&copy; 2024 Miriam Fahim
