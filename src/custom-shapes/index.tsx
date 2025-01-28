import { trpc } from "@/utils/trpc";
import {
  exportToBlob,
  Geometry2d,
  HTMLContainer,
  RecordProps,
  Rectangle2d,
  resizeBox,
  ShapeUtil,
  stopEventPropagation,
  T,
  TLBaseShape,
  TLResizeInfo,
  useEditor,
} from "tldraw";

type ICustomShape = TLBaseShape<
  "my-custom-shape",
  {
    w: number;
    h: number;
    text: string;
  }
>;

// [2]
export class MyShapeUtil extends ShapeUtil<ICustomShape> {
  // [a]
  static override type = "my-custom-shape" as const;
  static override props: RecordProps<ICustomShape> = {
    w: T.number,
    h: T.number,
    text: T.string,
  };

  // [b]
  getDefaultProps(): ICustomShape["props"] {
    return {
      w: 200,
      h: 200,
      text: "I'm a shape!",
    };
  }

  // [c]
  override canEdit() {
    return true;
  }

  override canResize() {
    return true;
  }
  override isAspectRatioLocked() {
    return false;
  }

  // [d]
  getGeometry(shape: ICustomShape): Geometry2d {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [e]
  override onResize(shape: ICustomShape, info: TLResizeInfo<ICustomShape>) {
    return resizeBox(shape, info);
  }

  // [f]
  component(shape: ICustomShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id;

    return (
      <HTMLContainer
        onPointerDown={isEditing ? stopEventPropagation : undefined}
        style={{
          backgroundColor: "#efefef",
          pointerEvents: isEditing ? "all" : "none",
        }}
      >
        {shape.props.text}
        <ExampleComponent />
      </HTMLContainer>
    );
  }

  // [g]
  indicator(shape: ICustomShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}

// [3]
export const customShape = [MyShapeUtil];

const ExampleComponent = () => {
  const editor = useEditor();

  const hello = trpc.hello.useQuery({
    text: "world",
  });

  const handleExport = async () => {
    const blob = await exportToBlob({
      editor,
      ids: Array.from(editor.getCurrentPageShapeIds()),
      format: "png",
      opts: {
        background: true,
        bounds: editor.getCurrentPageBounds(),
        padding: 0,
        scale: 1,
      },
    });
    console.log(blob);
  };

  return (
    <div>
      <button onClick={handleExport}>Export blob to console</button>
      My custom shape
      {hello.data?.greeting}
    </div>
  );
};
