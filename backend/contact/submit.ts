import { api } from "encore.dev/api";
import db from "../db";

export interface SubmitContactRequest {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

export interface SubmitContactResponse {
  success: boolean;
  message: string;
}

// Submits a new contact form inquiry and stores it in the database.
export const submit = api<SubmitContactRequest, SubmitContactResponse>(
  { expose: true, method: "POST", path: "/contact/submit" },
  async (req) => {
    // Validate required fields
    if (!req.name?.trim() || !req.phone?.trim() || !req.email?.trim() || !req.projectType?.trim()) {
      throw new Error("All fields except message are required");
    }

    // Store submission in database
    await db.exec`
      INSERT INTO contact_submissions (name, phone, email, project_type, message)
      VALUES (${req.name}, ${req.phone}, ${req.email}, ${req.projectType}, ${req.message || ""})
    `;

    // TODO: Add email notification integration
    // For now, submissions are stored in the database and can be viewed in the admin panel
    // To send emails, integrate with a service like Resend or SendGrid using secrets

    return {
      success: true,
      message: "Thank you for your inquiry! Chris will contact you shortly.",
    };
  }
);
