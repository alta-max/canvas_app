import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../firebaseConfig";
import dynamic from "next/dynamic";
import { setCanvases } from "../redux/canvasSlicer";
import Sidebar from "@/components/Sidebar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const NoSSRComponent = dynamic(() => import("../components/CreateCanvas"), {
  ssr: false,
});

const NoSSRViewComponent = dynamic(() => import("../components/ViewCanvas"), {
  ssr: false,
});

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { activeView, canvases, selectedCanvasData } = useSelector(
    (state) => state.canvas
  );

  const fetchCanvases = async () => {
    const user = auth.currentUser;

    if (user) {
      const canvasesRef = collection(db, "users", user.uid, "canvases");
      const canvasesQuery = query(canvasesRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(canvasesQuery);

      const sortedCanvases = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setCanvases(sortedCanvases));
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/login ");
    }
    fetchCanvases();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <Sidebar/>
      <div className="w-4/5 bg-gray-100 p-4 flex flex-col h-screen">
        {activeView === "create" ? (
          <div className="w-full flex-grow bg-gray-200 rounded-md shadow-md">
            <NoSSRComponent fetchCanvases={fetchCanvases} />
          </div>
        ) : (
          <div className="w-full flex-grow bg-gray-200 rounded-md shadow-md flex items-center justify-center">
            {selectedCanvasData ? (
              <NoSSRViewComponent />
            ) : (
              <h2 className="text-xl text-blue-600 font-semibold">
                {canvases.length > 0
                  ? "Select a canvas to view"
                  : "No canvases to view"}
              </h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
