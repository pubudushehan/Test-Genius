import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile 
} from "firebase/auth";

const Sign = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/selectquiz');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      // Create user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(result.user, {
        displayName: `${firstName} ${lastName}`
      });

      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/selectquiz');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full pt-16"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="py-8 px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>

            {/* Content */}
            <div className="relative p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-200">Join Test Genius today</p>
              </div>

              {/* Google Sign Up Button */}
              <button
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mb-6 group"
                aria-label="Sign up with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </button>

              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-white/20 w-full"></div>
                <span className="bg-transparent px-3 text-white/60 text-sm"></span>
                <div className="border-t border-white/20 w-full"></div>
              </div>

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="Dulitha"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white placeholder-gray-400"
                      placeholder="Pathum"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white placeholder-gray-400"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 border border-white/20 rounded bg-white/10 focus:ring-2 focus:ring-purple-500/50"
                    />
                  </div>
                  <label className="ml-2 text-sm text-gray-200">
                    I agree to the{" "}
                    <a href="#" className="text-purple-300 hover:text-purple-200">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-purple-300 hover:text-purple-200">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
                >
                  Create Account
                </button>
              </form>

              <div className="mt-6 text-center text-gray-200">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-300 hover:text-purple-200"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
