import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
   <main className="font-work-sans">
        <Navbar />
        {children}
        <Footer />
   </main>
  ) 
}
