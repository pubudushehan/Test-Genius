import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../assets/Pubudu.jpg";

const Aboutme = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full pt-16"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="py-8 px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Main Card */}
          <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>

            {/* Content */}
            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">
                  About PS Education
                </h1>
                <div className="w-24 h-1 bg-white/50 mx-auto mb-6 rounded-full"></div>
              </div>

              {/* Profile Section */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-lg backdrop-blur-sm">
                  <img
                    src={Profile}
                    alt="Pubudu Shehan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Pubudu Shehan
                  </h2>
                  <p className="text-purple-200 text-xl mb-4">
                    ICT Lecturer & Web Developer
                  </p>
                  <p className="text-gray-200 mb-2">
                    Undergraduate at University of Sri Jayewardenepura
                  </p>
                  <p className="text-gray-300">
                    Passionate A/L ICT teacher dedicated to helping students
                    excel in their studies through innovative teaching methods
                    and comprehensive exam preparation.
                  </p>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Teaching */}
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-purple-200 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    A/L ICT Classes
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Complete syllabus coverage</li>
                    <li>• Past paper discussions</li>
                    <li>• Practical sessions</li>
                    <li>• Regular assessments</li>
                  </ul>
                </div>

                {/* Web Development */}
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-purple-200 mb-4">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Web Development
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Custom website design</li>
                    <li>• Responsive development</li>
                    <li>• E-commerce solutions</li>
                    <li>• Website maintenance</li>
                  </ul>
                </div>
              </div>

              {/* Contact Section */}
              <div className="text-center backdrop-blur-md bg-white/5 rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get in Touch
                </h3>
                <p className="text-gray-300 mb-6">
                  Interested in our services? Contact us for more information.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    backdrop-blur-sm border border-white/20"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
