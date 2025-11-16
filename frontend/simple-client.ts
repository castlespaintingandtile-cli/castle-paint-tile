// Simple API client for Castle's Custom Painting & Tile
// This replaces the Encore client for Vercel deployment

const BASE_URL = import.meta.env.VITE_API_URL || 'https://castle-paint-tile-backend-ctai.encr.app';

export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  message: string;
  created_at: string;
}

class SimpleAPIClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || BASE_URL;
  }

  async submitContact(request: ContactRequest): Promise<ContactResponse> {
    const response = await fetch(`${this.baseURL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getContacts(): Promise<ContactSubmission[]> {
    const response = await fetch(`${this.baseURL}/contact/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new SimpleAPIClient();
export default apiClient;