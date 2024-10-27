import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-8">Looks like this page took a wrong turn.</p>
      </div>
      
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-8 border-black rounded-full"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
          <div className="w-40 h-4 bg-black"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-2xl">
            404
          </div>
        </div>
      </div>
      
      <Link href="/" passHref>
        <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white transition-colors">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}