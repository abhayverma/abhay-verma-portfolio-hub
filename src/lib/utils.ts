import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/resources/Abhay Verma Resume 2026.pdf"; // file in public folder
  link.setAttribute("download", "Abhay Verma Resume 2026.pdf");
  document.body.appendChild(link);
  link.click();
  link.remove();
};