// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-10 flex flex-col">
      <div className="flex w-full">
        <div className="flex-1 p-6">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">Getting Started</div>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Installation</a>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Release Notes</a>
        </div>
        <div className="flex-1 p-6">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">Core Concepts</div>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Utility-First</a>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Responsive Design</a>
        </div>
        <div className="flex-1 p-6">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">Customization</div>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Theme Configuration</a>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Breakpoints</a>
        </div>
        <div className="flex-1 p-6">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">Community</div>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">GitHub</a>
          <a href="#" className="block mb-2 text-gray-300 hover:text-gray-100">Twitter</a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400 text-sm">
        &copy; 2025 NetworkingApp. All rights reserved.
      </div>
    </footer>
  );
}