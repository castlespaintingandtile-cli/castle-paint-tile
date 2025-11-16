# Local Business Websites with Encore.dev + Vercel

## Overview
This skill provides guidance for building local business websites using Encore.dev for the backend API and Vercel for frontend hosting. It covers architecture decisions, implementation patterns, cost optimization, and practical workflows for agencies or developers building multiple client sites.

## When to Use This Skill
- Building landing pages or full websites for local businesses
- Setting up contact forms, booking systems, or lead capture
- Creating reusable architecture for multiple client sites
- Evaluating whether Encore + Vercel is the right stack choice
- Optimizing costs for small business website deployments

## Initial Discovery Questions

Before providing detailed technical guidance, Claude should ask these questions to understand the user's specific needs:

### 1. Project Scope & Features
**Ask:** "What features does this landing page/website actually need?"

**Why:** This determines whether Encore is necessary at all.

**Decision tree:**
- **Just a contact form** → Encore is overkill; suggest Vercel serverless functions or form services
- **Contact form + simple appointment booking** → Encore makes sense
- **Full booking system with availability, payments, calendar integration** → Definitely use Encore
- **Multiple forms, data persistence, business logic** → Encore is ideal
- **Building a platform to serve many clients** → Shared Encore backend architecture

### 2. Frontend Stack
**Ask:** "What's your frontend looking like? Are you using React/Next.js, or something else?"

**Why:** Integration patterns differ, and the Next.js + Encore starter template saves significant setup time.

**Options:**
- **Next.js** → Use official Next.js + Encore starter template, best integration
- **React (Vite/CRA)** → Standard client generation, manual setup
- **Vue/Svelte** → Client generation works but less documented
- **Plain HTML/Vanilla JS** → Can work but loses type-safety benefits

### 3. Number of Client Sites
**Ask:** "Are you building this as a single site, or planning to build multiple similar sites for different clients?"

**Why:** Architecture and cost optimization strategies differ dramatically.

**Architectures:**
- **Single site** → Simple monorepo, both platforms at basic tiers
- **2-4 sites** → Consider separate backends or evaluate if Encore is cost-effective
- **5-10 sites** → Shared backend with client-specific frontends saves significant costs
- **10+ sites** → Multi-tenant backend with feature flags, theme customization, potentially consider alternatives

### 4. Existing Setup Status
**Ask:** "Have you already set up Encore, Vercel, both, or neither?"

**Why:** Determines starting point and whether to validate their current architecture.

**Responses:**
- **Neither** → Start from scratch with best practices, use starter template
- **Encore already set up** → Build on existing backend, guide frontend integration
- **Vercel already set up** → Add Encore backend, configure API integration
- **Both set up** → Audit current architecture, optimize integration

### 5. Budget Constraints
**Ask:** "What's your budget tolerance? Are you optimizing for development speed or minimal cost?"

**Why:** This stack has cost implications that might not fit all budgets.

**Profiles:**
- **Development speed priority** → Full Encore Pro + Vercel Pro setup justified
- **Balanced** → Self-hosted Encore + Vercel Pro at $25-35/month
- **Cost-sensitive** → Consider alternatives like Cloudflare Pages + self-hosted
- **Enterprise** → Encore Pro with DevOps automation at $163+/month

## Core Architecture Patterns

### Pattern 1: Simple Landing Page (Minimal Backend)
**When:** Contact form only, low complexity, single client

**Stack:**
- Encore backend with single `contact` service
- One API endpoint: `POST /contact/submit`
- PostgreSQL table for submissions
- Resend/SendGrid for email notifications
- Vercel frontend (Next.js or React)

**Cost:** $20-30/month (self-hosted Encore + Vercel Pro)

### Pattern 2: Full Business Website (Medium Backend)
**When:** Multiple forms, booking system, moderate complexity

**Stack:**
- Encore backend with multiple services (contact, booking, user, payment)
- 5-10 API endpoints
- PostgreSQL with multiple tables
- Email service + potentially SMS notifications
- Vercel frontend with multiple pages/routes

**Cost:** $30-50/month (self-hosted Encore + Vercel Pro + services)

### Pattern 3: Multi-Client Platform (Shared Backend)
**When:** Building 5+ similar sites for different clients

**Stack:**
- Single Encore backend with tenant-aware APIs
- Shared services with client-specific configuration
- One PostgreSQL database with client_id columns
- Multiple Vercel projects (one per client) consuming same API
- Shared component library for frontend reusability

**Cost:** $12-22 per site when serving 5-10 clients

## Implementation Workflows

### Workflow 1: Setting Up a New Project from Scratch

1. **Create Encore app from template:**
```bash
encore app create my-business-app --example=ts/nextjs-starter
cd my-business-app
```

2. **Understand the structure:**
```
my-business-app/
├── backend/           # Encore backend
│   ├── contact/      # Contact service
│   │   ├── contact.ts
│   │   └── migrations/
│   └── encore.app    # App config with CORS
└── frontend/         # Next.js frontend
    ├── src/
    │   ├── app/
    │   └── lib/
    │       └── client.ts  # Generated Encore client
    └── package.json
```

3. **Configure CORS in backend/encore.app:**
```json
{
  "id": "my-business-app",
  "global_cors": {
    "allow_origins_without_credentials": [
      "http://localhost:3000",
      "https://*.vercel.app",
      "https://yourdomain.com"
    ],
    "allow_headers": ["Content-Type"],
    "debug": true
  }
}
```

4. **Run backend locally:**
```bash
cd backend
encore run
```

5. **Run frontend locally (separate terminal):**
```bash
cd frontend
npm install
npm run dev
```

6. **Deploy backend:**
   - Push to GitHub
   - Connect GitHub repo to Encore Cloud Dashboard
   - Configure production environment
   - Set root directory to `backend/`

7. **Deploy frontend:**
   - Connect GitHub repo to Vercel
   - Set root directory to `frontend/`
   - Configure environment variables:
     - `NEXT_PUBLIC_ENCORE_APP_ID=<your-app-id>`
     - Or use environment detection in client

### Workflow 2: Adding Encore Backend to Existing Vercel Site

1. **Create Encore app in separate directory:**
```bash
encore app create my-business-backend
cd my-business-backend
```

2. **Build your API endpoints:**
```typescript
// contact/contact.ts
import { api } from "encore.dev/api";

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export const submit = api(
  { expose: true, method: "POST", path: "/contact" },
  async (req: ContactRequest): Promise<{ success: boolean }> => {
    // Implementation
    return { success: true };
  }
);
```

3. **Configure CORS for your Vercel domain:**
```json
{
  "global_cors": {
    "allow_origins_without_credentials": [
      "https://yoursite.vercel.app",
      "https://*.vercel.app"
    ]
  }
}
```

4. **Generate TypeScript client:**
```bash
# After deploying to Encore Cloud
encore gen client <APP-ID> --output=../your-frontend/src/lib/client.ts --env=production
```

5. **Use client in your frontend:**
```typescript
import { Client } from "@/lib/client";

const client = new Client();

// In your form handler
const result = await client.contact.submit({
  name,
  email,
  message
});
```

### Workflow 3: Building Shared Backend for Multiple Clients

1. **Design tenant-aware backend:**
```typescript
// config/config.ts
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("app", { migrations: "./migrations" });

interface ClientConfig {
  client_id: string;
  business_name: string;
  theme_colors: {
    primary: string;
    secondary: string;
  };
  enabled_features: string[];
}

export const getConfig = api(
  { expose: true, method: "GET", path: "/config/:clientId" },
  async ({ clientId }: { clientId: string }): Promise<ClientConfig> => {
    const config = await db.queryRow`
      SELECT business_name, theme_colors, enabled_features
      FROM client_configs
      WHERE client_id = ${clientId}
    `;
    
    return {
      client_id: clientId,
      ...config
    };
  }
);
```

2. **Add client_id to all relevant tables:**
```sql
-- migrations/1_initial.up.sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_client_submissions ON contact_submissions(client_id, created_at);
```

3. **Create separate Vercel projects:**
   - Client A: `clienta.vercel.app` → reads config for "clienta"
   - Client B: `clientb.vercel.app` → reads config for "clientb"
   - All consume same Encore backend API

4. **Shared component library:**
```
project/
├── backend/              # Single Encore backend
├── packages/
│   └── ui/              # Shared components
│       ├── ContactForm.tsx
│       ├── Hero.tsx
│       └── theme.ts
├── sites/
│   ├── client-a/        # Client A's frontend
│   └── client-b/        # Client B's frontend
└── package.json         # npm workspaces
```

## Contact Form Implementation (Most Common Use Case)

### Backend: Encore API

```typescript
// backend/contact/contact.ts
import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { secret } from "encore.dev/config";
import { Resend } from "resend";

const db = new SQLDatabase("contact", { migrations: "./migrations" });
const resendKey = secret("ResendAPIKey");

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export const submit = api(
  { 
    expose: true, 
    method: "POST", 
    path: "/contact/submit",
    auth: false  // Public endpoint
  },
  async (req: ContactRequest): Promise<ContactResponse> => {
    // Validate
    if (!req.name || req.name.length < 2) {
      throw new Error("Name must be at least 2 characters");
    }
    
    if (!req.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
      throw new Error("Invalid email address");
    }
    
    // Save to database
    await db.exec`
      INSERT INTO submissions (name, email, phone, message, created_at)
      VALUES (${req.name}, ${req.email}, ${req.phone || null}, ${req.message}, NOW())
    `;
    
    // Send email notification
    const resend = new Resend(resendKey());
    
    await resend.emails.send({
      from: "noreply@yourdomain.com",
      to: "business@yourdomain.com",
      subject: `New Contact Form Submission from ${req.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${req.name}</p>
        <p><strong>Email:</strong> ${req.email}</p>
        <p><strong>Phone:</strong> ${req.phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${req.message}</p>
      `
    });
    
    return { 
      success: true, 
      message: "Thank you for contacting us. We'll be in touch soon!" 
    };
  }
);
```

### Database Migration

```sql
-- backend/contact/migrations/1_create_submissions.up.sql
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'new'
);

CREATE INDEX idx_submissions_created ON submissions(created_at DESC);
CREATE INDEX idx_submissions_status ON submissions(status);
```

### Frontend: Next.js with React Hook Form

```typescript
// frontend/src/components/ContactForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Client } from "@/lib/client";

const client = new Client();

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("loading");
    setErrorMessage("");
    
    try {
      const result = await client.contact.submit(data);
      
      if (result.success) {
        setSubmitStatus("success");
        reset();
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name *
        </label>
        <input
          id="name"
          type="text"
          {...register("name", { 
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" }
          })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message", { required: "Message is required" })}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={submitStatus === "loading"}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {submitStatus === "loading" ? "Sending..." : "Send Message"}
      </button>
      
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          Thank you! We'll be in touch soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}
    </form>
  );
}
```

## Cost Optimization Strategies

### Strategy 1: Self-Hosting Encore Backend
**Savings:** ~$140/month vs Encore Pro

**Setup:**
1. Deploy Encore Docker container to DigitalOcean, Hetzner, or AWS
2. Use managed PostgreSQL (Neon, Supabase, or cloud provider)
3. Configure environment variables and secrets
4. Set up CI/CD with GitHub Actions

**Trade-offs:**
- Lose automatic infrastructure provisioning
- Manual preview environment setup
- No built-in distributed tracing dashboard
- You manage deployments and scaling

### Strategy 2: Shared Backend Architecture
**Savings:** 40-60% per site when serving 5+ clients

**Implementation:**
- Single Encore backend deployment
- Client-specific configuration in database
- Multiple Vercel projects pointing to same API
- Shared component library for frontend

**Trade-offs:**
- More complex initial setup
- All clients share infrastructure (less isolation)
- Database design requires client_id everywhere
- Potential noisy neighbor issues

### Strategy 3: Cloudflare Alternative
**Savings:** ~$10-15/month per site vs Vercel

**Stack:**
- Cloudflare Pages (free tier or $20/month)
- Self-hosted Encore backend
- Cloudflare Workers for serverless functions (optional)

**Trade-offs:**
- Lose Vercel's automatic Next.js optimization
- Manual preview environment configuration
- Different CDN characteristics
- Encore + Cloudflare less documented than Encore + Vercel

### Strategy 4: Bandwidth Optimization
**Savings:** Prevent Vercel bandwidth overages

**Techniques:**
- Image optimization (next/image with proper sizing)
- Asset compression (automatic on Vercel)
- Edge caching configuration
- CDN for large assets (use Cloudflare R2)
- Lazy loading for images and components

## Common Gotchas and Solutions

### Gotcha 1: CORS Issues
**Symptom:** Frontend can't connect to Encore API, browser console shows CORS errors

**Solution:**
```json
// backend/encore.app
{
  "global_cors": {
    "allow_origins_without_credentials": [
      "http://localhost:3000",
      "https://*.vercel.app",
      "https://yourdomain.com"
    ],
    "allow_headers": ["Content-Type", "Authorization"],
    "debug": true
  }
}
```

**Important:** Must include wildcard `*.vercel.app` for preview deployments

### Gotcha 2: Preview Environments Not Connecting
**Symptom:** Vercel preview deployments can't find Encore preview environment

**Solution:**
```typescript
// frontend/src/lib/client.ts
import { Client, Local, Environment, PreviewEnv } from "./encore-client";

function getClient() {
  // Local development
  if (process.env.NODE_ENV === "development") {
    return new Client(Local);
  }
  
  // Vercel preview (PR builds)
  const prId = process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID;
  if (prId) {
    return new Client(PreviewEnv(prId));
  }
  
  // Production
  return new Client(Environment("production"));
}

export const client = getClient();
```

### Gotcha 3: Vercel Hobby Plan Commercial Use
**Symptom:** Violating Vercel ToS unknowingly

**Solution:** 
- Hobby plan is ONLY for personal, non-commercial projects
- Client work requires Pro plan at minimum ($20/month)
- Read the fine print before launching client sites

### Gotcha 4: Unexpected Vercel Bandwidth Charges
**Symptom:** Bill jumps from $20 to $200+ in a month

**Solution:**
- Set up billing alerts in Vercel dashboard
- Monitor bandwidth usage weekly
- Optimize images and assets
- Consider Cloudflare for high-traffic sites
- Use external CDN for large files

### Gotcha 5: Encore Only Supports PostgreSQL
**Symptom:** Need MySQL or MongoDB for client requirements

**Solution:**
- Use PostgreSQL (it's excellent and most versatile)
- Connect to external databases using standard drivers (loses Encore's automatic provisioning)
- Consider if Encore is right fit for the project

## When NOT to Use This Stack

### Don't use Encore + Vercel if:

1. **Extremely simple static site**
   - Use: Vercel + serverless functions or form services like Formspree
   - Why: Simpler, cheaper, faster to build

2. **Client requires specific database (MySQL, MongoDB)**
   - Use: Traditional backend framework (Express, NestJS)
   - Why: Encore only supports PostgreSQL natively

3. **Budget is extremely tight (< $10/month)**
   - Use: Cloudflare Pages + free-tier backend, or pure static
   - Why: Vercel Pro requirement makes this stack more expensive

4. **Team unfamiliar with TypeScript**
   - Use: PHP, Python, or Ruby frameworks they know
   - Why: Learning curve not justified for simple projects

5. **High-traffic site (1M+ visitors/month)**
   - Use: Consider dedicated infrastructure
   - Why: Vercel bandwidth costs become prohibitive

6. **Requires specific framework (Laravel, Django, Rails)**
   - Use: That framework's preferred hosting
   - Why: Encore only supports TypeScript/Go

7. **Need complete infrastructure control**
   - Use: AWS/GCP/Azure with traditional stack
   - Why: Encore's abstraction may be too limiting

## Quick Decision Tree

```
Is it just a contact form?
├─ Yes → Use Vercel serverless function + form service
└─ No, needs booking/scheduling/complex logic
   └─ Building 1-2 sites?
      ├─ Yes → Encore + Vercel works, evaluate cost vs alternatives
      └─ No, building 5+ similar sites
         └─ Yes → Shared Encore backend architecture makes sense
```

## Success Metrics

After implementing, track these to validate the stack choice:

1. **Development velocity**: Time from starting to deployed MVP
2. **Deployment frequency**: How often you can safely ship changes
3. **Bug rate**: API integration bugs (should be very low with type-safety)
4. **Monthly cost per site**: Should be $12-35 range for optimal architecture
5. **Time spent on DevOps**: Should be <10% of development time

## Additional Resources

- Encore Documentation: https://encore.dev/docs
- Vercel Documentation: https://vercel.com/docs
- Encore + Next.js Starter: https://github.com/encoredev/nextjs-starter
- Encore Examples: https://github.com/encoredev/examples
- Resend Email API: https://resend.com/docs
- React Hook Form: https://react-hook-form.com

## Summary

This stack excels at:
- Type-safe full-stack development
- Rapid prototyping and iteration
- Preview environments for testing
- Scaling from 1 to 10+ client sites

Consider alternatives when:
- Budget is extremely tight
- Project is very simple (static + contact form)
- Team lacks TypeScript expertise
- Client requires non-PostgreSQL database

The key is asking the right questions upfront to determine if this stack's benefits justify its learning curve and cost structure for your specific use case.