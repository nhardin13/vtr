# Analytics Setup Guide

## Google Analytics 4 (GA4) Setup

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Create" or "Admin" > "Create Property"
3. Enter property details:
   - Property name: "Valley Top Repair"
   - Reporting timezone: Eastern Time
   - Currency: USD
4. Select your business type and details
5. Accept the terms and create property

### Step 2: Get Your Measurement ID
1. In Google Analytics, go to Admin > Data Streams
2. Select your web data stream
3. Copy the **Measurement ID** (format: G-XXXXXXXXXX)

### Step 3: Configure Valley Top Repair Website
Add your GA4 Measurement ID to `hugo.toml`:
```toml
googleAnalyticsID = "G-XXXXXXXXXX"  # Replace with your Measurement ID
```

Or set as environment variable:
```powershell
$env:GOOGLE_ANALYTICS_ID = "G-XXXXXXXXXX"
```

## Hotjar Heatmap Analytics Setup

### Step 1: Create Hotjar Account
1. Go to [Hotjar](https://www.hotjar.com/)
2. Sign up for a free account
3. Click "Sites & Apps" > "Add Site"
4. Enter site domain: `www.valleytoprepair.com`

### Step 2: Get Your Hotjar ID
1. Copy your **Hotjar ID** (numeric, visible in tracking code)
2. Configuration in `hugo.toml`:
```toml
hotjarID = "1234567"  # Replace with your Hotjar ID
```

Or set as environment variable:
```powershell
$env:HOTJAR_ID = "1234567"
```

## Analytics Events Being Tracked

### GA4 Events
- **Form Submissions**: Tracks contact form submissions
- **CTA Clicks**: Tracks buttons with `data-analytics-event` attribute
- **Outbound Links**: Tracks external link clicks
- **Pricing Toggle**: Tracks Residential/Commercial pricing tier changes
- **Scroll Depth**: Tracks user engagement at 25%, 50%, 75%, 100% scroll depth
- **Page Views**: Automatic with GA4 config
- **Service Page Views**: Custom event on services.md page with item details

### Custom Event Attributes
Form the tracking code automatically includes:
- `event_category`: Categorizes event type (engagement, outbound_link, etc.)
- `event_label`: Specific action label for analysis

## Adding Analytics Attributes to CTAs

To track a CTA button, add data attributes:
```html
<button class="btn btn-primary" 
        data-analytics-event="cta_click" 
        data-analytics-label="Get Started">
  Get Started
</button>
```

## Dashboard Recommendations

### Key Metrics to Monitor
1. **Traffic**: Users, sessions, page views
2. **Engagement**: Scroll depth, time on page, bounce rate
3. **Conversions**: Form submissions, pricing tier clicks
4. **User Flow**: Popular pages, drop-off points

### Heatmap Insights
- **Click Map**: Where users click most
- **Scroll Map**: How far users scroll
- **Move Map**: Mouse movement patterns
- **Session Recording**: Video playback of user sessions

This helps optimize:
- Button placement and styling
- Content sections that get attention
- Form field visibility and CTA positioning
- Service page layout effectiveness

## Testing Analytics Setup

1. Go to `http://localhost:1313` (Hugo dev server)
2. Interact with the site:
   - Fill out contact form
   - Click pricing tiers
   - Scroll through pages
   - Click external links
3. Check GA4 Real-time dashboard within 1-2 minutes
4. Verify events appear in correct categories

## Privacy & Compliance

Current analytics configuration:
- ✅ IP anonymization enabled
- ✅ Ad personalization signals disabled
- ✅ No cookie consent required for basic analytics (EU compliant)
- ⚠️ Consider adding cookie banner for GDPR/CCPA compliance

## Environment Variables (.env file)

Create `.env` file in project root (never commit to git):
```
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
HOTJAR_ID=1234567
GOOGLE_MAPS_API_KEY=your_maps_key
FORMSPREE_ENDPOINT=your_formspree_endpoint
```

Load before building:
```powershell
# Windows PowerShell
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*$' -or $_ -match '^\s*#') { return }
  $key, $value = $_ -split '=', 2
  [Environment]::SetEnvironmentVariable($key.Trim(), $value.Trim(), 'Process')
}

hugo -D
```

## Data Retention

Default GA4 settings:
- Event data retention: 2 months
- User data retention: 14 months
- Upgrade to 50 months with Google Signals enabled

Recommended: Enable Google Signals for better conversion tracking
