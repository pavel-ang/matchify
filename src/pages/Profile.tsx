import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useUserService from "../api/userService";
import { LocationDTO } from "../DTO/LocationDTO";
import { UserPreferencesDTO } from "../DTO/UserPreferencesDTO";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const {
    createOrUpdateUser,
    updateUserFullName,
    getUserById,
    deleteUser,
  } = useUserService();

  const [form, setForm] = useState<{
    fullName: string;
    location: LocationDTO;
    preferences: UserPreferencesDTO;
  }>({
    fullName: "",
    location: { city: "", country: "" },
    preferences: { darkMode: false, emailNotifications: false },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.sub) return;
      try {
        const backendUser = await getUserById(user.sub);
        const fullName =
          (user as any)?.user_metadata?.full_name || user.name || "";

        setForm({
          fullName,
          location: backendUser?.location ?? { city: "", country: "" },
          preferences: backendUser?.preferences ?? {
            darkMode: false,
            emailNotifications: false,
          },
        });
      } catch (err) {
        console.error("Failed to load user data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "fullName") {
      setForm((prev) => ({ ...prev, fullName: value }));
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1] as keyof LocationDTO;
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else if (name.startsWith("preferences.")) {
      const key = name.split(".")[1] as keyof UserPreferencesDTO;
      setForm((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    }
  };

  const handleUpdateFullName = async () => {
    if (!user?.sub) return;
    try {
      await updateUserFullName(user.sub, form.fullName);
      alert("Full name updated successfully!");
    } catch (err) {
      console.error("Failed to update full name:", err);
    }
  };

  const handleUpdatePreferences = async () => {
    if (!user?.sub) return;
    try {
      await createOrUpdateUser(user.sub, form.location, form.preferences);
      alert("Preferences and location updated successfully!");
    } catch (err) {
      console.error("Failed to update preferences:", err);
    }
  };

  if (!isAuthenticated || !user) return <p>Please log in</p>;
  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile Settings</h2>
      <p>Email: {user.email}</p>

      <form>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdateFullName}>
          Update Full Name
        </button>

        <h3>Location</h3>
        <input
          type="text"
          name="location.city"
          placeholder="City"
          value={form.location.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location.country"
          placeholder="Country"
          value={form.location.country}
          onChange={handleChange}
        />

        <h3>Preferences</h3>
        <label>
          <input
            type="checkbox"
            name="preferences.darkMode"
            checked={form.preferences.darkMode}
            onChange={handleChange}
          />
          Dark Mode
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="preferences.emailNotifications"
            checked={form.preferences.emailNotifications}
            onChange={handleChange}
          />
          Email Notifications
        </label>
        <br />
        <button type="button" onClick={handleUpdatePreferences}>
          Update Preferences
        </button>
        <button
  type="button"
  onClick={async () => {
    if (!user?.sub) return;
    try {
      await deleteUser();
      alert("Account deleted");
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  }}
  style={{ marginTop: "1em", backgroundColor: "red", color: "white" }}
>
  Delete Account
</button>

      </form>
    </div>
  );
};

export default Profile;
