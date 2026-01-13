import { useCallback, useEffect, useState } from "react";
import { record } from "../types/interfaces";
import { supabase } from "../server/supabaseClient";

export const useRecords = () => {
  const [records, setRecords] = useState<record[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("study-record").select("*");
      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "データの取得に失敗しました";
      setError(errorMessage);
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addRecord = async (title: string, time: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("study-record")
        .insert({ title, time });
      if (error) {
        throw error;
      }
      await fetchRecords();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "登録に失敗しました";
      setError(errorMessage);
      console.error("Add error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    setIsLoading(true);
    setError(null); // ✅ エラーをリセット
    try {
      const { error } = await supabase
        .from("study-record")
        .delete()
        .eq("id", id);
      if (error) throw error;
      await fetchRecords();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "削除に失敗しました";
      setError(errorMessage);
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
