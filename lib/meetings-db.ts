import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-05-03",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Williams",
    wardBusiness: [{ description: "Sustaining of new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "", type: "musical-number" },
    ],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother Davis",
    announcements: ["Ward temple night: May 10"],
  },
  {
    id: 2,
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Sister Garcia",
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Brother Lee",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      { name: "Brother Clark", topic: "Following the Savior", type: "speaker" },
      { name: "Sister Miller", topic: "Finding Peace Through Prayer", type: "speaker" },
    ],
    closingHymn: { number: 98, title: "I Need Thee Every Hour" },
    closingPrayer: "Sister Young",
    announcements: ["Ward service activity: May 16"],
  },
  {
    id: 3,
    date: "2026-05-17",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Jones",
    openingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    openingPrayer: "Sister Adams",
    wardBusiness: [{ description: "Welcome new members of the ward" }],
    stakeBusiness: false,
    sacramentHymn: { number: 174, title: "While of These Emblems We Partake" },
    speakers: [
      { name: "Sister Wilson", topic: "Covenants and Discipleship", type: "speaker"},
      { name: "Brother Harris", topic: "Serving One Another", type: "speaker" },
    ],
    closingHymn: { number: 89, title: "The Lord Is My Shepherd" },
    closingPrayer: "Brother Nelson",
    announcements: ["Youth activity: May 20"],
  },
  {
    id: 4,
    date: "2026-05-24",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Brother Patel",
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother Thompson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Brother Moore", topic: "The Gift of the Holy Ghost", type: "speaker"},
      { name: "Sister Robinson", topic: "Building Faith at Home", type: "speaker"},
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Sister Scott",
    announcements: ["Ward conference will be held next month"],
  },
  {
    id: 5,
    date: "2026-05-31",
    meetingType: "regular",
    presiding: "Bishop Smith",
    conducting: "Sister Garcia",
    openingHymn: { number: 98, title: "I Need Thee Every Hour" },
    openingPrayer: "Sister Green",
    wardBusiness: [{ description: "Recognize this month's Primary birthdays" }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: "Sister Baker", topic: "Remembering Jesus Christ", type: "speaker"},
      { name: "Brother Rivera", topic: "Choosing to Serve", type: "speaker" }
    ],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Brother Davis",
    announcements: ["Missionary preparation class: June 3"],
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((m) => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}
