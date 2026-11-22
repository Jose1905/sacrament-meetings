import type { SacramentMeeting } from "./types";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
  date: string = "",
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE (
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    )
    AND (
      ${date}::text = ''
      OR to_char(date, 'YYYY-MM-DD') = ${date}::text
    )
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  console.log(`Returned rows: \n${rows}`)
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = '',
  date: string = '',
): Promise<number> {
  const searchTerm = `%${query}%`
  const rows = await sql`
    SELECT COUNT(*)
    FROM meetings
    WHERE (
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    )
    AND (
      ${date}::text = ''
      OR to_char(date, 'YYYY-MM-DD') = ${date}::text
    )
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE)
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeetingToDb(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []},
      ${JSON.stringify(data.openingHymn)},
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness)}::jsonb,
      ${data.stakeBusiness},
      ${JSON.stringify(data.sacramentHymn)},
      ${JSON.stringify(data.speakers)}::jsonb,
      ${JSON.stringify(data.closingHymn)},
      ${data.closingPrayer}
    )
    RETURNING *
  `;

  if (!rows[0]) {
    throw new Error("Failed to create meeting");
  }

  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeetingInDb(
  id: number,
  data: SacramentMeeting
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    UPDATE meetings
    SET
      date = ${data.date},
      meeting_type = ${data.meetingType},
      presiding = ${data.presiding},
      conducting = ${data.conducting},
      announcements = ${data.announcements ?? []},
      opening_hymn = ${JSON.stringify(data.openingHymn)},
      opening_prayer = ${data.openingPrayer},
      ward_business = ${JSON.stringify(data.wardBusiness)}::jsonb,
      stake_business = ${data.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(data.sacramentHymn)},
      speakers = ${JSON.stringify(data.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(data.closingHymn)},
      closing_prayer = ${data.closingPrayer}
    WHERE id = ${id}
    RETURNING *
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeetingFromDb(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  return rows.length > 0;
}