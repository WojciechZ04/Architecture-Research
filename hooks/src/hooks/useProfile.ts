/**
 * useProfile.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z Profile.tsx (smart-ui): fetchProfile, handleSave
 * (edycja pojedynczego pola: username/email/password) i handleDelete.
 * Stan "czy modal edycji/usuwania jest otwarty" ZOSTAJE w komponencie -
 * to czysty stan UI (widoczność elementu), a nie logika biznesowa, więc
 * zgodnie z zasadą "hooki = logika, komponent = UI" nie ma potrzeby go
 * stąd wyciągać.
 */

import { useCallback, useEffect, useState } from "react";
import { profileApi } from "../api/profileApi";
import { ApiError } from "../api/httpClient";
import { UserProfileDto } from "../domain/types";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfileDto>({});
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await profileApi.getAll();
      setProfile(data[0] || {});
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to fetch profile";
      setError(message);
      console.error(message);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /** Zapisuje pojedyncze pole profilu (username / email / password) - identyczna semantyka jak w smart-ui */
  const saveField = async (type: string, newValue: string) => {
    const updatedProfile: UserProfileDto = { ...profile, [type]: newValue };
    try {
      const data = await profileApi.update(profile.id as string, updatedProfile);
      setProfile(data);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to update profile";
      setError(message);
      console.error(message);
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      await profileApi.remove(profile.id as string);
      return true;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to delete profile";
      setError(message);
      console.error(message);
      return false;
    }
  };

  return { profile, error, saveField, deleteAccount };
}
