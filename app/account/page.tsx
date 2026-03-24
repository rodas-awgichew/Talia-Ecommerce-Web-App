"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/src/lib/supabaseClient";

type Profile = {
  name: string;
  phone: string;
};

export default function AccountPage() {
  const supabase = getSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile>({
    name: "",
    phone: "",
  });

  const [saved, setSaved] = useState(false);

  // Load user + local profile
  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setEmail(data.user.email || "");

        const local = localStorage.getItem(`profile-${data.user.id}`);

        if (local) {
          setProfile(JSON.parse(local));
        }
      }
    };

    loadData();
  }, [supabase]);

  // Save to localStorage
  const handleSave = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    localStorage.setItem(
      `profile-${data.user.id}`,
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-serif mb-10">My Account</h1>

      <div className="space-y-6">

        {/* Email (read-only) */}
        <div>
          <label className="text-xs uppercase text-gray-500">Email</label>
          <input
            value={email}
            disabled
            className="w-full border-b py-2 bg-transparent"
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-xs uppercase text-gray-500">Full Name</label>
          <input
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            className="w-full border-b py-2 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs uppercase text-gray-500">Phone</label>
          <input
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
            className="w-full border-b py-2 outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 px-6 py-3 bg-black text-white text-sm uppercase"
        >
          Save Changes
        </button>

        {saved && (
          <p className="text-green-600 text-sm mt-2">
            Profile saved successfully
          </p>
        )}
      </div>
    </div>
  );
}