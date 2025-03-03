import type { FC } from "react";

type Props = {
  label: string;
  size: "small" | "medium" | "large";
};

export const App: FC<Props> = ({ label, size }) => {
  return (
    <div>
      <div>{label}</div>

      <div>{size}</div>
    </div>
  );
};
