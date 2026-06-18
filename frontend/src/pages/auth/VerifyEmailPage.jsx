import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    hasVerified.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await api.get(`/api/auth/verify-email?token=${token}`);
        setStatus("success");
        setMessage(res.data);
      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Verification failed. Link may have expired.");
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 max-w-md w-full text-center">
        <span className="text-2xl font-bold flex items-center justify-center gap-2 mb-6">
          🧠 BrainForge
        </span>

        {status === "loading" && (
          <>
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <p className="text-gray-300">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition w-full"
            >
              Go to Dashboard
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold mb-2">Verification Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-semibold transition w-full"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}