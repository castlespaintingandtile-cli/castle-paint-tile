# Custom Domain Setup Guide
**Domain:** castlescustompaintandtilefl.com
**Project:** Castle's Custom Painting & Tile Landing Page

## Vercel Domain Setup Steps

### Step 1: Add Domain in Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add" and enter: `castlescustompaintandtilefl.com`
3. Vercel will show DNS configuration

### Step 2: Update DNS Records

**Option A: Use Vercel Nameservers (Recommended)**
- Go to your domain registrar (GoDaddy, Namecheap, etc.)
- Update nameservers to:
  - `ns1.vercel-dns.com`
  - `ns2.vercel-dns.com`

**Option B: A Record Configuration**
- Keep your current nameservers
- Add these A records:
  - Type: A, Name: `@`, Value: `76.76.21.21`
  - Type: A, Name: `@`, Value: `76.76.21.22`

### Step 3: Verify Configuration
1. DNS changes take 5-30 minutes to propagate
2. Vercel will automatically detect and issue SSL certificate
3. Once verified, your site will be live at `castlescustompaintandtilefl.com`

### Step 4: Update Backend API URL
After domain is live, update frontend to use production backend:
1. Update `client.ts` with production backend URL
2. Redeploy to Vercel

## Current Status
- ✅ Frontend deployed to Vercel
- ✅ Backend deployed to Encore.dev
- ⏳ Domain setup in progress
- ⏳ DNS configuration needed