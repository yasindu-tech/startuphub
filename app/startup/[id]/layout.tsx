import Footer from "@/app/components/Footer"
import Navbar from "@/app/components/Navbar"
export default function Layout({children}: {children: React.ReactNode}) {
  return (
   <main className="font-work-sans">
        <Navbar />
        {children}
        <Footer />
   </main>
  ) 
}
