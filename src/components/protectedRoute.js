/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const protectedRoute = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("User:", user);
        if (user) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push("/login"); 
        }
        setLoading(false);
      });

      return () => unsubscribe(); 
    }, [router]);

    if (loading) {
      return <div className="min-h-screen flex items-center justify-center bg-white">
      <h2 className="text-2xl font-semibold text-blue-500 animate-pulse">
        Loading...
      </h2>
    </div>; 
    }

    return authenticated ? <Component {...props} /> : null;
  };
};

export default protectedRoute;
