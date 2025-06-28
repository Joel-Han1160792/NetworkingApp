export default function Footer() {
  return (
    <footer className="w-full bg-[#292b32] dark:bg-[#1c1d21] text-white pt-12 pb-8">
      <div className="w-full px-8 md:px-16 xl:px-36">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-3 text-lg">Product</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/" className="hover:text-white transition">Features</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Pricing</a>
              </li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-3 text-lg">Company</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/" className="hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Careers</a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-3 text-lg">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/" className="hover:text-white transition">Blog</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Help Center</a>
              </li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-3 text-lg">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/" className="hover:text-white transition">Privacy Policy</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Terms of Service</a>
              </li>
            </ul>
          </div>
          {/* Column 5 */}
          <div>
            <h3 className="font-bold mb-3 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="/" className="hover:text-white transition">Email Us</a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">Support</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-700 mt-12 mb-4"></div>
      {/* Copyright */}
      <div className="w-full px-8 md:px-16 xl:px-36 flex flex-col md:flex-row md:justify-between items-center">
        <div className="text-sm text-gray-400 mb-3 md:mb-0">
          &copy; {new Date().getFullYear()} NetworkingApp. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
