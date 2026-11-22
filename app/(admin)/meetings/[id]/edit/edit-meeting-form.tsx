"use client";

import { useActionState } from "react";
import { updateMeeting, type State } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface EditMeetingFormProps {
  id: number;
  meeting: SacramentMeeting;
}

const initialState: State = { message: null, errors: {} };

export default function EditMeetingForm({ id, meeting }: EditMeetingFormProps) {
  const updateMeetingWithId = async (
    _prevState: State,
    formData: FormData,
  ): Promise<State> => {
    try {
      await updateMeeting(id, formData);
      return { message: null, errors: {} };
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "digest" in error &&
        typeof error.digest === "string" &&
        error.digest.startsWith("NEXT_REDIRECT")
      ) {
        throw error;
      }

      return {
        message: error instanceof Error ? error.message : "Failed to edit meeting.",
        errors: {},
      };
    }
  };

  const [state, formAction, isPending] = useActionState(
    updateMeetingWithId,
    initialState,
  );

  const fieldClassName = "block w-full rounded-md border border-line bg-surface px-3 py-2 text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-line bg-surface p-6 shadow-sm"
    >
      <div>
        <label htmlFor="date" className="mb-2 block text-sm font-medium">Date</label>
        <input id="date" name="date" type="date" defaultValue={meeting.date} required aria-describedby="date-error" className={fieldClassName} />
        <div id="date-error" aria-live="polite">
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="meeting_type" className="mb-2 block text-sm font-medium">Meeting Type</label>
        <select id="meeting_type" name="meeting_type" defaultValue={meeting.meetingType} required aria-describedby="meeting_type-error" className={fieldClassName}>
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        <div id="meeting_type-error" aria-live="polite">
          {state.errors?.meeting_type?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      {[
        ["presiding", meeting.presiding],
        ["conducting", meeting.conducting],
        ["openingPrayer", meeting.openingPrayer],
        ["closingPrayer", meeting.closingPrayer],
      ].map(([name, value]) => (
        <div key={name}>
          <label htmlFor={name} className="mb-2 block text-sm font-medium capitalize">
            {name.replace(/([A-Z])/g, " $1")}
          </label>
          <input id={name} name={name} type="text" minLength={2} defaultValue={value} required aria-describedby={`${name}-error`} className={fieldClassName} />
          <div id={`${name}-error`} aria-live="polite">
            {state.errors?.[name as keyof NonNullable<State["errors"]>]?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
            ))}
          </div>
        </div>
      ))}

      {[
        ["openingHymn", meeting.openingHymn],
        ["sacramentHymn", meeting.sacramentHymn],
        ["closingHymn", meeting.closingHymn],
      ].map(([name, hymn]) => (
        <div key={name as string}>
          <label htmlFor={name as string} className="mb-2 block text-sm font-medium">
            {String(name).replace(/([A-Z])/g, " $1")}
          </label>
          <textarea
            id={name as string}
            name={name as string}
            rows={2}
            defaultValue={JSON.stringify(hymn)}
            required
            aria-describedby={`${String(name)}-error`}
            className={`${fieldClassName} font-mono text-sm`}
          />
          <div id={`${String(name)}-error`} aria-live="polite">
            {state.errors?.[String(name) as keyof NonNullable<State["errors"]>]?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label htmlFor="announcements" className="mb-2 block text-sm font-medium">Announcements (comma-separated)</label>
        <textarea id="announcements" name="announcements" rows={3} defaultValue={meeting.announcements?.join(", ") ?? ""} aria-describedby="announcements-error" className={fieldClassName} />
        <div id="announcements-error" aria-live="polite">
          {state.errors?.announcements?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="wardBusiness" className="mb-2 block text-sm font-medium">Ward Business (JSON array)</label>
        <textarea id="wardBusiness" name="wardBusiness" rows={3} defaultValue={JSON.stringify(meeting.wardBusiness)} aria-describedby="wardBusiness-error" className={`${fieldClassName} font-mono text-sm`} />
        <div id="wardBusiness-error" aria-live="polite">
          {state.errors?.wardBusiness?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted">Example: {`[{"description":"Welcome visitors"}]`}</p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <input id="stakeBusiness" name="stakeBusiness" type="checkbox" value="true" defaultChecked={meeting.stakeBusiness} aria-describedby="stakeBusiness-error" className="h-4 w-4" />
          <label htmlFor="stakeBusiness" className="text-sm font-medium">Stake Business</label>
        </div>
        <div id="stakeBusiness-error" aria-live="polite">
          {state.errors?.stakeBusiness?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="speakers" className="mb-2 block text-sm font-medium">Speakers (JSON array)</label>
        <textarea id="speakers" name="speakers" rows={4} defaultValue={JSON.stringify(meeting.speakers)} aria-describedby="speakers-error" className={`${fieldClassName} font-mono text-sm`} />
        <div id="speakers-error" aria-live="polite">
          {state.errors?.speakers?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">{error}</p>
          ))}
        </div>
        <p className="mt-1 text-xs text-muted">
          Example: {`[{"name":"Jane Doe","topic":"Faith","type":"speaker"}]`}
        </p>
      </div>

      {state.message ? (
        <p className="text-sm text-red-600">{state.message}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="min-h-10 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {isPending ? "Saving..." : "Save meeting"}
      </button>
    </form>
  );
}
