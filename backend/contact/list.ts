import { api } from "encore.dev/api";
import db from "../db";
import { readFile } from "fs/promises";
import { join } from "path";

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

// Serve the frontend app
export const serveFrontend = api.raw(
  { expose: true, method: "GET", path: "/" },
  async (req, resp) => {
    try {
      const indexPath = join(__dirname, "../../frontend/dist/index.html");
      console.log("Attempting to read:", indexPath);
      const indexContent = await readFile(indexPath, "utf-8");

      resp.writeHead(200, {
        "Content-Type": "text/html",
        "Cache-Control": "no-cache"
      });
      resp.end(indexContent);
    } catch (error) {
      console.error("Frontend serving error:", error);
      resp.writeHead(500, { "Content-Type": "text/plain" });
      resp.end("Frontend not available: " + error.message);
    }
  }
);
