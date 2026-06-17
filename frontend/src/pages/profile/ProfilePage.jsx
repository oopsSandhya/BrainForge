import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/profile");
      setProfile(res.data);
      setNewUsername(res.data.username);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async () => {
    setUsernameMsg("");
    try {
      const res = await api.put("/api/profile", { username: newUsername });
      setProfile(res.data);
      setEditingUsername(false);
      setUsernameMsg("✅ Username updated!");
    } catch (err) {
      setUsernameMsg("❌ " + (err.response?.data?.message || "Failed to update username"));
    }
  };

  const handleChangePassword = async () => {
    setPasswordMsg("");
    try {
      await api.put("/api/profile/password", {
        currentPassword,
        newPassword,
      });
      setPasswordMsg("✅ Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMsg("❌ " + (err.response?.data?.message || "Failed to change password"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  const avatarLetter = profile?.username?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-bold text-white">BrainForge</span>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* AVATAR + BASIC INFO */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black">
            {avatarLetter}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile.username}</h1>
            <p className="text-gray-400">{profile.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Joined {new Date(profile.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>

        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <ProfileStat label="Sessions" value={profile.totalSessions} icon="🎮" />
          <ProfileStat label="Total Score" value={profile.totalScore} icon="⭐" />
          <ProfileStat label="Streak" value={`${profile.currentStreak} 🔥`} icon="🔥" />
          <ProfileStat label="Badges" value={profile.totalAchievements} icon="🏅" />
        </div>

        {/* EDIT USERNAME */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-3">Edit Username</h2>
          {editingUsername ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateUsername}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm transition"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditingUsername(false); setNewUsername(profile.username); }}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{profile.username}</span>
              <button
                onClick={() => setEditingUsername(true)}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition"
              >
                Edit
              </button>
            </div>
          )}
          {usernameMsg && <p className="mt-3 text-sm">{usernameMsg}</p>}
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-3">Change Password</h2>
          {showPasswordForm ? (
            <div className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleChangePassword}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm transition"
                >
                  Update Password
                </button>
                <button
                  onClick={() => { setShowPasswordForm(false); setCurrentPassword(""); setNewPassword(""); }}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition"
            >
              Change Password
            </button>
          )}
          {passwordMsg && <p className="mt-3 text-sm">{passwordMsg}</p>}
        </div>

      </div>
    </div>
  );
}

function ProfileStat({ label, value, icon }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
      <span className="text-2xl block mb-1">{icon}</span>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-gray-500 text-xs mt-1">{label}</p>
    </div>
  );
}