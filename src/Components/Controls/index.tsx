import { NavButton } from "Components/NavButton";
import { LeftArrow } from "Icons/LeftArrow";
import { RightArrow } from "Icons/RightArrow";
import "./styles.scss";

export const Controls = ({ render, onBack, onForward }: Props) => {
  return (
    <div className="controls">
      <NavButton animate={render} onClick={onBack}>
        <LeftArrow />
        Back
      </NavButton>
      {onForward && (
        <NavButton animate={render} onClick={onForward}>
          Next
          <RightArrow />
        </NavButton>
      )}
    </div>
  );
};

interface Props {
  render: boolean;
  onBack: () => void;
  onForward?: () => void;
}
