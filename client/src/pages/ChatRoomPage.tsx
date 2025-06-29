import ChatRoom from "../components/ChatRoom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export function ChatRoomPage(){
    return(
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        
        <Navbar/>
        <main className="flex-1 flex flex-col justify-center min-h-[400px]">
        <ChatRoom/>
        </main>
        <Footer/>
        </div>
    );
}