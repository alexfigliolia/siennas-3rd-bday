import { useMemo } from "react";
import { useNodeDimensions } from "@figliolia/react-hooks";
import "./styles.scss";

const NUMS = Array.from({ length: 10 }, (_, i) => i);

export const Column = ({ value }: Props) => {
  const [node, dimensions] = useNodeDimensions<HTMLDivElement>();

  const translate = useMemo(() => {
    if (value < 0) {
      return "0 10%";
    }
    return `0 -${value * 10}%`;
  }, [value]);

  const label = useMemo(() => (value < 0 ? "" : value.toString()), [value]);

  return (
    <div
      className="column"
      aria-label={label}
      style={{
        width: dimensions?.width,
        height: dimensions?.height,
      }}>
      <div className="dummy" ref={node} aria-hidden>
        {label}
      </div>
      <div className="nums" style={{ translate }}>
        {NUMS.map(n => (
          <div key={n} aria-hidden>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};

interface Props {
  value: number;
}
