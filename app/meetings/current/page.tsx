import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  await connection();

  const today = new Date();
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(today);
  const year = Number(dateParts.find((part) => part.type === "year")?.value);
  const month = Number(dateParts.find((part) => part.type === "month")?.value);
  const day = Number(dateParts.find((part) => part.type === "day")?.value);
  const upcomingSunday = new Date(Date.UTC(year, month - 1, day));
  upcomingSunday.setUTCDate(
    upcomingSunday.getUTCDate() + ((7 - upcomingSunday.getUTCDay()) % 7),
  );

  const date = upcomingSunday.toISOString().slice(0, 10);
  const meeting = getMeetings(date)[0];

  if (meeting) redirect(`/meetings/${meeting.id}`);

  redirect("/meetings");
}
