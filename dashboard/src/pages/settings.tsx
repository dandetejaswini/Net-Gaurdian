import { useEffect, useState } from "react";
import ParentLayout from "../layouts/ParentLayout";
import { useFetch } from "../hooks/useFetch";
import { api } from "../utils/api";

interface Settings {
  aiKey: string;
  notifications: boolean;
}

const SettingsPage = () => {
  const { data, loading, error } = useFetch("settings");
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    if (data) setSettings(data);
  }, [data]);

  const handleSave = async () => {
    try {
      if (!settings) return;
      await api.put("settings", settings);
      alert("Settings saved!");
    } catch (err) {
      alert("Failed to save settings");
    }
  };

  if (loading) return <ParentLayout><p>Loading settings...</p></ParentLayout>;
  if (error) return <ParentLayout><p className="text-red-500">Error loading settings</p></ParentLayout>;

  return (
    <ParentLayout>
      <h2 className="text-xl font-bold mb-4">Settings</h2>

      <div className="flex flex-col gap-4 max-w-md">
        <label>
          AI Key:
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={settings?.aiKey || ""}
            onChange={(e) => setSettings({ ...settings!, aiKey: e.target.value })}
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings?.notifications || false}
            onChange={(e) => setSettings({ ...settings!, notifications: e.target.checked })}
          />
          Enable Notifications
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 rounded w-32"
        >
          Save
        </button>
      </div>
    </ParentLayout>
  );
};

export default SettingsPage;
