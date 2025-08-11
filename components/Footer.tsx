import Link from "next/link"
import { Brain, Mail, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">NextLeap</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              AI-powered career intelligence platform helping professionals make smarter career decisions and
              accelerate their growth.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Linkedin, Mail].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-slate-800 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "How It Works", "Pricing", "API", "Integrations"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact", "Press"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
            },
          ].map((section, index) => (
            <div key={index} className="space-y-6">
              <h3 className="font-bold text-white text-lg">{section.title}</h3>
              <ul className="space-y-3 text-slate-400">
                {section.links.map((label, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      className="hover:text-teal-400 transition-colors duration-200 font-medium hover:translate-x-1 transform inline-block"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 font-medium">© 2024 NextLeap. All rights reserved.</p>
          <p className="text-slate-500 text-sm mt-4 md:mt-0">Made with ❤️ for career growth</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


