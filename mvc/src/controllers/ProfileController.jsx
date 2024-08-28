import { fetchProfile, updateProfile, deleteProfile } from "../models/UserModel";

export const getProfileData = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const data = await fetchProfile(token);
  return data[0];
};

export const saveProfileData = async (profile, newValue, type) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const updatedProfile = {
    ...profile,
    [type]: newValue,
  };

  return await updateProfile(token, updatedProfile);
};

export const removeProfile = async (profileId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  await deleteProfile(token, profileId);
};
