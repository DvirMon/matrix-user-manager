import { z } from "zod";

export const TimezoneSchema = z.object({
  zoneName: z.string(),
  gmtOffset: z.number(),
  gmtOffsetName: z.string(),
  abbreviation: z.string(),
  tzName: z.string(),
});

// Optional: Type inference for the Timezone schema
export type Timezone = z.infer<typeof TimezoneSchema>;

export const CountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  iso3: z.string(),
  iso2: z.string(),
  phone_code: z.string(),
  capital: z.string(),
  currency: z.string(),
  currency_symbol: z.string(),
  tld: z.string(),
  native: z.string(),
  region: z.string(),
  subregion: z.string(),
  timezones: z.array(TimezoneSchema),
  translations: z.record(z.string()),
  latitude: z.string(),
  longitude: z.string(),
  emoji: z.string(),
  emojiU: z.string(),
});

export type Country = z.infer<typeof CountrySchema>;

export const MainResponseSchema = z.object({
  total: z.number(),
  list: z.array(CountrySchema),
});

export type CountriesResponse = z.infer<typeof MainResponseSchema>;
