import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client, Local } from "~backend/client";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });

  const backend = new Client(Local);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await backend.contact.submit(formData);

      if (response.success) {
        alert(`Success! ${response.message}`);
        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          message: "",
        });
      } else {
        alert('Failed to submit form. Please call us directly at (941) 447-9191.');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert('Failed to submit form. Please call us directly at (941) 447-9191.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl text-[#0A0A0A] mb-4">
              Request Your Free Estimate
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Tell us about your project and we'll get back to you promptly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(941) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType" className="font-medium">
                Type of Project *
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interior-remodel">Interior Remodeling</SelectItem>
                  <SelectItem value="exterior-remodel">Exterior Remodeling</SelectItem>
                  <SelectItem value="interior-painting">Interior Painting</SelectItem>
                  <SelectItem value="exterior-painting">Exterior Painting</SelectItem>
                  <SelectItem value="bathroom-remodel">Bathroom Remodeling</SelectItem>
                  <SelectItem value="tile-installation">Tile Installation</SelectItem>
                  <SelectItem value="pressure-washing">Pressure Washing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-32"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D62828] hover:bg-[#F94144] text-white text-lg py-6 rounded-lg transition-all"
              size="lg"
            >
              {isSubmitting ? "Submitting..." : "Request Free Estimate"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Or call us directly at <span className="font-semibold text-[#D62828]">(941) 447-9191</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
