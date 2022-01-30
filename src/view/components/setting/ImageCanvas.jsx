import { useRef, useEffect, useState } from "react";
import "../../../styles/canvas.scss";
// import useLongPress from "../../../hooks/useLongPress.js";


const ImageCanvas = ({draw, imageLink}) => {

  
  const canvasRef = useRef(null);

  const [zoom, setZoom] = useState(0);
  const [mouseCord, setMouseCord] = useState({x:0,y:0});
  const updateZoom = (event) => {
    setZoom(p=>event.target.value)
  }

  const updateMouseCord = (_x,_y) => {
    setMouseCord(p => ({...p,x: _x, y: _y}))
  }
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // ctx.canvas.width = ;
    ctx.canvas.height = 300;
    const rect = canvas.getBoundingClientRect();
    canvas.addEventListener("touchmove", (event) => {
      if (event) {
        let X = event.touches[0].clientX - rect.left;
        let Y = event.touches[0].clientY - rect.top;
        updateMouseCord(X, Y);
      }
    });

    var image = new Image();
    image.onload = function () {
      canvas.style.borderColor = "green";
      draw({ ctx, image });
    };

    image.src = "https://i.ibb.co/C2JqTgv/Screenshot-87.png";
    
    let animationFrameId;

    const render = () => {
      draw({ ctx, image, zoom ,X : mouseCord.x, Y: mouseCord.y});
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [zoom,draw, mouseCord.x, mouseCord.y]);
  
  
  return (
    <section className="canvas-container">
      <canvas ref={canvasRef} className="canvas" onTouchMove={()=>{console.log("HHello")}}>
        Canvas is not supported by your ooooold browser
      </canvas>
      <div className="slide-container">
        <input
          type="range"
          min="-100"
          max="100"
          value={zoom}
          className="slider"
          onChange={updateZoom}
        />
        {mouseCord.x}<br/>{mouseCord.y}
      </div>
    </section>
  );
}

export default ImageCanvas;
