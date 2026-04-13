// ============================================================
// DELUXE SCRAP — PAGE GENERATOR
// Generates: 5 service pages + 12 area pages
// Run: node generate-pages.js
// ============================================================
const fs = require('fs');
const path = require('path');

// ---- SHARED COMPONENTS ----
const WA_SVG = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.494A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.584l-.39-.234-3.307 1.106 1.107-3.303-.254-.404A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;
const CALL_SVG = `<svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`;
const STARS = Array(5).fill(`<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`).join('');

function header(active, depth='') {
  const d = depth;
  return `<header class="header scrolled" id="main-header">
  <div class="header__inner">
    <a href="${d}index.html" class="header__logo">DELUXE<span>.</span><small>Scrap Buyers · Hyderabad</small></a>
    <nav class="header__nav" aria-label="Primary Navigation">
      <a href="${d}index.html"${active==='home'?' class="active"':''}>Home</a>
      <div class="nav-item">
        <a href="${d}services.html"${active==='services'?' class="active"':''}>Services <svg class="caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></a>
        <div class="nav-dropdown">
          <a href="${d}services/iron-scrap-buyers-hyderabad.html">Iron &amp; Metal</a>
          <a href="${d}services/ewaste-recycling-hyderabad.html">E-Waste &amp; Electronics</a>
          <a href="${d}services/paper-scrap-buyers-hyderabad.html">Paper &amp; Cardboard</a>
          <a href="${d}services/plastic-scrap-buyers-hyderabad.html">Plastic Scrap</a>
          <a href="${d}services/copper-scrap-buyers-hyderabad.html">Copper &amp; Brass</a>
          <a href="${d}services.html" style="color:var(--gold);font-weight:600;">All Services →</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="${d}index.html#areas">Areas <svg class="caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></a>
        <div class="nav-dropdown">
          <a href="${d}areas/scrap-buyers-musheerabad.html">Musheerabad</a>
          <a href="${d}areas/scrap-buyers-secunderabad.html">Secunderabad</a>
          <a href="${d}areas/scrap-buyers-bholakpur.html">Bholakpur</a>
          <a href="${d}areas/scrap-buyers-kavadiguda.html">Kavadiguda</a>
          <a href="${d}areas/scrap-buyers-begumpet.html">Begumpet</a>
          <a href="${d}areas/scrap-buyers-ameerpet.html">Ameerpet</a>
          <a href="${d}index.html#areas" style="color:var(--gold);font-weight:600;">All Areas →</a>
        </div>
      </div>
      <a href="${d}about.html">About</a>
      <a href="${d}contact.html">Contact</a>
    </nav>
    <div class="header__actions">
      <a href="tel:+917093397598" class="btn-call-header">${CALL_SVG}070933 97598</a>
      <a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20scrap." class="btn-wa-header" target="_blank" rel="noopener">${WA_SVG}WhatsApp Now</a>
    </div>
    <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="mobile-nav" id="mobile-nav" role="dialog">
  <a href="${d}index.html">Home</a><a href="${d}services.html">Services</a><a href="${d}about.html">About</a><a href="${d}contact.html">Contact</a>
  <div class="mobile-nav__cta"><a href="tel:+917093397598" class="btn-call-lg">📞 Call Now</a><a href="https://wa.me/917093397598" class="btn-wa-lg" target="_blank" rel="noopener">WhatsApp</a></div>
</div>`;
}

function trustBar() {
  const items = `<div class="trust-bar__item"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>5.0 Google Rating</div><div class="trust-bar__sep"></div><div class="trust-bar__item">123 Reviews</div><div class="trust-bar__sep"></div><div class="trust-bar__item">Same-Day Pickup</div><div class="trust-bar__sep"></div><div class="trust-bar__item">Digital Weighing</div><div class="trust-bar__sep"></div><div class="trust-bar__item">Instant UPI Payment</div><div class="trust-bar__sep"></div><div class="trust-bar__item">Musheerabad · Hyderabad</div><div class="trust-bar__sep"></div>`;
  return `<div class="trust-bar" aria-hidden="true"><div class="trust-bar__track">${items}${items}</div></div>`;
}

function waFloat() {
  return `<a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20scrap.%20Please%20visit%20my%20address." class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_SVG}</a>`;
}

function finalCta(title='Call Now for Best Scrap Prices in Hyderabad', sub='Same-day pickup · Digital weighing · Instant UPI · 5.0 Google Rating') {
  return `<section class="final-cta">
  <div class="final-cta__inner">
    <div class="final-cta__eyebrow">Get Paid Today — Zero Hassle</div>
    <h2 class="final-cta__title">${title}</h2>
    <p class="final-cta__sub">${sub}</p>
    <div class="final-cta__actions">
      <a href="tel:+917093397598" class="btn-white">${CALL_SVG}070933 97598</a>
      <a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20scrap." class="btn-wa-big" target="_blank" rel="noopener">${WA_SVG}WhatsApp Now</a>
    </div>
  </div>
</section>`;
}

function footer(depth='') {
  const d = depth;
  return `<footer class="footer">
  <div class="footer__inner">
    <div>
      <div class="footer__brand__logo">DELUXE<span>.</span></div>
      <p class="footer__brand__tagline">Hyderabad's most trusted scrap buyers. Turning waste into wealth with speed and fairness.</p>
      <div class="footer__brand__contact">
        <a href="tel:+917093397598" class="footer__contact-link">${CALL_SVG}070933 97598</a>
        <a href="mailto:rahmanaqheelsha@gmail.com" class="footer__contact-link"><svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>rahmanaqheelsha@gmail.com</a>
        <span class="footer__contact-link" style="cursor:default; align-items:flex-start;"><svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>Mohd nagar 1-4-735/12, beside Ms Creative School,<br>Musheerabad, Bholakpur,<br>Hyderabad, Telangana 500020</span>
      </div>
    </div>
    <div>
      <div class="footer__col-title">Services</div>
      <ul class="footer__link-list">
        <li><a href="${d}services/iron-scrap-buyers-hyderabad.html">Iron &amp; Metal</a></li>
        <li><a href="${d}services/ewaste-recycling-hyderabad.html">E-Waste</a></li>
        <li><a href="${d}services/paper-scrap-buyers-hyderabad.html">Paper &amp; Cardboard</a></li>
        <li><a href="${d}services/plastic-scrap-buyers-hyderabad.html">Plastic Scrap</a></li>
        <li><a href="${d}services/copper-scrap-buyers-hyderabad.html">Copper &amp; Brass</a></li>
      </ul>
    </div>
    <div>
      <div class="footer__col-title">Quick Links</div>
      <ul class="footer__link-list">
        <li><a href="${d}index.html">Home</a></li>
        <li><a href="${d}services.html">All Services</a></li>
        <li><a href="${d}about.html">About Us</a></li>
        <li><a href="${d}contact.html">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom" style="max-width:1240px;margin:0 auto;padding-top:24px;display:flex;align-items:center;justify-content:space-between;gap:20px;">
    <div class="footer__copy">&copy; 2025 Deluxe Scrap Buyers in Hyderabad. All rights reserved.<br><span style="font-size:.72rem;opacity:.6;">Scrap Metal Dealer · Musheerabad, Bholakpur, Hyderabad 500020</span></div>
    <div class="footer__bottom-rating"><svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:var(--gold);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>5.0 · 123 Google Reviews</div>
  </div>
</footer>`;
}

function htmlHead(title, desc, canonical, depth='') {
  const d = depth;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${d}assets/css/deluxe.css">`;
}

// =====================================================
// SERVICE PAGES DATA
// =====================================================
const services = [
  {
    slug: 'iron-scrap-buyers-hyderabad',
    title: 'Iron & Metal Scrap Buyers in Hyderabad | Best Price | Deluxe Scrap',
    desc: 'Selling iron or steel scrap in Hyderabad? Deluxe Scrap Buyers offer the best prices for iron rods, steel furniture, almirahs, gates — ₹24–28/kg. Same-day pickup. Digital weighing. Call 070933 97598.',
    canonical: 'https://deluxescrap.in/services/iron-scrap-buyers-hyderabad.html',
    overline: 'Iron & Steel',
    h1: 'Iron & Metal Scrap<br><span class="accent">Best Price in Hyderabad.</span>',
    heroDesc: 'Hyderabad\'s highest paying iron and steel scrap buyers. We collect iron rods, steel furniture, almirahs, gates, grills, drums, heavy machinery parts — and pay the best market rate, confirmed by certified digital weighing.',
    rate: '₹24–28/kg',
    items: ['Iron rods & bars', 'Steel furniture', 'Steel almirahs & shelves', 'Gates & grills', 'Steel drums & containers', 'Heavy machinery parts', 'Scrap vehicles & parts', 'Construction iron waste'],
    why: 'Iron is the most traded scrap material in Hyderabad. Our buyers know exactly what your iron is worth at today\'s market rate. We\'ve streamlined our iron scrap pickup process to be the fastest and most transparent in the city.',
    faq: [
      { q: 'What is the current iron scrap rate in Hyderabad?', a: 'The current iron/steel scrap rate in Hyderabad is ₹24–28 per kg, depending on quality and condition. Rates updated daily. Call 070933 97598 for today\'s exact rate.' },
      { q: 'Do you buy rusted or damaged iron?', a: 'Yes! We buy iron in any condition — rusted, painted, bent, or broken. The price may vary slightly by condition, but everything gets a fair rate.' },
      { q: 'Do you handle heavy iron like machinery?', a: 'Absolutely. Our team handles all sizes of iron scrap including heavy machinery, construction waste, and bulk quantities. Call to arrange a special pickup.' },
    ]
  },
  {
    slug: 'ewaste-recycling-hyderabad',
    title: 'E-Waste Recycling in Hyderabad | Old Electronics Buyers | Deluxe Scrap',
    desc: 'Safe e-waste disposal in Hyderabad. We buy old TVs, laptops, computers, phones, refrigerators, ACs, washing machines at best prices. Same-day pickup. Instant payment. Call Deluxe Scrap 070933 97598.',
    canonical: 'https://deluxescrap.in/services/ewaste-recycling-hyderabad.html',
    overline: 'E-Waste',
    h1: 'E-Waste & Electronics<br><span class="accent">Responsible Recycling.</span>',
    heroDesc: 'Old electronics cluttering your home? Deluxe Scrap Buyers offers the safest and most profitable way to dispose of e-waste in Hyderabad. We buy TVs, laptops, phones, ACs, refrigerators, washing machines — any electronics.',
    rate: '₹40–200/piece',
    items: ['Old televisions & monitors', 'Laptops & computers', 'Mobile phones & tablets', 'Air conditioners (ACs)', 'Refrigerators & washing machines', 'Microwave ovens', 'UPS & inverters', 'Cables & wires (copper)'],
    why: 'E-waste contains hazardous materials that must be disposed of responsibly. At Deluxe Scrap, we ensure proper recycling while giving you the best cash value for your old electronics. No item is too old or broken.',
    faq: [
      { q: 'Do you buy completely broken electronics?', a: 'Yes. Even non-functional electronics have value — copper, aluminium, and other metals inside. We\'ll evaluate and give you the best rate possible.' },
      { q: 'What is the rate for an old TV in Hyderabad?', a: 'Old CRT TVs fetch ₹40–80, while LCD/LED TVs can get ₹100–200 depending on size and condition. Call 070933 97598 for an exact quote.' },
      { q: 'Is e-waste pickup free?', a: 'Yes, completely free doorstep pickup. No transportation charges. You receive the full scrap value directly.' },
    ]
  },
  {
    slug: 'paper-scrap-buyers-hyderabad',
    title: 'Paper & Newspaper Scrap Buyers in Hyderabad | Best Rate | Deluxe Scrap',
    desc: 'Selling old newspapers, books, cardboard in Hyderabad? Deluxe Scrap Buyers pays ₹8–12/kg for paper scrap. Free doorstep pickup, no minimum quantity. Same-day collection. Call 070933 97598.',
    canonical: 'https://deluxescrap.in/services/paper-scrap-buyers-hyderabad.html',
    overline: 'Paper & Cardboard',
    h1: 'Paper & Cardboard Scrap<br><span class="accent">Best Rates. Free Pickup.</span>',
    heroDesc: 'Old newspapers stacking up? Boxes from online shopping piling high? We buy all types of paper and cardboard scrap at the best rates in Hyderabad. No minimum quantity — even a single bundle worth our visit.',
    rate: '₹8–12/kg',
    items: ['Newspapers & magazines', 'Books & notebooks', 'Office paper & files', 'Cardboard boxes (corrugated)', 'Brown paper & packaging', 'Textbooks & old books', 'Registers & notebooks', 'Archive files & folders'],
    why: 'Paper recycling is one of the most impactful environmental contributions you can make. Each kg of paper recycled saves trees and water. At Deluxe Scrap, we make it easy and profitable for you.',
    faq: [
      { q: 'What is the current newspaper scrap rate in Hyderabad?', a: 'Current newspaper/paper scrap rate is ₹8–12 per kg. Cardboard is ₹5–8 per kg. Call 070933 97598 for today\'s exact rate.' },
      { q: 'Do I need to separate newspapers from cardboard?', a: 'No, you don\'t need to sort anything. Our team will separate and weigh different types. Just show us where it is.' },
      { q: 'I only have a small amount. Is it worth calling?', a: 'Absolutely. We have no minimum quantity. Even a single bundle of newspapers is worth our visit. Call us.' },
    ]
  },
  {
    slug: 'plastic-scrap-buyers-hyderabad',
    title: 'Plastic Scrap Buyers in Hyderabad | Best Price | Deluxe Scrap Buyers',
    desc: 'Selling plastic scrap in Hyderabad? Deluxe Scrap Buyers buys HDPE, PET, PVC plastic at best rates — ₹12–18/kg. Free doorstep pickup. Instant UPI payment. Call 070933 97598.',
    canonical: 'https://deluxescrap.in/services/plastic-scrap-buyers-hyderabad.html',
    overline: 'Plastic Scrap',
    h1: 'Plastic Scrap Buyers<br><span class="accent">All Grades. Best Price.</span>',
    heroDesc: 'We buy all types of plastic scrap across Hyderabad — HDPE, PET, PVC, ABS and more. Plastic furniture, containers, pipes, bottles — we collect it all at the best market rates with same-day doorstep pickup.',
    rate: '₹12–18/kg',
    items: ['HDPE plastic bottles & containers', 'PET bottles (water, oil)', 'PVC pipes & fittings', 'Plastic furniture (chairs, tables)', 'Plastic crates & baskets', 'ABS plastic (electronics casings)', 'Plastic drums & tanks', 'Mixed plastic scrap'],
    why: 'Plastic is one of the most recyclable materials but also the most commonly mismanaged. By selling your plastic scrap to us, you contribute to a cleaner Hyderabad while putting money in your pocket.',
    faq: [
      { q: 'What types of plastic do you buy?', a: 'We buy HDPE, PET, PVC, ABS, PP, and most other plastic grades. If you\'re unsure, just call 070933 97598 and our team will help identify and assess it.' },
      { q: 'What is the plastic scrap rate in Hyderabad?', a: 'HDPE plastic fetches ₹12–18/kg, PET bottles ₹8–14/kg, mixed plastic varies. Call for today\'s exact rate before booking pickup.' },
      { q: 'Do you take dirty or wet plastic?', a: 'We prefer clean plastic but can work with most conditions. Rate may vary for heavily soiled material. Call for details.' },
    ]
  },
  {
    slug: 'copper-scrap-buyers-hyderabad',
    title: 'Copper & Brass Scrap Buyers in Hyderabad | Best Price ₹420–480/kg | Deluxe',
    desc: 'Best copper scrap buyers in Hyderabad. We pay ₹420–480/kg for copper wire, pipes, coils. Brass fittings ₹280–320/kg. Same-day pickup. Digital weighing. Instant payment. Call 070933 97598.',
    canonical: 'https://deluxescrap.in/services/copper-scrap-buyers-hyderabad.html',
    overline: 'Copper & Brass',
    h1: 'Copper & Brass Scrap<br><span class="accent">Highest Price in Hyderabad.</span>',
    heroDesc: 'Copper is the most valuable common scrap metal — and we pay the highest rates in Hyderabad. Copper wire, pipes, coils, brass fittings, bronze items — we buy everything at current market rate, confirmed by digital weighing.',
    rate: '₹420–480/kg',
    items: ['Copper wire & cables', 'Copper pipes & tubes', 'Copper coils (AC, refrigerator)', 'Brass taps & fittings', 'Bronze items & decoration', 'Copper sheets & plates', 'Mixed copper scrap', 'Old electrical windings'],
    why: 'Copper is the highest-value non-ferrous metal. At Deluxe Scrap, we understand copper grades and pay you the exact market price — not a discounted "local rate". Our certified digital scales ensure you get every rupee you deserve.',
    faq: [
      { q: 'What is the current copper scrap rate in Hyderabad?', a: 'Current copper scrap rate is ₹420–480 per kg depending on grade and purity. Brass is ₹280–320/kg. Call 070933 97598 for today\'s live rate.' },
      { q: 'Do you buy AC copper coils?', a: 'Yes! AC copper coils are high-value scrap. We buy them whole — no need to dismantle. Our team handles the entire process.' },
      { q: 'What is the difference between copper and brass rates?', a: 'Copper is nearly pure and fetches ₹420–480/kg. Brass is an alloy (copper + zinc) and fetches ₹280–320/kg. We correctly identify each material and pay accordingly.' },
    ]
  }
];

// =====================================================
// AREA PAGES DATA
// =====================================================
const areas = [
  { slug: 'musheerabad', name: 'Musheerabad', desc: 'Our home base! Fastest response in Musheerabad — often under 1 hour.', landmark: 'beside Ms Creative School, Mohd Nagar' },
  { slug: 'bholakpur', name: 'Bholakpur', desc: 'We serve all of Bholakpur area for iron, e-waste, paper and plastic scrap.', landmark: 'near Musheerabad area' },
  { slug: 'secunderabad', name: 'Secunderabad', desc: 'Full scrap pickup service across Secunderabad. Houses, offices, and commercial spaces.', landmark: 'near Trimulgherry and Marredpally' },
  { slug: 'kavadiguda', name: 'Kavadiguda', desc: 'Serving Kavadiguda and surrounding areas for all types of scrap collection.', landmark: 'near Musheerabad and Himayatnagar' },
  { slug: 'begumpet', name: 'Begumpet', desc: 'Premium scrap pickup in Begumpet — homes, offices, and bulk commercial pickups.', landmark: 'near Ameerpet and SD Road' },
  { slug: 'ameerpet', name: 'Ameerpet', desc: 'Quick scrap collection in Ameerpet. Single call for same-day pickup.', landmark: 'near Begumpet and SR Nagar' },
  { slug: 'himayatnagar', name: 'Himayatnagar', desc: 'Trusted scrap buyers serving Himayatnagar and nearby residential areas.', landmark: 'near Kavadiguda and Nampally' },
  { slug: 'marredpally', name: 'Marredpally', desc: 'Regular scrap pickup service in Marredpally, Secunderabad for all material types.', landmark: 'near Secunderabad Clock Tower' },
  { slug: 'nampally', name: 'Nampally', desc: 'Best rated scrap buyers covering all of Nampally and Gandhi Bhavan area.', landmark: 'near Gandhi Bhavan, Hyderabad' },
  { slug: 'sultan-bazar', name: 'Sultan Bazar', desc: 'Top scrap buyers in Sultan Bazar, Hyderabad. Commercial and residential pickups.', landmark: 'near Koti and Nampally' },
  { slug: 'chilkalguda', name: 'Chilkalguda', desc: 'Scrap pickup service in Chilkalguda — iron, e-waste, paper, all accepted.', landmark: 'near Secunderabad and Kavadiguda' },
  { slug: 'sindhi-colony', name: 'Sindhi Colony', desc: 'Covering Sindhi Colony for all types of scrap — residential and commercial.', landmark: 'near Bholakpur area' },
];

// =====================================================
// GENERATE SERVICE PAGES
// =====================================================
function generateServicePage(svc) {
  const svcDir = path.join(__dirname, 'services');
  if (!fs.existsSync(svcDir)) fs.mkdirSync(svcDir, { recursive: true });

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Service"],
    "name": "Deluxe Scrap Buyers in Hyderabad",
    "telephone": "+917093397598",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mohd nagar 1-4-735/12, beside Ms Creative School, Musheerabad, Bholakpur",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500020",
      "addressCountry": "IN"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "123", "bestRating": "5" }
  });

  const breadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://deluxescrap.in/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://deluxescrap.in/services.html" },
      { "@type": "ListItem", "position": 3, "name": svc.title.split('|')[0].trim(), "item": svc.canonical }
    ]
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": svc.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  });

  const html = `${htmlHead(svc.title, svc.desc, svc.canonical, '../')}
<script type="application/ld+json">${schema}</script>
<script type="application/ld+json">${breadcrumb}</script>
<script type="application/ld+json">${faqSchema}</script>
<style>
.svc-detail{background:var(--black);padding:var(--section-pad)}
.svc-detail-grid{max-width:var(--max-w);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:start}
.items-list{margin-top:0;display:flex;flex-direction:column;gap:0}
.items-list li{display:flex;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.05);font-family:var(--font-body);font-size:.9rem;color:rgba(240,236,228,.7)}
.items-list li::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--red);flex-shrink:0}
.rate-badge{background:rgba(193,18,31,.12);border:1px solid rgba(193,18,31,.3);border-radius:3px;padding:24px 28px;margin-bottom:24px}
.rate-badge__label{font-family:var(--font-body);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px}
.rate-badge__num{font-family:var(--font-display);font-size:3rem;font-weight:900;color:var(--red);line-height:1}
.rate-badge__sub{font-family:var(--font-body);font-size:.82rem;color:var(--text-muted);margin-top:6px}
.why-box{background:var(--grey-dark);border:1px solid var(--grey-line);border-radius:3px;padding:28px;margin-top:20px}
.why-box__title{font-family:var(--font-display);font-size:1.2rem;font-weight:800;text-transform:uppercase;color:var(--white);margin-bottom:10px}
.why-box p{font-family:var(--font-body);font-size:.88rem;line-height:1.75;color:rgba(240,236,228,.6)}
.faq-section{background:var(--charcoal);padding:var(--section-pad)}
.faq-inner{max-width:720px;margin:0 auto;margin-top:48px}
.related-section{background:var(--black);padding:80px 24px}
.related-grid{max-width:var(--max-w);margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
.related-card{background:var(--grey-dark);border:1px solid var(--grey-line);border-radius:3px;padding:24px 20px;transition:border-color .25s,transform .25s}
.related-card:hover{border-color:rgba(193,18,31,.4);transform:translateY(-3px)}
.related-card__title{font-family:var(--font-display);font-size:1.2rem;font-weight:800;text-transform:uppercase;color:var(--white);margin-bottom:6px}
.related-card__rate{font-family:var(--font-body);font-size:.78rem;color:var(--gold)}
@media(max-width:1024px){.svc-detail-grid{grid-template-columns:1fr;gap:48px}.related-grid{grid-template-columns:1fr 1fr}}
@media(max-width:768px){.related-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
${waFloat()}
${header('services', '../')}

<section class="hero-inner">
  <div class="hero-inner__inner">
    <nav class="hero-inner__breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html">Home</a><svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>
      <a href="../services.html">Services</a><svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>
      <span>${svc.overline}</span>
    </nav>
    <div class="hero-inner__overline">${svc.overline} · Hyderabad</div>
    <h1 class="hero-inner__title">${svc.h1}</h1>
    <p class="hero-inner__desc">${svc.heroDesc}</p>
    <div class="hero-inner__cta">
      <a href="tel:+917093397598" class="btn-solid">${CALL_SVG}Call for Best Price</a>
      <a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20${encodeURIComponent(svc.overline)}%20scrap.%20Please%20visit%20my%20address." class="btn-outline-red" target="_blank" rel="noopener">${WA_SVG}WhatsApp Us</a>
    </div>
  </div>
</section>

${trustBar()}

<section class="svc-detail">
  <div class="svc-detail-grid">
    <div class="reveal-left">
      <div class="section-overline">What We Accept</div>
      <h2 class="section-heading">All Types of <span class="accent">${svc.overline}.</span></h2>
      <p class="section-sub" style="margin-top:16px;">${svc.why}</p>
      <ul class="items-list" style="margin-top:32px;">
        ${svc.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
      <div style="margin-top:36px;display:flex;gap:12px;flex-wrap:wrap;">
        <a href="tel:+917093397598" class="btn-solid">${CALL_SVG}070933 97598</a>
        <a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20${encodeURIComponent(svc.overline)}%20scrap." class="btn-outline-red" target="_blank" rel="noopener">${WA_SVG}WhatsApp</a>
      </div>
    </div>
    <div class="reveal">
      <div class="rate-badge">
        <div class="rate-badge__label">Current Rate · Hyderabad</div>
        <div class="rate-badge__num">${svc.rate}</div>
        <div class="rate-badge__sub">Confirmed by certified digital weighing at your location</div>
      </div>
      <div class="why-box">
        <div class="why-box__title">Why Choose Deluxe?</div>
        <p>✔ Best price guaranteed — no bargaining<br>✔ Certified digital scales — fully transparent<br>✔ Same-day pickup across Hyderabad<br>✔ Instant cash / UPI payment on the spot<br>✔ 5.0 Google rating · 123 verified reviews<br>✔ Open Mon–Sun, 8 AM to 8 PM</p>
      </div>
      <div style="margin-top:20px;background:var(--grey-dark);border:1px solid var(--grey-line);border-radius:3px;padding:24px;">
        <div style="display:flex;gap:3px;margin-bottom:8px;">${STARS}</div>
        <div style="font-family:var(--font-display);font-size:2rem;font-weight:900;color:var(--white);">5.0 / 5.0</div>
        <div style="font-family:var(--font-body);font-size:.78rem;color:var(--text-muted);">123 verified Google reviews</div>
      </div>
    </div>
  </div>
</section>

<section class="faq-section">
  <div class="container" style="text-align:center;">
    <div class="section-overline reveal" style="justify-content:center;">Common Questions</div>
    <h2 class="section-heading reveal reveal-delay-1"><span class="accent">${svc.overline}</span> FAQs.</h2>
  </div>
  <div class="faq-inner">
    ${svc.faq.map(f => `<div class="faq-item reveal"><button class="faq-q">${f.q} <svg class="faq-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button><div class="faq-a"><p>${f.a}</p></div></div>`).join('')}
    <div class="faq-item reveal">
      <button class="faq-q">How do I book a pickup? <svg class="faq-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
      <div class="faq-a"><p>Simply call 070933 97598 or send a WhatsApp message. Tell us your address and what scrap you have. We'll confirm a same-day pickup time.</p></div>
    </div>
  </div>
</section>

<section class="related-section">
  <div class="container" style="text-align:center;">
    <div class="section-overline reveal" style="justify-content:center;">More Services</div>
    <h2 class="section-heading reveal reveal-delay-1">We Also Buy <span class="accent">These.</span></h2>
  </div>
  <div class="related-grid">
    <a href="../services/iron-scrap-buyers-hyderabad.html" class="related-card reveal"><div class="related-card__title">Iron &amp; Steel</div><div class="related-card__rate">₹24–28/kg</div></a>
    <a href="../services/copper-scrap-buyers-hyderabad.html" class="related-card reveal reveal-delay-1"><div class="related-card__title">Copper &amp; Brass</div><div class="related-card__rate">₹420–480/kg</div></a>
    <a href="../services/ewaste-recycling-hyderabad.html" class="related-card reveal reveal-delay-2"><div class="related-card__title">E-Waste</div><div class="related-card__rate">₹40–200/piece</div></a>
    <a href="../services/paper-scrap-buyers-hyderabad.html" class="related-card reveal"><div class="related-card__title">Paper &amp; Cardboard</div><div class="related-card__rate">₹8–12/kg</div></a>
    <a href="../services/plastic-scrap-buyers-hyderabad.html" class="related-card reveal reveal-delay-1"><div class="related-card__title">Plastic Scrap</div><div class="related-card__rate">₹12–18/kg</div></a>
    <a href="../services.html" class="related-card reveal reveal-delay-2" style="border-color:rgba(201,168,76,.25);"><div class="related-card__title" style="color:var(--gold);">All Services →</div><div class="related-card__rate">View All Materials</div></a>
  </div>
</section>

${finalCta(`Get Best ${svc.overline} Price in Hyderabad`, 'Same-day pickup · Digital weighing · Instant UPI · 5.0 Google Rating')}

${footer('../')}
<script src="../assets/js/deluxe.js"></script>
</body>
</html>`;

  const filePath = path.join(svcDir, `${svc.slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✔ Created: services/${svc.slug}.html`);
}

// =====================================================
// GENERATE AREA PAGES
// =====================================================
function generateAreaPage(area) {
  const areaDir = path.join(__dirname, 'areas');
  if (!fs.existsSync(areaDir)) fs.mkdirSync(areaDir, { recursive: true });

  const slug = `scrap-buyers-${area.slug}`;
  const title = `Scrap Buyers in ${area.name} Hyderabad | Best Price | Deluxe Scrap Buyers`;
  const desc = `Looking for scrap buyers in ${area.name}, Hyderabad? Deluxe Scrap Buyers offers same-day pickup, certified digital weighing, and instant UPI payment. 5.0 Google rating. Call 070933 97598.`;
  const canonical = `https://deluxescrap.in/areas/${slug}.html`;

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Deluxe Scrap Buyers in Hyderabad",
    "telephone": "+917093397598",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mohd nagar 1-4-735/12, beside Ms Creative School, Musheerabad, Bholakpur",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500020",
      "addressCountry": "IN"
    },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "123", "bestRating": "5" },
    "areaServed": { "@type": "City", "name": `${area.name}, Hyderabad` }
  });

  const breadcrumb = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://deluxescrap.in/" },
      { "@type": "ListItem", "position": 2, "name": `Scrap Buyers in ${area.name}`, "item": canonical }
    ]
  });

  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `Are there scrap buyers near ${area.name} Hyderabad?`, "acceptedAnswer": { "@type": "Answer", "text": `Yes! Deluxe Scrap Buyers offers same-day scrap pickup in ${area.name}, Hyderabad. Call 070933 97598 for immediate service.` } },
      { "@type": "Question", "name": `How quickly can you pick up scrap from ${area.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `We offer same-day pickup in ${area.name}. Call before noon and our team typically arrives the same afternoon — often within 2 hours.` } },
      { "@type": "Question", "name": `What scrap do you buy in ${area.name}?`, "acceptedAnswer": { "@type": "Answer", "text": `We buy all types of scrap in ${area.name}: iron, steel, copper, aluminium, brass, e-waste, paper, cardboard, plastic, batteries, and more.` } }
    ]
  });

  const otherAreas = areas.filter(a => a.slug !== area.slug).slice(0, 6);

  const html = `${htmlHead(title, desc, canonical, '../')}
<script type="application/ld+json">${schema}</script>
<script type="application/ld+json">${breadcrumb}</script>
<script type="application/ld+json">${faqSchema}</script>
<style>
.area-main{background:var(--black);padding:var(--section-pad)}
.area-grid{max-width:var(--max-w);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:start}
.area-features{display:flex;flex-direction:column;gap:0;margin-top:36px}
.area-feature{display:flex;gap:16px;align-items:flex-start;padding:20px 0;border-bottom:1px solid var(--grey-line)}
.area-feature:first-child{border-top:1px solid var(--grey-line)}
.area-feature__icon{width:44px;height:44px;border-radius:3px;background:rgba(193,18,31,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.area-feature__icon svg{width:20px;height:20px;stroke:var(--red);fill:none;stroke-width:1.5}
.area-feature__title{font-family:var(--font-display);font-size:1.1rem;font-weight:800;text-transform:uppercase;color:var(--white);margin-bottom:4px}
.area-feature p{font-family:var(--font-body);font-size:.85rem;line-height:1.6;color:rgba(240,236,228,.5)}
.services-mini{background:var(--grey-dark);padding:var(--section-pad)}
.svc-mini-grid{max-width:var(--max-w);margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px}
.svc-mini-card{background:var(--charcoal);padding:32px 28px;position:relative;overflow:hidden;transition:background .3s}
.svc-mini-card:hover{background:#1e0e0e}
.svc-mini-card::before{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:var(--red);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.svc-mini-card:hover::before{transform:scaleX(1)}
.svc-mini-card__title{font-family:var(--font-display);font-size:1.3rem;font-weight:800;text-transform:uppercase;color:var(--white);margin-bottom:6px}
.svc-mini-card__rate{font-family:var(--font-body);font-size:.78rem;color:var(--gold)}
.svc-mini-card__desc{font-family:var(--font-body);font-size:.83rem;color:rgba(240,236,228,.45);margin-top:8px;line-height:1.6}
.faq-section{background:var(--charcoal);padding:var(--section-pad)}
.faq-inner{max-width:720px;margin:0 auto;margin-top:48px}
.nearby-section{background:var(--black);padding:80px 24px}
.nearby-grid{max-width:var(--max-w);margin:0 auto;display:flex;flex-wrap:wrap;gap:10px;margin-top:40px;justify-content:center}
.nearby-pill{padding:10px 20px;border:1px solid var(--grey-line);border-radius:2px;font-family:var(--font-body);font-size:.82rem;color:rgba(240,236,228,.6);transition:all .25s}
.nearby-pill:hover{border-color:rgba(193,18,31,.5);color:var(--red-light);background:rgba(193,18,31,.06)}
@media(max-width:1024px){.area-grid{grid-template-columns:1fr;gap:48px}.svc-mini-grid{grid-template-columns:1fr 1fr}}
@media(max-width:768px){.svc-mini-grid{grid-template-columns:1fr}}
</style>
</head>
<body>
${waFloat()}
${header('', '../')}

<section class="hero-inner">
  <div class="hero-inner__inner">
    <nav class="hero-inner__breadcrumb" aria-label="Breadcrumb">
      <a href="../index.html">Home</a><svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>
      <span>Scrap Buyers in ${area.name}</span>
    </nav>
    <div class="hero-inner__overline">${area.name} · Hyderabad</div>
    <h1 class="hero-inner__title">Scrap Buyers in<br><span class="accent">${area.name}, Hyderabad</span></h1>
    <p class="hero-inner__desc">Looking for reliable scrap buyers near ${area.name}? Deluxe Scrap Buyers offers same-day pickup, certified digital weighing, and instant UPI payment — right in your neighbourhood. ${area.desc}</p>
    <div class="hero-inner__cta">
      <a href="tel:+917093397598" class="btn-solid">${CALL_SVG}Call 070933 97598</a>
      <a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20scrap%20in%20${encodeURIComponent(area.name)}%20Hyderabad.%20Please%20visit%20my%20address." class="btn-outline-red" target="_blank" rel="noopener">${WA_SVG}WhatsApp for Pickup</a>
    </div>
  </div>
</section>

${trustBar()}

<section class="area-main">
  <div class="area-grid">
    <div class="reveal-left">
      <div class="section-overline">Scrap Buyers Near You</div>
      <h2 class="section-heading">Best Scrap Price in<br><span class="accent">${area.name}.</span></h2>
      <p class="section-sub" style="margin-top:16px;">We are your trusted local scrap buyers in ${area.name}, Hyderabad. Whether you have iron, copper, e-waste, paper or plastic — we buy everything at the best market rate.</p>
      <div class="area-features">
        <div class="area-feature">
          <div class="area-feature__icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div><div class="area-feature__title">Same-Day Pickup in ${area.name}</div><p>Call before noon, we arrive the same afternoon. Average response time: 2 hours in ${area.name} area.</p></div>
        </div>
        <div class="area-feature">
          <div class="area-feature__icon"><svg viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
          <div><div class="area-feature__title">Certified Digital Weighing</div><p>We bring our certified digital scales to ${area.name}. You watch every gram counted — full transparency.</p></div>
        </div>
        <div class="area-feature">
          <div class="area-feature__icon"><svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></div>
          <div><div class="area-feature__title">Instant UPI Payment</div><p>Cash, PhonePe, GPay, Paytm — paid immediately after weighing. No delays, no excuses.</p></div>
        </div>
        <div class="area-feature">
          <div class="area-feature__icon"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
          <div><div class="area-feature__title">5.0 Google Rating</div><p>123 customers have reviewed us on Google. We maintain a perfect 5.0 rating — because every customer matters.</p></div>
        </div>
      </div>
    </div>
    <div class="reveal">
      <div style="background:var(--grey-dark);border:1px solid var(--grey-line);border-radius:3px;padding:36px;">
        <div style="font-family:var(--font-body);font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);margin-bottom:16px;">Our Office</div>
        <div style="font-family:var(--font-display);font-size:1.4rem;font-weight:800;text-transform:uppercase;color:var(--white);margin-bottom:12px;">Deluxe Scrap Buyers</div>
        <div style="font-family:var(--font-body);font-size:.88rem;color:rgba(240,236,228,.6);line-height:1.7;margin-bottom:20px;">Mohd nagar 1-4-735/12, beside Ms Creative School,<br>Musheerabad, Bholakpur,<br>Hyderabad, Telangana 500020</div>
        <div style="display:flex;gap:3px;margin-bottom:8px;">${STARS}</div>
        <div style="font-family:var(--font-body);font-size:.82rem;color:var(--gold);">5.0 · 123 Google Reviews</div>
        <hr style="border:none;border-top:1px solid var(--grey-line);margin:20px 0;">
        <a href="tel:+917093397598" class="btn-solid" style="width:100%;justify-content:center;margin-bottom:12px;">${CALL_SVG}Call Now</a>
        <a href="https://wa.me/917093397598?text=Hi%2C%20I%20want%20to%20sell%20scrap%20in%20${encodeURIComponent(area.name)}." class="btn-outline-red" style="width:100%;justify-content:center;" target="_blank" rel="noopener">${WA_SVG}WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<section class="services-mini">
  <div class="container" style="text-align:center;">
    <div class="section-overline reveal" style="justify-content:center;">We Buy</div>
    <h2 class="section-heading reveal reveal-delay-1">All Scrap Types in <span class="accent">${area.name}.</span></h2>
  </div>
  <div class="svc-mini-grid">
    <a href="../services/iron-scrap-buyers-hyderabad.html" class="svc-mini-card reveal"><div class="svc-mini-card__title">Iron &amp; Steel</div><div class="svc-mini-card__rate">₹24–28/kg</div><p class="svc-mini-card__desc">Rods, furniture, almirahs, gates, grills</p></a>
    <a href="../services/copper-scrap-buyers-hyderabad.html" class="svc-mini-card reveal reveal-delay-1"><div class="svc-mini-card__title">Copper &amp; Brass</div><div class="svc-mini-card__rate">₹420–480/kg</div><p class="svc-mini-card__desc">Wire, pipes, coils, fittings</p></a>
    <a href="../services/ewaste-recycling-hyderabad.html" class="svc-mini-card reveal reveal-delay-2"><div class="svc-mini-card__title">E-Waste</div><div class="svc-mini-card__rate">₹40–200/piece</div><p class="svc-mini-card__desc">TVs, laptops, phones, ACs, refrigerators</p></a>
    <a href="../services/paper-scrap-buyers-hyderabad.html" class="svc-mini-card reveal"><div class="svc-mini-card__title">Paper &amp; Cardboard</div><div class="svc-mini-card__rate">₹8–12/kg</div><p class="svc-mini-card__desc">Newspapers, books, boxes, packaging</p></a>
    <a href="../services/plastic-scrap-buyers-hyderabad.html" class="svc-mini-card reveal reveal-delay-1"><div class="svc-mini-card__title">Plastic Scrap</div><div class="svc-mini-card__rate">₹12–18/kg</div><p class="svc-mini-card__desc">HDPE, PET, PVC, containers, pipes</p></a>
    <div class="svc-mini-card reveal reveal-delay-2" style="border-color:rgba(201,168,76,.2);cursor:default;"><div class="svc-mini-card__title" style="color:var(--gold);">More Materials</div><div class="svc-mini-card__rate">Call to Confirm</div><p class="svc-mini-card__desc">Aluminium, batteries, mixed scrap &amp; more</p></div>
  </div>
</section>

<section class="faq-section">
  <div class="container" style="text-align:center;">
    <div class="section-overline reveal" style="justify-content:center;">FAQs</div>
    <h2 class="section-heading reveal reveal-delay-1">Questions About Scrap Pickup in <span class="accent">${area.name}.</span></h2>
  </div>
  <div class="faq-inner">
    <div class="faq-item reveal"><button class="faq-q">Do you offer scrap pickup near ${area.name}? <svg class="faq-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button><div class="faq-a"><p>Yes! We provide same-day scrap pickup service in ${area.name} and all surrounding areas. Call 070933 97598 for immediate booking.</p></div></div>
    <div class="faq-item reveal"><button class="faq-q">How soon can you pick up scrap from ${area.name}? <svg class="faq-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button><div class="faq-a"><p>Same-day! Call before noon and we typically arrive in ${area.name} the same afternoon. In most cases we arrive within 2 hours of your call.</p></div></div>
    <div class="faq-item reveal"><button class="faq-q">What types of scrap do you buy in ${area.name}? <svg class="faq-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button><div class="faq-a"><p>We buy all types: iron, steel, copper, aluminium, brass, e-waste, paper, cardboard, plastic, batteries, and more. No minimum quantity.</p></div></div>
    <div class="faq-item reveal"><button class="faq-q">Is there any charge for pickup in ${area.name}? <svg class="faq-icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button><div class="faq-a"><p>Completely free! No pickup charges, no transport fees. You receive the full scrap value — cash or UPI — the moment we finish weighing.</p></div></div>
  </div>
</section>

<section class="nearby-section">
  <div class="container" style="text-align:center;">
    <div class="section-overline reveal" style="justify-content:center;">Nearby Areas</div>
    <h2 class="section-heading reveal reveal-delay-1">We Also Serve <span class="accent">These Areas.</span></h2>
  </div>
  <div class="nearby-grid">
    ${otherAreas.map(a => `<a href="../areas/scrap-buyers-${a.slug}.html" class="nearby-pill">Scrap Buyers in ${a.name}</a>`).join('')}
    <a href="../contact.html" class="nearby-pill" style="border-color:rgba(193,18,31,.3);color:var(--red-light);">View All Areas →</a>
  </div>
</section>

${finalCta(`Call for Scrap Pickup in ${area.name}`, `Same-day service · Digital weighing · Instant payment · Serving ${area.name}, Hyderabad`)}

${footer('../')}
<script src="../assets/js/deluxe.js"></script>
</body>
</html>`;

  const filePath = path.join(areaDir, `${slug}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✔ Created: areas/${slug}.html`);
}

// =====================================================
// RUN GENERATOR
// =====================================================
console.log('\n🔴 DELUXE SCRAP — Page Generator\n');
console.log('Generating service pages...');
services.forEach(generateServicePage);

console.log('\nGenerating area pages...');
areas.forEach(generateAreaPage);

console.log(`\n✅ Done! Generated ${services.length} service pages + ${areas.length} area pages.\n`);
