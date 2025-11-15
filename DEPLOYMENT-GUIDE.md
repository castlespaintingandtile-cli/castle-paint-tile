# Deployment Guide

This guide covers pre-deployment testing, deployment procedures, and post-handoff procedures for the Castle Painting landing page application.

## Pre-Deployment Procedures

### 1. Backend Testing

#### Test Database Connection
```bash
# Check database migrations are applied
encore db list
```

#### Test API Endpoints

**Test Contact Submission:**
```typescript
// Use ApiCall tool or manual curl
curl -X POST https://castles-painting-tile-landing-page-d4bii0482vjpue0f4ga0.api.lp.dev/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-0123",
    "message": "Test message",
    "service": "interior"
  }'
```

**Test Contact List Retrieval:**
```typescript
// Use ApiCall tool
curl https://castles-painting-tile-landing-page-d4bii0482vjpue0f4ga0.api.lp.dev/contact/list
```

#### Test Email Service
```bash
# Verify email service is configured
# Check backend/email/email.ts has correct RESEND_API_KEY secret
# Test email sending through contact form submission
```

#### Verify Database
```sql
-- Use QueryDB tool to verify contacts table
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5;

-- Check table structure
\d contacts
```

### 2. Frontend Testing

#### Test All Pages
- [ ] Home page loads correctly
- [ ] Hero section displays properly
- [ ] Services section shows all services
- [ ] Gallery loads images
- [ ] About section renders
- [ ] Contact form validates input
- [ ] Contact form submits successfully
- [ ] Toast notifications appear
- [ ] Admin page accessible
- [ ] Admin dashboard loads contacts
- [ ] QR code generator works

#### Test Responsive Design
- [ ] Mobile view (320px - 640px)
- [ ] Tablet view (641px - 1024px)
- [ ] Desktop view (1025px+)

#### Test Form Validation
- [ ] Empty fields show errors
- [ ] Invalid email format rejected
- [ ] Phone number validation works
- [ ] Service selection required
- [ ] Success message after submission

### 3. Build Testing

```bash
# Run build check
encore build

# Check for TypeScript errors
cd backend && npx tsc --noEmit
cd frontend && npx tsc --noEmit

# Run tests if available
encore test
```

### 4. Environment Verification

#### Backend Secrets
- [ ] `RESEND_API_KEY` configured in Settings
- [ ] Email service domain verified
- [ ] Database connection string valid

#### Frontend Configuration
- [ ] API endpoints pointing to correct backend
- [ ] Asset paths correct
- [ ] Public URLs accessible

## Deployment Procedures

### Automatic Deployment (Leap Environment)
Encore automatically deploys on file changes. No manual deployment needed.

### Manual Deployment Verification
```bash
# Check deployment status
encore deploy --status

# View deployment logs
encore logs
```

### Database Migration
```bash
# Apply pending migrations
encore db migrate

# Rollback if needed
encore db migrate --down
```

## Post-Deployment Verification

### 1. Smoke Tests

**Frontend:**
- Visit: https://castles-painting-tile-landing-page-d4bii0482vjpue0f4ga0.lp.dev
- Verify page loads without errors
- Submit test contact form
- Check admin dashboard displays contacts

**Backend:**
- Test API health endpoint
- Verify contact submission works
- Check email delivery
- Confirm database writes

### 2. Monitor Logs
```bash
# Watch application logs
encore logs --follow

# Check for errors
encore logs --level error
```

### 3. Database Health Check
```sql
-- Verify recent submissions
SELECT COUNT(*) FROM contacts WHERE created_at > NOW() - INTERVAL '24 hours';

-- Check for data integrity
SELECT COUNT(*) as total_contacts FROM contacts;
```

## Post-Handoff Procedures

### For Client Handoff

#### 1. Access Documentation
Provide client with:
- [ ] Frontend URL: https://castles-painting-tile-landing-page-d4bii0482vjpue0f4ga0.lp.dev
- [ ] Admin dashboard access instructions
- [ ] How to view contact submissions
- [ ] QR code files location: `/qr-codes/`

#### 2. Configuration Handoff
- [ ] Share Resend API key setup instructions (see SETUP-EMAIL.md)
- [ ] Document how to update content
- [ ] Explain how to add/modify services
- [ ] Show how to update gallery images

#### 3. Maintenance Tasks
- [ ] Weekly: Check contact form submissions
- [ ] Monthly: Review database size
- [ ] As needed: Update service offerings
- [ ] As needed: Refresh gallery images

### For Developer Handoff

#### 1. Codebase Overview
```
backend/
  ├── contact/        # Contact form API endpoints
  ├── email/          # Email service integration
  └── db/             # Database and migrations

frontend/
  ├── components/     # React components
  ├── assets/         # Static assets
  └── App.tsx         # Main application
```

#### 2. Key Files
- `backend/contact/submit.ts` - Contact form submission logic
- `backend/email/email.ts` - Email sending service
- `frontend/components/ContactForm.tsx` - Contact form UI
- `frontend/components/AdminDashboard.tsx` - Admin interface

#### 3. Development Workflow
```bash
# Make changes to code
# Leap automatically rebuilds and deploys

# Test changes
npm run test

# Check build
encore build
```

#### 4. Common Tasks

**Add New Service:**
1. Update `frontend/components/Services.tsx`
2. Add service to form dropdown in `ContactForm.tsx`
3. Update email template in `backend/email/email.ts`

**Modify Contact Form:**
1. Edit `frontend/components/ContactForm.tsx`
2. Update backend validation in `backend/contact/submit.ts`
3. Update database schema if needed

**Update Gallery:**
1. Add images to `frontend/assets/`
2. Update `frontend/components/Gallery.tsx`
3. Optimize images for web

## Troubleshooting

### Contact Form Not Submitting
- Check browser console for errors
- Verify API endpoint is accessible
- Check backend logs for errors
- Confirm database connection

### Emails Not Sending
- Verify RESEND_API_KEY in Settings
- Check email domain verification
- Review backend logs for email service errors
- Test with Resend dashboard

### Database Issues
- Check migration status: `encore db list`
- Verify connection string
- Review database logs
- Check disk space

### Build Failures
- Review TypeScript errors
- Check dependency versions
- Clear build cache
- Verify all imports resolve

## Rollback Procedures

### Code Rollback
```bash
# Revert to previous version
git revert <commit-hash>
git push

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force
```

### Database Rollback
```bash
# Rollback last migration
encore db migrate --down

# Rollback to specific version
encore db migrate --to <version>
```

## Support Contacts

### Services Used
- **Hosting:** Leap (encore.dev)
- **Email:** Resend
- **Database:** PostgreSQL (Encore managed)

### Documentation Links
- Encore.ts Docs: https://encore.dev/docs
- Resend Docs: https://resend.com/docs
- React Docs: https://react.dev

## Security Checklist

- [ ] No secrets in code
- [ ] API keys in Settings only
- [ ] Database credentials secured
- [ ] Email service authenticated
- [ ] HTTPS enforced
- [ ] Input validation on all forms
- [ ] SQL injection protection via parameterized queries
- [ ] XSS protection via React sanitization
