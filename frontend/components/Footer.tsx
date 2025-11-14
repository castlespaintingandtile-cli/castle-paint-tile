import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const phoneNumber = "941-447-9191";
  const email = "Castlecpti@hotmail.com";

  return (
    <footer className="bg-[#0A0A0A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-michroma text-xl font-bold mb-4 text-[#D62828]">
                CASTLE'S Custom Painting & Tile
              </h3>
              <p className="font-inter text-sm text-[#F2F2F2]">
                Professional interior & exterior remodeling, painting, tile installation, and
                pressure washing services.
              </p>
              <p className="font-inter text-sm text-[#F94144] mt-2 font-semibold">
                Insured & Bonded
              </p>
            </div>

            <div>
              <h4 className="font-michroma text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-3 font-inter text-sm">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-2 text-[#F2F2F2] hover:text-[#D62828] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {phoneNumber}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-[#F2F2F2] hover:text-[#D62828] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-michroma text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 font-inter text-sm text-[#F2F2F2]">
                <li>Interior & Exterior Remodeling</li>
                <li>Interior & Exterior Painting</li>
                <li>Bathroom Remodeling</li>
                <li>Tile Installation</li>
                <li>Pressure Washing</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#4A4A4A] pt-8 text-center">
            <p className="font-inter text-sm text-[#F2F2F2]">
              &copy; {new Date().getFullYear()} Castle's Custom Painting & Tile, Inc. All rights
              reserved.
            </p>
            <p className="font-inter text-xs text-[#4A4A4A] mt-2">
              Serving Sarasota & Manatee County, Florida
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
