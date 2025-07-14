"use client"
import axios from "axios"
import { useState } from "react"
import { ChefHat, Mail, Lock } from "lucide-react"

export default function LoginPage({ onNavigate, onLogin }) {
  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_CALL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`${BACKEND_API}/api/users/login`, {
      email: formData.email,
      password: formData.password,
    })

    // Assuming your backend sends back a token or user data
    const { token, user } = response.data

    // Optionally store token in localStorage
    localStorage.setItem("token", token)

    // Trigger your login handler
    onLogin(user)  // Pass user if needed

  } catch (error) {
    console.error("Login error:", error)
    alert(
      error.response?.data?.message || "Login failed. Please check your credentials."
    )
  }
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7FFF7] to-[#4ECDC4]/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <ChefHat className="h-12 w-12 text-[#FF6B6B]" />
            <h2 className="text-3xl font-bold text-gray-800">Virtual Cook</h2>
          </div>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent outline-none transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#FF6B6B] text-white rounded-xl font-semibold hover:bg-[#FF6B6B]/90 transition-colors shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => onNavigate("login")}
                className="text-[#4ECDC4] hover:text-[#4ECDC4]/80 font-semibold"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
