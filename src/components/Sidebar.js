import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCanvasId, setActiveView, setDropdownOpen, setSelectedCanvasData } from "../redux/canvasSlicer";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/router";

function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { activeView, canvases, isDropdownOpen, activeCanvasId } = useSelector((state) => state.canvas);

  const formatDateTime = (timestamp) => {
    const date = timestamp?.toDate();
    return date ? date.toLocaleString() : "Unknown";
  };

  const handleCanvasSelect = (canvasId) => {
    dispatch(setActiveCanvasId(canvasId));
    const selectedCanvas = canvases.find((canvas) => canvas.id === canvasId);
    if (selectedCanvas) {
      dispatch(setSelectedCanvasData(selectedCanvas));
    }
  };

  const handleView = () => {
    dispatch(setActiveView("view"));
    dispatch(setDropdownOpen(!isDropdownOpen));
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error(error.message);
    }
  };
 
  return (
    <div className="w-1/5 bg-gray-800 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl mb-6">MyCanvasApp</h1>
        <hr />
        <div className="flex flex-col gap-4 mt-6">
          <p
            onClick={() => dispatch(setActiveView("create"))}
            className={`cursor-pointer text-lg ${activeView === "create" ? "text-blue-500" : "text-white"}`}
          >
            Create
          </p>
          <div className="relative">
            <p
              onClick={() => handleView() }
              className={`cursor-pointer text-lg ${activeView === "view" ? "text-blue-500" : "text-white"}`}
            >
              View
            </p>
            <div
              className={`${
                isDropdownOpen ? "max-h-[28rem] opacity-100 transition-all duration-500" : "max-h-0 opacity-0 transition-all duration-500"
              } overflow-hidden absolute top-10 left-0 w-full mt-2 bg-gray-800 text-white rounded-md shadow-lg`}
            >
              <ul className="overflow-y-auto max-h-[28rem] thin-scrollbar">
                {canvases.map((canvas, index) => (
                  <li
                    key={canvas.id}
                    className={`cursor-pointer hover:bg-gray-700 px-4 py-2 border-b border-gray-700 ${
                      activeCanvasId === canvas.id ? "text-blue-500" : ""
                    }`}
                    onClick={() => handleCanvasSelect(canvas.id)}
                  >
                    <div className="text-sm font-bold">
                      Canvas {canvases.length - index}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDateTime(canvas.createdAt)}
                    </div>

                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleLogout} className="mt-6 text-red-500">Logout</button>
    </div>
  );
}

export default Sidebar;
