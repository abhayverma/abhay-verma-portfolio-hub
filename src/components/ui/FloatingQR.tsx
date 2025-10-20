import { useState } from "react";
import { Coffee } from "lucide-react";
import qrImage from "@/assets/qr-coffee.png";

const FloatingQR = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* QR Image Popup ABOVE */}
      {visible && (
        <div className="relative mb-3 w-56">
          <div className="bg-card/90 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-border text-center animate-fade-in-up">
            <h4 className="text-sm font-semibold mb-2 text-foreground">☕ Buy me a coffee</h4>
            <img
              src={qrImage}
              alt="UPI QR - Buy me a coffee"
              className="w-44 h-44 rounded-lg border border-border mx-auto"
            />
            <p className="text-xs text-muted-foreground mt-2">Scan using any UPI app</p>

            {/* Pay via UPI Button */}
            <a
              href="upi://pay?pa=9673305368@upi&pn=Abhay%20Verma&cu=INR&tn=Support%20Abhay"
              className="mt-2 inline-block px-4 py-2 bg-portfolio-accent text-white rounded hover:bg-portfolio-accent/90"
            >
              Pay via UPI
            </a>
          </div>
        </div>
      )}

      {/* Floating Icon */}
      <button
        onClick={() => setVisible(!visible)}
        className="p-3 rounded-full bg-portfolio-accent hover:bg-portfolio-accent/90 shadow-lg transition-transform transform hover:scale-110"
        aria-label="Buy me a coffee"
      >
        <Coffee className="text-white w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingQR;
