import { Shield, Award, MapPin } from "lucide-react";

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-michroma text-3xl md:text-4xl font-bold mb-4">
              About Castle's Custom Painting & Tile
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-[#D62828]" />
              <h3 className="font-michroma text-lg font-bold mb-2">
                Insured & Bonded
              </h3>
              <p className="font-inter text-sm text-[#F2F2F2]">
                Full insurance coverage for your peace of mind
              </p>
            </div>

            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-[#D62828]" />
              <h3 className="font-michroma text-lg font-bold mb-2">
                Expert Craftsmanship
              </h3>
              <p className="font-inter text-sm text-[#F2F2F2]">
                Years of experience delivering quality results
              </p>
            </div>

            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-[#D62828]" />
              <h3 className="font-michroma text-lg font-bold mb-2">
                Locally Owned
              </h3>
              <p className="font-inter text-sm text-[#F2F2F2]">
                Proud to serve Sarasota & Manatee, Tampa & St. Petersburg
              </p>
            </div>
          </div>

          <div className="font-inter text-center text-[#F2F2F2] space-y-4">
            <p className="text-lg">
              Castle's Custom Painting & Tile, Inc. is your trusted partner for all interior and
              exterior home improvement projects. Led by Chris, our team brings professional
              expertise and attention to detail to every job.
            </p>
            <p>
              From complete bathroom remodels to exterior pressure washing, we deliver exceptional
              results that transform your home. We're fully insured and bonded, ensuring your
              property is protected throughout every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
