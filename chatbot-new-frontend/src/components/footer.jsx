import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 pt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">I-venture @ ISB</h2>
            <p className="mb-4">Your AI companion who understands your queries about I-venture @ ISB
            Always there available to answer your queries!</p>
            <p className="mb-4">Reach out to us at <a href="mailto:i-venture@isb.edu">i-venture@isb.edu</a></p>
            {/* <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div> */}
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://i-venture.org/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="https://i-venture.org/about/#team" className="hover:text-white transition-colors">About</a></li>
              <li><a href="https://i-venture.org/connect/" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy;2025 I-venture @ ISB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

