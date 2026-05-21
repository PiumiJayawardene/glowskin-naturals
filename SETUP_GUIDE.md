# GlowSkin Naturals — Complete Setup Guide
# E-Commerce & Digital Marketing Research Project
# ═══════════════════════════════════════════════════════

## FILE STRUCTURE
```
glowskin/
├── index.html          ← Main website (all sections)
├── css/
│   └── style.css       ← All styling
├── js/
│   └── main.js         ← GA4 events, animations, interactions
└── SETUP_GUIDE.md      ← This file
```

---

## SECTION 1 — HOSTING ON NETLIFY (Recommended — Free)

### Steps:
1. Go to https://netlify.com → Sign up free (use GitHub or email)
2. Click "Add new site" → "Deploy manually"
3. Drag your entire `glowskin/` folder into the upload box
4. Wait 30 seconds → your site is live at a URL like:
   https://glowskin-naturals.netlify.app
5. (Optional) Click "Domain settings" → "Add custom domain" if you have one

### GitHub Pages Alternative:
1. Create account at https://github.com
2. New repository → name it `glowskin-naturals`
3. Upload all files → Settings → Pages → Branch: main → Save
4. Live at: https://yourusername.github.io/glowskin-naturals

---

## SECTION 2 — GOOGLE ANALYTICS 4 (GA4) SETUP

### Step 1: Create GA4 Property
1. Go to https://analytics.google.com
2. Click "Start measuring" or "Admin" (gear icon)
3. Click "Create Property"
4. Enter: Property name = "GlowSkin Naturals Research"
5. Time zone = Colombo (Sri Lanka) / your timezone
6. Currency = LKR
7. Click Next → fill business details → Create

### Step 2: Create Web Data Stream
1. In your new property → Admin → Data Streams
2. Click "Add stream" → Web
3. Website URL = your Netlify URL (e.g. https://glowskin.netlify.app)
4. Stream name = "GlowSkin Website"
5. Click "Create stream"

### Step 3: Find Your Measurement ID
1. After creating stream → you'll see: **G-S4M1JQSBMB**
2. Copy this ID (it starts with G-)

### Step 4: Add to Your Website
Open `index.html` and find these lines (near the top, in <head>):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S4M1JQSBMB"></script>
<script>
  gtag('config', 'G-S4M1JQSBMB');
</script>
```
Replace BOTH instances of `G-S4M1JQSBMB` with your real ID.

### Step 5: Test GA4 is Working
1. Open your live website in Chrome
2. Go to GA4 → Reports → Realtime
3. You should see "1 user" appear within 30 seconds
4. Click buttons on your site → watch events appear in GA4 Realtime

---

## SECTION 3 — GA4 EVENTS TABLE

| Button Clicked            | GA4 Event Name          | Location Tag          | Meta Pixel Event     |
|---------------------------|-------------------------|-----------------------|----------------------|
| Shop Now (hero)           | shop_now_click          | hero                  | ViewContent          |
| Read Reviews              | read_reviews_click      | hero / product card   | —                    |
| Submit Review             | submit_review_click     | hero / reviews / contact | Lead              |
| Follow on Instagram       | social_instagram_click  | social_section        | Contact              |
| Follow on TikTok          | social_tiktok_click     | social_section        | Contact              |
| Follow on Facebook        | social_facebook_click   | social_section        | Contact              |
| Join WhatsApp Group       | social_whatsapp_click   | social_section        | Contact              |
| Take Survey (any button)  | form_link_click         | nav / contact / embed | SubmitApplication    |
| Shop Now (product card)   | shop_now_click          | product name          | ViewContent          |
| Section viewed (products) | section_view            | products              | ViewContent          |
| Demo notice shown         | demo_notice_shown       | shop_now_button       | InitiateCheckout     |

### Where to see these in GA4:
Reports → Engagement → Events → (your event name)
Or: Reports → Realtime (see them live as they happen)

---

## SECTION 4 — META PIXEL SETUP

### Why Custom Hosting (Not Google Sites)?
Google Sites does NOT allow custom HTML/JavaScript in the <head> section.
Meta Pixel requires code in the <head> tag.
→ Use Netlify or GitHub Pages instead (both free and allow full HTML control).

### Step 1: Create Meta Pixel
1. Go to https://business.facebook.com
2. Events Manager → Connect Data Sources → Web
3. Click "Meta Pixel" → Connect
4. Name your pixel: "GlowSkin Research Pixel"
5. Enter your website URL → Continue

### Step 2: Get Pixel ID
1. After creation → you'll see a number like: 1234567890123456
2. Copy this number (your Pixel ID)

### Step 3: Add to Website
Open `index.html` and find:
```
fbq('init', 'META_PIXEL_ID_HERE');
```
Replace `META_PIXEL_ID_HERE` with your real Pixel ID (both occurrences).

### Step 4: Events Already Configured
These Meta Pixel events are already in your code:
- PageView — fires automatically on page load
- ViewContent — fires when products section viewed / product Shop Now clicked
- Lead — fires when Submit Review clicked
- Contact — fires when social media follow buttons clicked
- SubmitApplication — fires when survey form button clicked
- InitiateCheckout — fires when demo notice appears

### Step 5: Test the Pixel
1. Install Chrome extension: "Meta Pixel Helper" (free from Chrome Web Store)
2. Visit your live website
3. The extension icon turns green if pixel is firing
4. Click buttons → extension shows which events fired
5. Or: Events Manager → Test Events → enter your URL → watch live events

---

## SECTION 5 — GOOGLE FORM SETUP

### Step 1: Create the Form
1. Go to https://forms.google.com
2. Click "+" to create new form
3. Title: "GlowSkin Naturals — Consumer Trust & Social Media Research Survey"
4. Description: "This is an academic research survey for a university E-Commerce & Digital Marketing module. All responses are anonymous and will only be used for research purposes. Takes approximately 3 minutes."

### Step 2: Full Question List

**SECTION A — Demographics**
Q1. What is your age group?
    Type: Multiple choice
    Options: Under 18 / 18–24 / 25–34 / 35–44 / 45+

Q2. Gender (optional)
    Type: Multiple choice
    Options: Female / Male / Prefer not to say / Other

Q3. How often do you shop online?
    Type: Multiple choice
    Options: Daily / Weekly / Monthly / Rarely / Never

---
**SECTION B — Social Media Shopping Habits**

Q4. Which platform do you use MOST for discovering new products?
    Type: Multiple choice
    Options: Instagram / TikTok / Facebook / YouTube / Pinterest / WhatsApp / Other

Q5. How often do you discover new products through social media?
    Type: Linear scale (1–5)
    Label 1: Never | Label 5: Very Often

Q6. Social media advertisements influence my online purchase decisions.
    Type: Linear scale (1–5)
    Label 1: Strongly Disagree | Label 5: Strongly Agree

Q7. I follow brands on social media before making a purchase.
    Type: Linear scale (1–5)
    Label 1: Strongly Disagree | Label 5: Strongly Agree

---
**SECTION C — Online Reviews & Trust**

Q8. I read online customer reviews before purchasing from an e-commerce website.
    Type: Linear scale (1–5)
    Label 1: Strongly Disagree | Label 5: Strongly Agree

Q9. Star ratings increase my trust in an online store.
    Type: Linear scale (1–5)
    Label 1: Strongly Disagree | Label 5: Strongly Agree

Q10. A higher number of reviews increases my confidence to purchase.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

Q11. Recent reviews are more trustworthy than older reviews.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

Q12. Negative reviews significantly reduce my trust in an e-commerce business.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

---
**SECTION D — Purchase Intention**

Q13. I am more likely to purchase from a brand with active social media pages.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

Q14. I am more likely to buy from a brand with 4.5+ star ratings.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

Q15. User-generated content (reviews, posts) is more trustworthy than brand advertisements.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

Q16. I would consider purchasing from GlowSkin Naturals based on this website.
     Type: Linear scale (1–5)
     Label 1: Strongly Disagree | Label 5: Strongly Agree

---
**SECTION E — Website Review**

Q17. How would you rate your experience with the GlowSkin Naturals demo website?
     Type: Linear scale (1–5)
     Label 1: Very Poor | Label 5: Excellent

Q18. Please write a short review about the website or products:
     Type: Paragraph (long answer)
     Placeholder: "Tell us what you liked, what could be improved..."

Q19. Would you return to shop at GlowSkin Naturals if it were a real store?
     Type: Multiple choice
     Options: Yes, definitely / Probably yes / Not sure / Probably not / No

Q20. How likely are you to recommend GlowSkin Naturals to a friend?
     Type: Linear scale (0–10)
     Label 0: Not at all likely | Label 10: Extremely likely
     (Note: This is your NPS question — Promoters = 9–10, Passives = 7–8, Detractors = 0–6)

### Step 3: Link Form to Google Sheets
1. In your Google Form → click "Responses" tab
2. Click the green Sheets icon (View in Sheets)
3. Click "Create a new spreadsheet"
4. Name it: "GlowSkin Research Responses"
5. All future responses automatically save here in real time

### Step 4: Get the Form Link
1. In Google Form → click "Send" (top right)
2. Click the link icon (🔗)
3. Copy the URL
4. Replace ALL instances of `https://docs.google.com/forms/d/e/1FAIpQLSfaPi4slLabPhe-GNXSVw2Zmjw1OLrXjboKRof2g9LixX2TIg/viewform?usp=header` in index.html with this URL

### Step 5: Get Embed Code
1. In Google Form → Send → click the `<>` (embed) icon
2. Copy the entire `<iframe>` code
3. In index.html, find the comment: `<!-- PASTE YOUR GOOGLE FORM EMBED IFRAME HERE ↓ -->`
4. Replace the `<div class="form-placeholder">` block with your iframe code
5. Add `width="100%" height="800"` to the iframe for full-width display

---

## SECTION 6 — GOOGLE SHEETS ANALYSIS COLUMNS

After collecting responses, your Google Sheet will have these columns.
Use them for charts and your Python/Colab analysis:

| Column (Form Q)  | Variable Name       | Use In Paper                           |
|------------------|---------------------|----------------------------------------|
| Q4               | platform_preference | Bar chart: most popular discovery platform |
| Q6               | smm_influence       | SMM → Purchase Intention (IV)          |
| Q8               | review_reading      | Review habit measure                   |
| Q9               | star_rating_trust   | Trust construct item                   |
| Q10              | review_volume_conf  | Trust construct item                   |
| Q11+Q12 avg      | trust_score         | Consumer Trust (mediator)              |
| Q13+Q14+Q16 avg  | purchase_intention  | Purchase Intention (DV)                |
| Q17              | website_rating      | Website UX score                       |
| Q18              | review_text         | BDA paper — NLP / sentiment analysis   |
| Q20              | nps_score           | Net Promoter Score (0–10)              |

### Create Computed Columns in Google Sheets:
In a new column, add these formulas:
```
Trust Score (avg of Q9, Q10, Q11, Q12):
=AVERAGE(I2,J2,K2,L2)

Purchase Intention Score (avg of Q13, Q14, Q16):
=AVERAGE(M2,N2,P2)

NPS Category:
=IF(T2>=9,"Promoter",IF(T2>=7,"Passive","Detractor"))
```

---

## SECTION 7 — UTM CAMPAIGN LINKS

Replace `https://yourwebsite.netlify.app` with your real Netlify URL.

### Instagram Campaign:
```
https://yourwebsite.netlify.app?utm_source=instagram&utm_medium=social&utm_campaign=glowskin_review_trust_campaign&utm_content=hero_cta
```

### TikTok Campaign:
```
https://yourwebsite.netlify.app?utm_source=tiktok&utm_medium=social&utm_campaign=glowskin_review_trust_campaign&utm_content=social_post
```

### Facebook Campaign:
```
https://yourwebsite.netlify.app?utm_source=facebook&utm_medium=social&utm_campaign=glowskin_review_trust_campaign&utm_content=product_card
```

### WhatsApp Campaign:
```
https://yourwebsite.netlify.app?utm_source=whatsapp&utm_medium=social&utm_campaign=glowskin_review_trust_campaign&utm_content=review_section
```

### UTM Parameter Reference:
| Parameter      | Value                              | What It Tracks                      |
|----------------|------------------------------------|-------------------------------------|
| utm_source     | instagram / tiktok / facebook / whatsapp | Which platform sent the visitor |
| utm_medium     | social                             | Channel type (social media)         |
| utm_campaign   | glowskin_review_trust_campaign     | Campaign name (same across all)     |
| utm_content    | hero_cta / product_card / etc.     | Which specific element was clicked  |

### See UTM data in GA4:
Reports → Acquisition → Traffic Acquisition → filter by "Session source"

---

## SECTION 8 — CONVERSION FUNNEL

### Written Funnel Structure:
```
STAGE 1: Awareness (Social Media Campaign / UTM Link)
         ↓ GA4 Event: session_start, page_view
STAGE 2: Interest (Landing Page Visit — Home Section)
         ↓ GA4 Event: section_view (home)
STAGE 3: Consideration (Product Page View)
         ↓ GA4 Event: section_view (products) / shop_now_click
STAGE 4: Evaluation (Review Section View)
         ↓ GA4 Event: section_view (reviews) / read_reviews_click
STAGE 5: Trust Building (Reviews Read + Social Proof Seen)
         ↓ GA4 Event: section_view (social) / social_*_click
STAGE 6: Action Intent (Google Form Click)
         ↓ GA4 Event: form_link_click / submit_review_click
STAGE 7: Conversion (Survey / Review Submitted)
         ↓ Google Forms response recorded in Google Sheets
STAGE 8: Loyalty Indicator (Purchase Intention measured via Q16 + NPS via Q20)
         ↓ Analysed in Python (Colab)
```

### Mermaid.js Flowchart (paste into mermaid.live to visualise):
```
flowchart TD
    A["📱 Social Media Campaign\n(Instagram / TikTok / Facebook / WhatsApp)"]
    B["🌐 Website Landing Page\nGA4: page_view, session_start"]
    C["🛍️ Product Page View\nGA4: section_view — products"]
    D["⭐ Review Section View\nGA4: read_reviews_click"]
    E["🤝 Trust Building\nSocial Proof + Reviews Seen"]
    F["📋 Google Form Click\nGA4: form_link_click"]
    G["✅ Survey Submitted\nGoogle Sheets Response"]
    H["💰 Purchase Intention\nMeasured via Q16 + NPS Q20"]

    A -->|UTM Link| B
    B -->|Scrolls down| C
    C -->|Reads reviews| D
    D -->|Trusts brand| E
    E -->|Clicks survey| F
    F -->|Completes form| G
    G -->|Score analysed| H

    style A fill:#f0d9d0,stroke:#c97b7b
    style H fill:#d4ede4,stroke:#8fac8a
```

---

## SECTION 9 — SCREENSHOTS TO TAKE FOR ASSIGNMENT

Take these screenshots and label them for your journal article / presentation:

1. **Hero Section** — Full home page with stats (4.7★, 250+, 10k+)
2. **Products Grid** — All 6 product cards with prices in LKR
3. **Reviews Section** — Rating summary bar + review cards
4. **Google Form Embed** — Showing the survey embedded or linked
5. **Social Proof Cards** — All 4 platforms (Instagram, TikTok, Facebook, WhatsApp)
6. **GA4 Realtime Report** — While you are on the website
7. **GA4 Events List** — Events → show your custom events
8. **GA4 Acquisition** — UTM sources comparison
9. **Meta Pixel Helper** — Chrome extension showing green (pixel active)
10. **Google Sheets** — Showing collected responses columns
11. **Mobile View** — Phone screenshot showing responsive design
12. **Funnel Diagram** — From Mermaid.live or drawn in Canva

---

## SECTION 10 — HOW THIS WEBSITE SUPPORTS YOUR JOURNAL ARTICLE

**E-Commerce & Digital Marketing Paper:**
- The website IS the research instrument — it simulates a real social commerce experience
- Hero stats (4.7★, 250+ reviews, 10k followers) demonstrate "social proof" — a key variable
- UTM links measure which social channel drives the most engagement (RQ: which platform is most influential?)
- Google Forms survey collects primary data for your Likert scale analysis
- GA4 tracks real behavioural data (clicks, section views, time on page)

**Big Data Analytics Paper:**
- Q18 (open text review field) generates the review corpus for your NLP/sentiment analysis
- Q17 (star rating) gives ground truth labels for sentiment classification
- Q20 (NPS) gives you a loyalty/purchase intention score to analyse
- The review cards on the website mirror the type of data in your Amazon review dataset

**In your paper, write:**
> "A demo e-commerce website (GlowSkin Naturals) was created using HTML/CSS/JavaScript and hosted on Netlify. Google Analytics 4 was integrated with custom event tracking to monitor user engagement. A Google Form survey embedded within the website collected primary data from [N] respondents. UTM parameters were used to simulate and compare social media campaign performance across four platforms."

---

## SECTION 11 — WEBSITE COMPLETION CHECKLIST

□ index.html opened in browser and looks correct
□ All 6 sections visible: Home, Products, Reviews, Social, About, Contact
□ Mobile responsive (test by resizing browser window)
□ GA4 Measurement ID replaced (G-S4M1JQSBMB → your real ID)
□ Meta Pixel ID replaced (META_PIXEL_ID_HERE → your real ID)
□ Google Form created with all 20 questions
□ Google Form link pasted (https://docs.google.com/forms/d/e/1FAIpQLSfaPi4slLabPhe-GNXSVw2Zmjw1OLrXjboKRof2g9LixX2TIg/viewform?usp=header → your real URL)
□ Google Form iframe embed pasted in reviews section
□ Google Sheets connected to Google Form
□ Site deployed to Netlify or GitHub Pages
□ GA4 Realtime report shows active users
□ Meta Pixel Helper Chrome extension shows green
□ UTM links updated with your real Netlify URL
□ All 12 screenshots taken for assignment
□ Funnel diagram created (Mermaid or Canva)
□ Academic disclaimer visible on every page load
