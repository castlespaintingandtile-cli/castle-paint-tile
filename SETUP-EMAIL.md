# Email Notification Setup Guide

## What You Need

To receive email notifications when customers fill out your contact form, you need to set up **Resend** (a free email service).

## Step 1: Get a Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Once logged in, go to **API Keys**
4. Click **Create API Key**
5. Give it a name like "Castle's Painting Website"
6. Copy the API key (starts with `re_...`)

## Step 2: Configure the Secret in Leap

1. In Leap, click **Settings** in the sidebar
2. Find the **Secrets** section
3. Add a new secret:
   - **Name:** `ResendAPIKey`
   - **Value:** Paste your Resend API key from Step 1
4. Save the secret

## Step 3: Verify Your Domain (Important!)

With Resend's free plan, you can only send emails from:
- A verified domain you own, OR
- Your personal email for testing

### Option A: Use Your Domain (Recommended for Production)
1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `castles-painting.com`)
3. Follow instructions to add DNS records
4. Update `/backend/email/email.ts` line 13:
   ```typescript
   from: "Castle's Painting <noreply@your-verified-domain.com>",
   ```

### Option B: Testing Only
For testing, Resend lets you send to your own email address without verification.

## Step 4: Test It!

1. Fill out the contact form on your website
2. Check the email address: `Castlecpti@hotmail.com`
3. You should receive a formatted email with the customer's information

## Email Format

The emails will look like this:

---

**New Contact Form Submission**

**Name:** John Smith  
**Phone:** 941-555-1234  
**Email:** john@example.com  
**Project Type:** Bathroom Remodeling  
**Message:** I need a quote for remodeling my master bathroom.

---

## Troubleshooting

**No emails arriving?**
1. Check the secret is set correctly in Leap Settings
2. Check spam/junk folder
3. Verify your domain in Resend (if using custom domain)
4. Check the browser console for errors

**Still having issues?**
- Email notifications fail silently - the form will still save to database
- Check the admin dashboard at `/admin` to see all submissions
- Password: `castle2024`

## Cost

Resend's free tier includes:
- ✅ 100 emails per day
- ✅ 3,000 emails per month
- ✅ Perfect for small business contact forms

If you exceed this, upgrade to their paid plan ($20/month for unlimited).
