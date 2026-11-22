"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import {
  addMeetingToDb,
  updateMeetingInDb,
  deleteMeetingFromDb,
  getMeetingById,
} from "./meetings-db";
import type { Hymn } from './types';

const hymnSchema = z.object({
  number: z.number(),
  title: z.string().min(1, 'Title is required'),
}) satisfies z.ZodType<Hymn>;

const CreateMeetingSchema = z.object({
  date: z.string().min(1, "Date is required"),
  meeting_type: z.enum(["testimony", "regular", "stake", "general"]),
  presiding: z.string().min(2, "Name must be at least 2 characters long"),
  conducting: z.string().min(2, "Name must be at least 2 characters long"),
  announcements: z.array(z.string()),
  openingHymn: hymnSchema,
  openingPrayer: z.string().min(2, "Name must be at least 2 characters long"),
  wardBusiness: z.array(z.object({ description: z.string().min(2) })),
  stakeBusiness: z.boolean(),
  sacramentHymn: hymnSchema,
  speakers: z.array(z.object({
    name: z.string().min(2),
    topic: z.string().min(1),
    type: z.enum(["speaker", "musical-number"]),
  })),
  closingHymn: hymnSchema,
  closingPrayer: z.string().min(2, "Name must be at least 2 characters long")
});

function parseJsonValue<T>(value: FormDataEntryValue | null, fallback: T): T {
  if (typeof value !== "string") return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function parseStringList(formData: FormData, name: string): string[] {
  const values = formData.getAll(name).flatMap((value) =>
    typeof value === "string" ? value.split(",") : []
  );

  return values.map((value) => value.trim()).filter(Boolean);
}

function meetingFormValues(formData: FormData) {
  return {
    date: formData.get("date")?.toString() ?? "",
    meeting_type: formData.get("meeting_type"),
    presiding: formData.get("presiding")?.toString() ?? "",
    conducting: formData.get("conducting")?.toString() ?? "",
    announcements: parseStringList(formData, "announcements"),
    openingHymn: parseJsonValue(formData.get("openingHymn"), { number: 0, title: "" }),
    openingPrayer: formData.get("openingPrayer")?.toString() ?? "",
    wardBusiness: parseJsonValue(
      formData.get("wardBusiness"),
      parseStringList(formData, "wardBusiness").map((description) => ({ description }))
    ),
    stakeBusiness: ["true", "on", "1"].includes(formData.get("stakeBusiness")?.toString().toLowerCase() ?? ""),
    sacramentHymn: parseJsonValue(formData.get("sacramentHymn"), { number: 0, title: "" }),
    speakers: parseJsonValue(
      formData.get("speakers"),
      parseStringList(formData, "speakers").map((name) => ({
        name,
        topic: "",
        type: "speaker" as const,
      }))
    ),
    closingHymn: parseJsonValue(formData.get("closingHymn"), { number: 0, title: "" }),
    closingPrayer: formData.get("closingPrayer")?.toString() ?? "",
  };
}

export type State = {
  errors?: {
    date?: string[];
    meeting_type?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymn?: string[];
    speakers?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

export async function createMeeting(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = CreateMeetingSchema.safeParse(meetingFormValues(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create meeting",
    };
  }

  const { 
    date,
    meeting_type,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer } =
    validatedFields.data;

  try {
    await addMeetingToDb({
      date,
      meetingType: meeting_type,
      presiding,
      conducting,
      announcements,
      openingHymn,
      openingPrayer,
      wardBusiness,
      stakeBusiness,
      sacramentHymn,
      speakers,
      closingHymn,
      closingPrayer,
    });
  } catch (error) {
    return {
      message: `Database Error: Failed to create meeting. Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  _prevState: State,
  id: number,
  formData: FormData
): Promise<State> {
  const raw = meetingFormValues(formData);

  const meeting = await getMeetingById(id);
  if (!meeting) {
    notFound();
  }

  const parsed = CreateMeetingSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error("Invalid meeting input.");
  }

  const { 
    date,
    meeting_type,
    presiding,
    conducting,
    announcements,
    openingHymn,
    openingPrayer,
    wardBusiness,
    stakeBusiness,
    sacramentHymn,
    speakers,
    closingHymn,
    closingPrayer
   } =
    parsed.data;

  try {
    await updateMeetingInDb(id, {
      id,
      date,
      meetingType: meeting_type,
      presiding,
      conducting,
      announcements,
      openingHymn,
      openingPrayer,
      wardBusiness,
      stakeBusiness,
      sacramentHymn,
      speakers,
      closingHymn,
      closingPrayer,
    })
    revalidatePath("/meetings");
  } catch (error) {
    throw new Error(
      `Database Error: Failed to edit meeting. Error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function deleteMeeting(id: number) {
  try {
    await deleteMeetingFromDb(id);
    revalidatePath("/meetings");
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw new Error("Failed to delete meeting. Please try again later.");
  }
  revalidatePath("/meetings");
  redirect("/meetings");
}