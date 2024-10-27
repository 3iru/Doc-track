import { FileText, ArrowRightLeft, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8" />
            <span className="text-2xl font-bold">DocTrack</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/signin" className="hover:underline">
                  Signin
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-2 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Simplify Your Document Tracking
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            DocTrack: A minimalist app to effortlessly manage documents given
            and returned.
          </p>
          <a
            href="/signup"
            className="text-white bg-black hover:bg-gray-800 p-3 px-5 rounded-md"
          >
            Get Started
          </a>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FileText className="h-12 w-12 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
                <p>Effortlessly log and monitor document status</p>
              </div>
              <div className="text-center">
                <ArrowRightLeft className="h-12 w-12 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Quick Updates</h3>
                <p>Instantly update document statuses with a click</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Clear Overview</h3>
                <p>Get a bird&apos;s-eye view of all your documents</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; No rights reserved, feel free to copy!</p>
        </div>
      </footer>
    </div>
  );
}
