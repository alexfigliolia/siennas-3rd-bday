import { Fragment, memo, useMemo } from "react";

export const SplitText = memo(function SplitText({ text, className }: Props) {
  const words = useMemo(() => text.split(" "), [text]);
  return (
    <Fragment>
      {words.map((word, i) => (
        <div key={i} aria-hidden>
          {word.split("").map((char, i) => (
            <span key={i} className={className}>
              {char}
            </span>
          ))}
          {i < words.length - 1 && "\xA0"}
        </div>
      ))}
    </Fragment>
  );
});

interface Props {
  text: string;
  className?: string;
}
