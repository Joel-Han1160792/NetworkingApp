import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function LoginPage() {
  

// ...


  return(
    <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
        <Navbar />
        <main pt-16 w-full>
          <LoginForm/>
        </main>
        <Footer />
      </div>
  )
}