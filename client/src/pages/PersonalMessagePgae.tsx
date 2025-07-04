import PersonalMessage from '../components/PersonalMessage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

export default function PersonalMessagePage() {
  const { user } = useUser();
  // For testing: 假设和用户 id=10 聊天
  const receiverId = '10';

  if (!user) {
    return (
      <Navigate
        to="/register"
        replace
        state={{ message: "Please sign up first to use the chat feature." }}
      />
    );
  }
  return (
    <div className="w-full min-h-screen bg-[#edf2f7] font-[Poppins,sans-serif] ">
      <Navbar />
      <main className="pt-16 w-full flex-1 flex flex-col items-center justify-center min-h-[800px]">
        <PersonalMessage userId={user.id} receiverId={receiverId} receiverName="FriendName" />
      </main>
      <Footer />
    </div>
  );
}
