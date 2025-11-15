import { api } from "encore.dev/api";
import db from "../db";
import { sendEmail } from "../email/email";

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

const getProjectTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    "interior-remodel": "Interior Remodeling",
    "exterior-remodel": "Exterior Remodeling",
    "interior-painting": "Interior Painting",
    "exterior-painting": "Exterior Painting",
    "bathroom-remodel": "Bathroom Remodeling",
    "tile-installation": "Tile Installation",
    "pressure-washing": "Pressure Washing",
    "other": "Other",
  };
  return labels[type] || type;
};

export const submit = api<SubmitContactRequest, SubmitContactResponse>(
  { expose: true, method: "POST", path: "/contact/submit" },
  async (req) => {
    if (!req.name?.trim() || !req.phone?.trim() || !req.email?.trim() || !req.projectType?.trim()) {
      throw new Error("All fields except message are required");
    }

    await db.exec`
      INSERT INTO contact_submissions (name, phone, email, project_type, message)
      VALUES (${req.name}, ${req.phone}, ${req.email}, ${req.projectType}, ${req.message || ""})
    `;

    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D62828;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${req.name}</p>
            <p><strong>Phone:</strong> ${req.phone}</p>
            <p><strong>Email:</strong> ${req.email}</p>
            <p><strong>Project Type:</strong> ${getProjectTypeLabel(req.projectType)}</p>
            ${req.message ? `<p><strong>Message:</strong><br/>${req.message}</p>` : ""}
          </div>
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Castle's Custom Painting & Tile contact form.
          </p>
        </div>
      `;

      await sendEmail({
        to: "Castlecpti@hotmail.com",
        subject: `New Contact: ${req.name} - ${getProjectTypeLabel(req.projectType)}`,
        html: emailHtml,
      });
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }

    return {
      success: true,
      message: "Thank you for your inquiry! Chris will contact you shortly.",
    };
  }
);
