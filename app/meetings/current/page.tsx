import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday

  const date = sunday.toISOString().slice(0, 10);
  const meeting = getMeetings(date)[0];

  if (meeting) redirect(`/meetings/${meeting.id}`);

  redirect("/meetings");
}
