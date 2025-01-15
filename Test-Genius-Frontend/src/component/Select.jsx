import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Select = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    medium: "",
    subject: "",
    year: "",
    paperType: "",
  });
  const [error, setError] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !filters.medium ||
      !filters.subject ||
      !filters.year ||
      !filters.paperType
    ) {
      setError("Please select all fields");
      return;
    }

    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/quiz/select?${queryParams}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "No quiz found with selected criteria"
        );
      }

      const quiz = await response.json();
      navigate("/quiz", { state: { quiz } });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching quiz:", err);
    }
  };

  return (
    <div
      className="min-h-screen w-full pt-16 flex items-center justify-center"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
            <h1 className="text-3xl font-bold text-center text-white mb-8">
              Select Your Quiz
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="transition-all duration-200"
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Medium
                  </label>
                  <select
                    name="medium"
                    value={filters.medium}
                    onChange={handleFilterChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-xl transition-all duration-200"
                  >
                    <option value="" className="text-gray-800">
                      Select Medium
                    </option>
                    <option value="Sinhala" className="text-gray-800">
                      Sinhala
                    </option>
                    <option value="English" className="text-gray-800">
                      English
                    </option>
                  </select>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="transition-all duration-200"
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-xl transition-all duration-200"
                  >
                    <option value="" className="text-gray-800">
                      Select Subject
                    </option>
                    <option value="ICT" className="text-gray-800">
                      ICT
                    </option>
                    <option value="BST" className="text-gray-800">
                      BST
                    </option>
                    <option value="ESFT" className="text-gray-800">
                      ESFT
                    </option>
                    <option value="ET" className="text-gray-800">
                      ET
                    </option>
                  </select>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="transition-all duration-200"
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Year
                  </label>
                  <select
                    name="year"
                    value={filters.year}
                    onChange={handleFilterChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-xl transition-all duration-200"
                  >
                    <option value="" className="text-gray-800">
                      Select Year
                    </option>
                    {Array.from({ length: 14 }, (_, i) => 2024 - i).map(
                      (year) => (
                        <option
                          key={year}
                          value={year}
                          className="text-gray-800"
                        >
                          {year}
                        </option>
                      )
                    )}
                  </select>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="transition-all duration-200"
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Paper Type
                  </label>
                  <select
                    name="paperType"
                    value={filters.paperType}
                    onChange={handleFilterChange}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/40 focus:border-transparent backdrop-blur-xl transition-all duration-200"
                  >
                    <option value="" className="text-gray-800">
                      Select Paper Type
                    </option>
                    <option value="Pastpaper" className="text-gray-800">
                      Past Paper
                    </option>
                    <option value="Model" className="text-gray-800">
                      Model Paper
                    </option>
                  </select>
                </motion.div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-300 text-center text-sm mt-4"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                className="text-center mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-xl shadow-lg backdrop-blur-xl border border-white/20 transition-all duration-200"
                >
                  Start Quiz
                </button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Select;
