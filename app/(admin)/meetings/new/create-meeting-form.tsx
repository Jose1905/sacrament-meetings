"use client";

import { useActionState } from "react";
import { createMeeting, type State } from "@/lib/actions";

const initialState: State = { message: null, errors: {} };

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="date" className="mb-2 block text-sm font-medium">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="block w-full rounded-md border px-3 py-2"
          aria-describedby="date-error"
          required
        />
        <div id="date-error" aria-live="polite">
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="meeting_type" className="mb-2 block text-sm font-medium">
          Meeting Type
        </label>
        <select
          id="meeting_type"
          name="meeting_type"
          className="block w-full rounded-md border px-3 py-2"
          required
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
      </div>

      {["presiding", "conducting", "openingPrayer", "closingPrayer"].map(
        (name) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="mb-2 block text-sm font-medium capitalize"
            >
              {name.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              id={name}
              name={name}
              type="text"
              minLength={2}
              className="block w-full rounded-md border px-3 py-2"
              required
            />
            <div aria-live="polite">
              {state.errors?.[
                name as keyof NonNullable<State["errors"]>
              ]?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              ))}
            </div>
          </div>
        ),
      )}

      {[
        ["openingHymn", '{"number":1,"title":"Opening Hymn"}'],
        ["sacramentHymn", '{"number":1,"title":"Sacrament Hymn"}'],
        ["closingHymn", '{"number":1,"title":"Closing Hymn"}'],
      ].map(([name, value]) => (
        <div key={name}>
          <label htmlFor={name} className="mb-2 block text-sm font-medium">
            {name.replace(/([A-Z])/g, " $1")}
          </label>
          <textarea
            id={name}
            name={name}
            rows={2}
            defaultValue={value}
            className="block w-full rounded-md border px-3 py-2 font-mono text-sm"
            aria-describedby={`${name}-error`}
            required
          />
          <div id={`${name}-error`} aria-live="polite">
            {state.errors?.[
              name as keyof NonNullable<State["errors"]>
            ]?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label htmlFor="announcements" className="mb-2 block text-sm font-medium">
          Announcements (comma-separated)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          className="block w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="wardBusiness" className="mb-2 block text-sm font-medium">
          Ward Business (JSON array)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          defaultValue="[]"
          className="block w-full rounded-md border px-3 py-2 font-mono text-sm"
        />
        <p className="mt-1 text-xs text-slate-500">
          Example: {"[{\"description\":\"Welcome visitors\"}]"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          value="true"
          className="h-4 w-4"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium">
          Stake Business
        </label>
      </div>

      <div>
        <label htmlFor="speakers" className="mb-2 block text-sm font-medium">
          Speakers (JSON array)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={4}
          defaultValue="[]"
          className="block w-full rounded-md border px-3 py-2 font-mono text-sm"
        />
        <p className="mt-1 text-xs text-slate-500">
          Example:{" "}
          {`[{"name":"Jane Doe","topic":"Faith","type":"speaker"}]`}
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
        {isPending ? "Saving..." : "Create Meeting"}
      </button>
    </form>
  );
}