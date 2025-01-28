import { Tldraw } from "tldraw";
import { customShape } from "@/custom-shapes";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <Tldraw
        shapeUtils={customShape}
        onMount={(editor) => {
          editor.createShape({ type: "my-custom-shape", x: 100, y: 100 });
        }}
      />
    </div>
  );
}
