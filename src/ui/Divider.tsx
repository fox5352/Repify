const styleMap: Record<string, string> = {
  // direction
  "up": "border-r-2",
  "side": "border-b-2",
  // size
  "normal": "3/5",
  "full": "full"
  //
};

type DividerProps = {
  direction?: "up" | "side";
  size?: "full" | "normal";
  color?: string;
  //
  className?: string;
}


export default function Divider({
  direction = "up",
  size = "normal",
  color = "black"
}: DividerProps) {
  const styleSize = direction == "up" ? `h-${styleMap[size]}` : `w-${styleMap[size]}`
  const stylesDirection = `${styleMap[direction]}`;

  return (
    <hr className={`${styleSize} ${stylesDirection}`} style={{ borderColor: color }} />
  )
}
