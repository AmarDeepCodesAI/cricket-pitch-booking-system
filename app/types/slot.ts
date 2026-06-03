export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  status: "available" | "booked" | "reserved";
}