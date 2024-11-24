import React, { useState } from "react";

const TestGenius = () => {
  const [language, setLanguage] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [paperType, setPaperType] = useState("");

  const handleStart = () => {
    console.log({ language, subject, year, paperType });
    alert("Start button clicked with selected options.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 mt-16">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Select Your Quiz
        </h2>
        <form className="mt-8 space-y-6">
          {/* Language Dropdown */}
          <div>
            <label
              htmlFor="language"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="sinhala">Sinhala</option>
              <option value="english">English</option>
            </select>
          </div>

          {/* Subject Dropdown */}
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="ict">ICT</option>
              <option value="maths">Maths</option>
              <option value="science">Science</option>
              <option value="sft">SFT</option>
              <option value="et">ET</option>
              <option value="bst">BST</option>
            </select>
          </div>

          {/* Year Dropdown */}
          <div>
            <label
              htmlFor="year"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select Year</option>
              {[...Array(14)].map((_, index) => {
                const year = 2011 + index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Paper Type Dropdown */}
          <div>
            <label
              htmlFor="paperType"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Paper Type
            </label>
            <select
              id="paperType"
              value={paperType}
              onChange={(e) => setPaperType(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="model-paper">Model Paper</option>
              <option value="past-paper">Past Paper</option>
            </select>
          </div>

          {/* Start Button */}
          <button
            type="button"
            onClick={handleStart}
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestGenius;
