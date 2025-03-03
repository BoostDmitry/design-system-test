import { createRoot } from "react-dom/client";
import { App } from "./App";

function main() {
  const el = document.getElementById("design-system");
  const root = createRoot(el!);
  root.render(<App label="App label" size="large" />);
}

main();
