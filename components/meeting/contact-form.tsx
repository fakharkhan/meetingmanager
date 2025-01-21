import React, { useState } from "react";
import { Phone, Video, Users, ChevronDown } from "lucide-react";

interface ContactFormProps {
  selectedMeetingType: "online" | "phone" | "in-person";
  nameInputRef?: React.RefObject<HTMLInputElement>;
}

const POPULAR_COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  // Add more as needed
];

export const ContactForm: React.FC<ContactFormProps> = ({ 
  selectedMeetingType,
  nameInputRef 
}) => {
  const [selectedCountry, setSelectedCountry] = useState(POPULAR_COUNTRY_CODES[3]); // Default to Pakistan
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getMeetingIcon = () => {
    switch (selectedMeetingType) {
      case "online":
        return <Video className="w-4 h-4 mr-2" />;
      case "phone":
        return <Phone className="w-4 h-4 mr-2" />;
      case "in-person":
        return <Users className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white">
     
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {selectedMeetingType === "online" && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
        )}

        {selectedMeetingType === "phone" && (
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <div className="relative">
              <div className="relative w-full">
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full h-[42px] pl-24 pr-4 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-shadow"
                  placeholder="321 4443901"
                  required
                />

                {isDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-2 max-h-[280px] overflow-auto">
                      {POPULAR_COUNTRY_CODES.map((country) => (
                        <li
                          key={country.code}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center transition-colors"
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <span className="text-lg mr-3">{country.flag}</span>
                          <span className="text-sm font-medium text-gray-700">{country.name}</span>
                          <span className="text-sm text-gray-500 ml-auto">{country.code}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        )}

        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {getMeetingIcon()}
          Schedule Meeting
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Powered by{" "}
        <a 
          href="https://softpyramid.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          SOFT PYRAMID LLC
        </a>
      </div>
    </div>
  );
};