

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Portfolio Manager</h3>
            <p className="text-gray-300">
              A modern web application showcasing full-stack development skills with React, Node.js, and cloud
              deployment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
            <ul className="text-gray-300 space-y-2">
              <li>React & TypeScript</li>
              <li>Node.js & Express</li>
              <li>MongoDB</li>
              <li>AWS Cloud Services</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Portfolio Manager. Built for educational purposes.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer