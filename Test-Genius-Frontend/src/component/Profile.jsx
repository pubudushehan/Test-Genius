import { useState } from "react";
import NavBar from "./NavBar";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/20 backdrop-blur-sm">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setEditing(!editing)}
                  className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-white/20"
                >
                  {editing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {/* Profile Info Section */}
              <div className="flex-1">
                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 text-white placeholder-white/50 backdrop-blur-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
                    >
                      Save Changes
                    </button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-4">
                        {formData.firstName} {formData.lastName}
                      </h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-white/60">
                            Email
                          </h3>
                          <p className="text-white">user@example.com</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white/60">
                            Member Since
                          </h3>
                          <p className="text-white">January 2024</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white/60">
                            Quizzes Completed
                          </h3>
                          <p className="text-white">24</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white/60">
                            Average Score
                          </h3>
                          <p className="text-white">85%</p>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Achievements
                      </h3>
                      <div className="flex space-x-6">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:transform hover:scale-110 transition-all duration-300">
                            <span className="text-3xl">🏆</span>
                          </div>
                          <span className="text-sm text-white/80 mt-2">
                            Top Score
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:transform hover:scale-110 transition-all duration-300">
                            <span className="text-3xl">⭐</span>
                          </div>
                          <span className="text-sm text-white/80 mt-2">
                            Expert
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:transform hover:scale-110 transition-all duration-300">
                            <span className="text-3xl">🎯</span>
                          </div>
                          <span className="text-sm text-white/80 mt-2">
                            Accurate
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
