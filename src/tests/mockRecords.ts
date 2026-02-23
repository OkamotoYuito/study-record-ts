import { record } from "../types/interfaces";

export const mockRecords: record[] = [
  {
    id: "1",
    title: "記録1",
    time: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "記録2",
    time: 5,
    created_at: new Date().toISOString(),
  },
];
