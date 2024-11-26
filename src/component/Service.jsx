import React from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  // Sample class posts - you can replace these with actual data
  const classPosts = [
    {
      date: "2024-03-20",
      title: "A/L ICT Revision Class",
      time: "8:00 AM - 11:00 AM",
      location: "PS Education Institute",
      description: "Complete paper discussion and exam techniques"
    },
    {
      date: "2024-03-25",
      title: "Theory Class - Chapter 4",
      time: "2:00 PM - 5:00 PM",
      location: "PS Education Institute",
      description: "Database Management Systems"
    }
  ];

  return (
    <div 
      className="min-h-screen w-full"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      <NavBar showlogin={true} />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-24 pb-32 overflow-hidden"
      >
        <div className="relative container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Empowering students with quality education and providing professional web solutions
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Explore Services
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card - ICT Classes */}
          <motion.div
            whileHover={{ y: -10 }}
            className="group relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 dark:from-violet-500/10 dark:to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8">
              <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                A/L ICT Classes
              </h3>
              <ul className="space-y-3 text-gray-200 mb-6">
                <li>• Complete syllabus coverage</li>
                <li>• Past paper discussions</li>
                <li>• Practical sessions</li>
                <li>• Model paper practice</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Revision Classes */}
          <motion.div
            whileHover={{ y: -10 }}
            className="group relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 dark:from-violet-500/10 dark:to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8">
              <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Revision Classes
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                <li>• Exam preparation</li>
                <li>• Question paper analysis</li>
                <li>• Quick revision sessions</li>
                <li>• Mock exams</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* Web Development */}
          <motion.div
            whileHover={{ y: -10 }}
            className="group relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 dark:from-fuchsia-500/10 dark:to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="p-8">
              <div className="w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Web Development
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                <li>• Custom website design</li>
                <li>• Responsive development</li>
                <li>• E-commerce solutions</li>
                <li>• Website maintenance</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upcoming Classes Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Upcoming Classes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {classPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="text-gray-200">
                    {post.date} | {post.time}
                  </p>
                </div>
                <span className="bg-white/10 text-white text-xs font-medium px-2.5 py-0.5 rounded border border-white/20">
                  New
                </span>
              </div>
              <p className="text-gray-200 mb-2">
                {post.description}
              </p>
              <p className="text-gray-300">
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {post.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative container mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contact us to learn more about our services or enroll in our classes
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    backdrop-blur-sm border border-white/20"
            >
            Contact Us
            </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Services; 