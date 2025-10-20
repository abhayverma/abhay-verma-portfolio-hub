import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/resources/Abhay_Resume_ATS_Compliant_2025.pdf"; // file in public folder
  link.setAttribute("download", "Abhay_Resume_ATS_Compliant_2025.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};