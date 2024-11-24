import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Star, Text } from "react-konva";
import { useSelector } from "react-redux";

export default function ViewCanvas() {
  const { selectedCanvasData } = useSelector((state) => state.canvas);
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const formatDateTime = (timestamp) => {
    const date = timestamp?.toDate();
    return date ? date.toLocaleString() : "Unknown";
  };

  const text = "Canvas Id: " + selectedCanvasData.id;
  const date = "Created At: " + formatDateTime(selectedCanvasData.createdAt);

  const handleDownload = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL();

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `canvas-${selectedCanvasData.id}.png`;
      link.click();
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth,
          height: clientHeight,
        });
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex-grow relative w-full h-full">
      <Stage ref={stageRef} width={dimensions.width} height={dimensions.height}>
        <Layer>
          <Text
            text={text}
            x={10}
            y={10}
            fontSize={16}
            fontFamily="Arial"
            fill="black"
          />
          <Text
            text={date}
            x={10}
            y={30}
            fontSize={14}
            fontFamily="Arial"
            fill="grey"
          />
          {selectedCanvasData.stars.map((star) => (
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
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={5}
              shadowOffsetY={5}
            />
          ))}
        </Layer>
      </Stage>

      <div className="absolute bottom-3 right-3 flex justify-end w-full">
        <button
          onClick={handleDownload}
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-blue-600"
        >
          Download Canvas
        </button>
      </div>
    </div>
  );
}
