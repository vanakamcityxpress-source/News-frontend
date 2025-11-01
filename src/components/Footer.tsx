import { Facebook, Twitter, Youtube, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/cityexpresslogo.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-10">
          
          {/* Column 1 - About Section */}
          <div className="md:col-span-2">
            <img src={logo} alt="Vanakkam City Xpress" className="h-12 mb-4" />
            <p className="text-gray-400 leading-relaxed text-sm">
              வணக்கம் சிட்டி எக்ஸ்பிரஸ் - நம்பிக்கையுடன் வாசிக்கப்படும் தமிழ் செய்தி தளம். 
              அரசியல், உலகம், விளையாட்டு, சினிமா, தொழில்நுட்பம் என அனைத்தையும் ஒரே இடத்தில்!
            </p>
            <div className="mt-6 flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#1DA1F2] transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#E4405F] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#FF0000] transition-colors"><Youtube size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#0A66C2] transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Column 2 - News */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-lg relative">
              News
              <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-[#006ABA] rounded"></span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">தேசிய செய்திகள்</a></li>
              <li><a href="#" className="hover:text-white transition-colors">உலக செய்திகள்</a></li>
              <li><a href="#" className="hover:text-white transition-colors">மாநில செய்திகள்</a></li>
              <li><a href="#" className="hover:text-white transition-colors">சிறப்பு கட்டுரைகள்</a></li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-lg relative">
              Support Us
              <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-[#006ABA] rounded"></span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">தொடர்பு</a></li>
              <li><a href="#" className="hover:text-white transition-colors">சந்தா</a></li>
              <li><a href="#" className="hover:text-white transition-colors">நன்கொடை</a></li>
              <li><a href="#" className="hover:text-white transition-colors">விளம்பரம்</a></li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-lg relative">
              Contact
              <span className="absolute left-0 -bottom-1 w-10 h-[2px] bg-[#006ABA] rounded"></span>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><MapPin size={16} /> சென்னை, தமிழ்நாடு</li>
              <li className="flex items-start gap-2"><Mail size={16} /> contact@cityexpress.in</li>
              <li className="flex items-start gap-2"><Phone size={16} /> +91 98765 43210</li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Vanakkam City Xpress. All rights reserved.</p>
          <p className="mt-1 text-gray-400">
            Powered by <span className="text-[#006ABA] font-semibold hover:underline">Web Media 6</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
