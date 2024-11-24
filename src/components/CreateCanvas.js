import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Star, Text } from "react-konva";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function generateShapes(width, height) {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * width,
    y: Math.random() * height,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

export default function Canvas({ fetchCanvases }) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        });
        setStars(generateShapes(clientWidth, clientHeight));
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const saveCanvasToFirestore = async () => {
    const user = auth.currentUser;
    // console.log(user.uid);
    try {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "canvases"),
        {
          stars: stars,
          createdAt: new Date(),
          userId: user.uid,
        }
      );
      toast.success("Canvas saved successfully!");
      setStars(generateShapes(dimensions.width, dimensions.height));
      fetchCanvases();
    } catch (e) {
      toast.error("Error saving canvas");
    }
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => ({
        ...star,
        isDragging: star.id === id,
      }))
    );
  };

  const handleDragEnd = (e) => {
    const id = e.target.id();
    const newX = e.target.x();
    const newY = e.target.y();

    setStars(
      stars.map((star) =>
        star.id === id
          ? {
              ...star,
              x: newX,
              y: newY,
              isDragging: false,
            }
          : star
      )
    );
  };

  return (
    <div
      ref={containerRef}
      className="flex-grow relative flex items-center justify-center w-full h-full"
    >
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          <Text text="Try to drag a star" />
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#3b82f6"
              opacity={0.8}
              draggable
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={star.isDragging ? 10 : 5}
              shadowOffsetY={star.isDragging ? 10 : 5}
              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>

      <div className="absolute bottom-3 right-3 flex justify-end w-full">
        <button
          onClick={saveCanvasToFirestore}
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-blue-600"
        >
          Save Canvas
        </button>
      </div>
    </div>
  );
}
