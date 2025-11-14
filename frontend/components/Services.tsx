import { Home, Paintbrush, Bath, Droplets } from "lucide-react";

const services = [
  { icon: Home, label: "Interior Remodeling" },
  { icon: Home, label: "Exterior Remodeling" },
  { icon: Paintbrush, label: "Interior Painting" },
  { icon: Paintbrush, label: "Exterior Painting" },
  { icon: Bath, label: "Bathroom Remodeling" },
  { icon: Bath, label: "Tile Installation" },
  { icon: Bath, label: "Floor & Shower Tile" },
  { icon: Droplets, label: "Pressure Washing" },
];

export default function Services() {
  return (
    <section className="py-16 md:py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-michroma text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Our Services
            </h2>
            <p className="font-inter text-lg text-[#4A4A4A] max-w-2xl mx-auto">
              Professional craftsmanship for all your home improvement needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <service.icon className="h-10 w-10 mx-auto mb-4 text-[#D62828]" />
                <p className="font-inter text-sm md:text-base font-medium text-[#0A0A0A]">
                  {service.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
