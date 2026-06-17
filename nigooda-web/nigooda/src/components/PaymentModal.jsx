
import { useState } from "react";
import qrImage from "../assets/upi-qr.jpeg";

const PaymentModal = ({ isOpen, onClose, plan }) => {
  const [transactionId, setTransactionId] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">

        <h2 className="mb-4 text-center text-2xl font-bold text-white">
          Complete Payment
        </h2>

        {plan && (
          <div className="mb-5 text-center">
            <p className="text-lg font-semibold text-white">
              {plan.name} Plan
            </p>

            <p className="text-sm text-zinc-400">
              ₹{plan.price} • {plan.scans} scans
            </p>
          </div>
        )}

        <img
          src={qrImage}
          alt="UPI QR"
          className="mx-auto h-64 w-64 rounded-xl object-cover"
        />

        <p className="mt-4 text-center text-zinc-300">
          Scan this QR using any UPI app
        </p>

        <p className="mt-2 text-center text-sm text-zinc-500">
          Google Pay • PhonePe • Paytm • BHIM
        </p>

        <input
          type="text"
          placeholder="Enter UPI Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <button
          className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          I Have Paid
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default PaymentModal;
