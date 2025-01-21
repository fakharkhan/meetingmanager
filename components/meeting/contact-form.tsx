import React, { useState } from "react";
import { Phone, Video, Users, ChevronDown } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ContactFormProps {
  selectedMeetingType: "online" | "phone" | "in-person";
  nameInputRef?: React.RefObject<HTMLInputElement>;
  selectedDate: string;
  selectedTime: string;
  discussionTopic: string;
  onSubmit: (formData: {
    name: string;
    email?: string;
    phone?: string;
    countryCode?: string;
    discussionTopic: string;
    date: string;
    time: string;
  }) => void;
}

const POPULAR_COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  // Add more as needed
];

// Add or update the interface for form errors
interface FormErrors {
  email?: string;
  phone?: string;
  meetingType?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ 
  selectedMeetingType,
  nameInputRef,
  selectedDate,
  selectedTime,
  discussionTopic,
  onSubmit
}) => {
  const [selectedCountry, setSelectedCountry] = useState(POPULAR_COUNTRY_CODES[3]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: FormErrors = {};

    // Clear previous errors
    setErrors({});

    // Validate all fields first
    let hasErrors = false;

    // Validate meeting type
    if (!selectedMeetingType) {
      toast.error("Please select a meeting type", {
        position: "top-center",
        autoClose: 3000,
      });
      hasErrors = true;
    }

    // Validate discussion topic
    if (!discussionTopic?.trim()) {
      toast.error("Please enter discussion topics", {
        position: "top-center",
        autoClose: 3000,
      });
      hasErrors = true;
    }

    // Validate time selection
    if (!selectedTime) {
      toast.error("Please select a time slot", {
        position: "top-center",
        autoClose: 3000,
      });
      hasErrors = true;
    }

    // Validate email for online meetings
    if (selectedMeetingType === 'online') {
      const email = formData.get('email') as string;
      if (!email) {
        newErrors.email = "Email is required for online meetings";
        hasErrors = true;
      }
    }

    // Validate phone for phone meetings
    if (selectedMeetingType === 'phone') {
      const phone = formData.get('phone') as string;
      if (!phone) {
        newErrors.phone = "Phone number is required for phone meetings";
        hasErrors = true;
      }
    }

    // If there are any errors, don't submit
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const submitData = {
      name: formData.get('name') as string,
      discussionTopic,
      date: selectedDate,
      time: selectedTime,
      ...(selectedMeetingType === 'online' && {
        email: formData.get('email') as string
      }),
      ...(selectedMeetingType === 'phone' && {
        phone: formData.get('phone') as string,
        countryCode: selectedCountry.code
      })
    };

    try {
      await onSubmit(submitData);
      toast.success('Meeting scheduled successfully!', {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error('Failed to schedule meeting. Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

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
    <div className="w-full">
      <ToastContainer />
      <form className="space-y-6" onSubmit={handleSubmit}>
        {errors.meetingType && (
          <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
            {errors.meetingType}
          </div>
        )}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="contact-name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {selectedMeetingType === "online" && (
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        )}

        {selectedMeetingType === "phone" && (
          <div className="space-y-2">
            <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
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
                  id="contact-phone"
                  name="phone"
                  className={`w-full h-[42px] pl-24 pr-4 bg-white border rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-shadow ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="321 4443901"
                  required
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}

                {isDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
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