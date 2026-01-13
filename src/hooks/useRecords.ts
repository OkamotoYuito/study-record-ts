import { useCallback, useEffect, useState } from "react";
import { record } from "../types/interfaces";
import { supabase } from "../server/fetchRecords";

export const useRecords = () => {
  const [records, setRecords] = useState<record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("study-record").select("*");
      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      setError(true);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addRecord = async (title: string, time: number) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("study-record")
        .insert({ title, time });
      if (error) {
        throw error;
      }
      await fetchRecords();
    } catch (err) {
      setError(true);
      console.error("Add error:", err);
      throw err;
    } finally {
      setIsLoading(false);
      setError(false);
    }
  };

  const deleteRecord = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("study-record")
        .delete()
        .eq("id", id);
      if (error) throw error;
      await fetchRecords();
    } catch (err) {
      setError(true);
      console.error("Delete error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return { records, isLoading, error, addRecord, deleteRecord };
};
