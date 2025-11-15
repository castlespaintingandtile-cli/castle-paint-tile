import { api } from "encore.dev/api";
import db from "../db";

export interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: Date;
}

export interface ListContactsResponse {
  submissions: ContactSubmission[];
}

export const list = api<void, ListContactsResponse>(
  { expose: true, method: "GET", path: "/contact/list" },
  async () => {
    const rows = await db.query`
      SELECT 
        id,
        name,
        phone,
        email,
        project_type as "projectType",
        message,
        created_at as "createdAt"
      FROM contact_submissions
      ORDER BY created_at DESC
    `;

    const submissions: ContactSubmission[] = [];
    for await (const row of rows) {
      submissions.push({
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email,
        projectType: row.projectType,
        message: row.message,
        createdAt: row.createdAt,
      });
    }

    return { submissions };
  }
);
