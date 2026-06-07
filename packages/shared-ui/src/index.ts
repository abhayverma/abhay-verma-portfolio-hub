// 1. Layout Components
export { Navigation } from "./components/Navigation";
export { Footer } from "./components/Footer";

// 2. UI Primitives
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/badge";

// 3. Utilities
export { cn, downloadResume } from "./lib/utils";

// 4. Assets (Using standard module export)
import qrImage from "./assets/qr-coffee.png";
export { qrImage };