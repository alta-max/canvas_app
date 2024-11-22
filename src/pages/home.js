import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"; 
import protectedRoute from "@/components/protectedRoute";

function Home() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/login"; 
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>

      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-blue-600">Home Page</h1>
      </div>
    </div>
  );
}

export default protectedRoute(Home);
