export const CATEGORIES = [
  { value: "Photo Studio", label: "Photo Studios" },
  { value: "Film Stage", label: "Sound Stages" },
  { value: "Podcast Lounge", label: "Podcast Rooms" },
  { value: "Music Suite", label: "Music Suites" },
  { value: "Workshop", label: "Art Workshops" },
];

export const AMENITIES = [
  "Wi-Fi", "Air conditioning", "Lighting kit", "Backdrops", "Soundproofing",
  "Green screen", "Props", "Parking", "Changing room", "Kitchenette",
];

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;