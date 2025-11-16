import { useState, useEffect } from "react";
import { Client, Local, Environment } from "@/client";

// Type definitions for deployment compatibility
interface ContactSubmission {
  id: number;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Use production Encore URL when deployed, localhost for development
  const isProduction = !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1');
  const backend = new Client(isProduction ? Environment("castle-paint-tile-backend-ctai") : Local);

  const loadSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await backend.contact.list();
      setSubmissions(response);
    } catch (err) {
      console.error("Failed to load submissions:", err);
      setError("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getProjectTypeLabel = (type: string) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D62828] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Form Submissions
          </h1>
          <p className="text-gray-600">
            Total submissions: {submissions.length}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No contact submissions yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(submission.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {submission.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {submission.phone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {submission.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getProjectTypeLabel(submission.project_type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                        {submission.message || (
                          <span className="italic text-gray-400">
                            No message
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={loadSubmissions}
            className="bg-[#D62828] hover:bg-[#F94144] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
