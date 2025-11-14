import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import backend from "~backend/client";

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await backend.contact.submit(formData);

      if (response.success) {
        toast({
          title: "Success!",
          description: response.message,
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          projectType: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-michroma text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Request Your Free Estimate
            </h2>
            <p className="font-inter text-lg text-[#4A4A4A]">
              Tell us about your project and we'll get back to you promptly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-inter font-medium">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="font-inter"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-inter font-medium">
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="font-inter"
                placeholder="(941) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-inter font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="font-inter"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType" className="font-inter font-medium">
                Type of Project *
              </Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                required
              >
                <SelectTrigger className="font-inter">
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
              <Label htmlFor="message" className="font-inter font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="font-inter min-h-32"
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D62828] hover:bg-[#F94144] text-white font-inter text-lg py-6 rounded-lg transition-all"
            >
              {isSubmitting ? "Submitting..." : "Request Free Estimate"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
