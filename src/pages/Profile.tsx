import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import useUserService from "../api/userService";
import { LocationDTO } from "../DTO/LocationDTO";
import { UserPreferencesDTO } from "../DTO/UserPreferencesDTO";

interface SearchFilterDTO {
  preferredGender: string;
  interests: string[];
  minAge: number;
  maxAge: number;
}

interface UserAttributesDTO {
  gender: string;
  age: number;
  interests: string[];
}

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const {
    createOrUpdateUser,
    updateUserFullName,
    getUserById,
    deleteUser,
    updateSearchFilter,
    updateUserAttributes,
  } = useUserService();

  interface ProfileFormState {
    fullName: string;
    location: LocationDTO;
    preferences: UserPreferencesDTO;
    searchFilter: SearchFilterDTO;
    attributes: UserAttributesDTO;
  }
  
  const [form, setForm] = useState<ProfileFormState>({
      fullName: "",
      location: { city: "", country: "" },
      preferences: { darkMode: false, emailNotifications: false },
      searchFilter: {
        preferredGender: "",
        interests: [] as string[],
        minAge: 18,
        maxAge: 99,
      },
      attributes: {
        gender: "",
        age: 18,
        interests: [] as string[],
      },
    });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.sub) return;
      try {
        const backendUser = await getUserById(user.sub);
        const fullName = (user as any)?.user_metadata?.full_name || user.name || "";

        setForm((prev) => ({
          ...prev,
          fullName,
          location: backendUser?.location ?? { city: "", country: "" },
          preferences: backendUser?.preferences ?? {
            darkMode: false,
            emailNotifications: false,
          },
        }));
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
    } else if (name.startsWith("searchFilter.")) {
      const key = name.split(".")[1] as keyof SearchFilterDTO;
      setForm((prev) => ({
        ...prev,
        searchFilter: {
          ...prev.searchFilter,
          [key]: type === "number" ? parseInt(value) : value,
        },
      }));
    } else if (name.startsWith("attributes.")) {
      const key = name.split(".")[1] as keyof UserAttributesDTO;
      setForm((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [key]: type === "number" ? parseInt(value) : value,
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

  const handleSaveSearchFilter = async () => {
    try {
      await updateSearchFilter(form.searchFilter.preferredGender,
  form.searchFilter.interests,
  form.searchFilter.minAge,
  form.searchFilter.maxAge);
      alert("Search filter saved!");
    } catch (err) {
      console.error("Failed to update search filter", err);
    }
  };

  const handleSaveAttributes = async () => {
    try {
      await updateUserAttributes(form.attributes.gender,
  form.attributes.age,
  form.attributes.interests);
      alert("Your public info has been updated.");
    } catch (err) {
      console.error("Failed to update user attributes", err);
    }
  };

  if (!isAuthenticated || !user) return <p>Please log in</p>;
  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile Settings</h2>
      <p>Email: {user.email}</p>

      <form>
        <h3>General Info</h3>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
        </label>
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
        <label>
          <input
            type="checkbox"
            name="preferences.emailNotifications"
            checked={form.preferences.emailNotifications}
            onChange={handleChange}
          />
          Email Notifications
        </label>
        <button type="button" onClick={handleUpdatePreferences}>
          Save Preferences & Location
        </button>

        <h3>Your Public Info</h3>
        <label>
          Gender:
          <input
            type="text"
            name="attributes.gender"
            value={form.attributes.gender}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="attributes.age"
            value={form.attributes.age}
            onChange={handleChange}
          />
        </label>
        <label>
  Interests:
  <input
    type="text"
    name="attributes.interests"
    value={form.attributes.interests.join(", ")}
    onChange={(e) => {
      const interests = e.target.value.split(",").map((i) => i.trim());
      setForm((prev) => ({
        ...prev,
        attributes: { ...prev.attributes, interests },
      }));
    }}
  />
</label>
        <button type="button" onClick={handleSaveAttributes}>
          Save Public Info
        </button>

        <h3>Search Filter</h3>
        <label>
          Preferred Gender:
          <input
            type="text"
            name="searchFilter.preferredGender"
            value={form.searchFilter.preferredGender}
            onChange={handleChange}
          />
        </label>
        <label>
          Min Age:
          <input
            type="number"
            name="searchFilter.minAge"
            value={form.searchFilter.minAge}
            onChange={handleChange}
          />
        </label>
        <label>
          Max Age:
          <input
            type="number"
            name="searchFilter.maxAge"
            value={form.searchFilter.maxAge}
            onChange={handleChange}
          />
        </label>
        <label>
          Interests:
          <input
            type="text"
            name="searchFilter.interests"
            value={form.searchFilter.interests.join(", ")}
            onChange={(e) => {
              const interests = e.target.value.split(",").map((i) => i.trim());
              setForm((prev) => ({
                ...prev,
                searchFilter: { ...prev.searchFilter, interests },
              }));
            }}
          />
        </label>
        <button type="button" onClick={handleSaveSearchFilter}>
          Save Search Filter
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
