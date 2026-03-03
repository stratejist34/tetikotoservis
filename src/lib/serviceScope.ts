export type BrandKey = "hyundai" | "kia" | "toyota" | "nissan" | "genel";
export type ServiceIntentKey =
  | "periyodik_bakim"
  | "fiyat"
  | "ariza"
  | "genel";

export type HourSlot =
  | "pre_open"
  | "open_morning"
  | "open_evening"
  | "after_hours";

export interface WhatsappTemplateInput {
  modelYear?: string;
  km?: string;
  district?: string;
  complaint?: string;
}

const DEFAULT_MODEL_YEAR = "Model/Yıl: __";
const DEFAULT_KM = "Km: __";
const DEFAULT_DISTRICT = "İlçe: __";
const DEFAULT_COMPLAINT = "Şikayet: __";

export const serviceScope = {
  businessName: "Tetik Otomotiv",
  phone: "05336157835",
  phoneDisplay: "0533 615 78 35",
  whatsappNumber: "905336157835",
  regions: ["Tuzla", "Pendik", "Gebze", "Kurtköy"],
  regionScope: "tpgk",
  serviceType: "ozel_servis_not_authorized",
  serviceRegionCopy: "Hizmet bölgemiz: Tuzla, Pendik, Gebze, Kurtköy.",
  privateServiceCopy: "Tetik Otomotiv özel servistir, yetkili servis değildir.",
  notAuthorizedCopySoft:
    "Not: Yetkili servis değiliz. Sadece Tuzla, Pendik, Gebze, Kurtköy’e hizmet veriyoruz.",
  notAuthorizedCopyStrong:
    "Yetkili servis arıyorsan zaman kaybetme. Biz özel servisiz ve yalnızca Tuzla, Pendik, Gebze, Kurtköy için hizmet veriyoruz.",
} as const;

const whatsappTemplates: Record<
  BrandKey,
  Record<ServiceIntentKey, string>
> = {
  hyundai: {
    periyodik_bakim:
      "Merhaba, Hyundai aracım için periyodik bakım fiyat aralığı öğrenmek istiyorum. {modelYear} / {km} / {district} / {complaint}",
    fiyat:
      "Merhaba, Hyundai aracım için fiyat bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
    ariza:
      "Merhaba, Hyundai aracımda arıza var. Ön teşhis ve fiyat aralığı rica ederim. {modelYear} / {km} / {district} / {complaint}",
    genel:
      "Merhaba, Hyundai aracım için servis bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
  },
  kia: {
    periyodik_bakim:
      "Merhaba, Kia aracım için periyodik bakım fiyat aralığı öğrenmek istiyorum. {modelYear} / {km} / {district} / {complaint}",
    fiyat:
      "Merhaba, Kia aracım için fiyat bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
    ariza:
      "Merhaba, Kia aracımda arıza var. Ön teşhis ve fiyat aralığı rica ederim. {modelYear} / {km} / {district} / {complaint}",
    genel:
      "Merhaba, Kia aracım için servis bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
  },
  toyota: {
    periyodik_bakim:
      "Merhaba, Toyota aracım için periyodik bakım fiyat aralığı öğrenmek istiyorum. {modelYear} / {km} / {district} / {complaint}",
    fiyat:
      "Merhaba, Toyota aracım için fiyat bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
    ariza:
      "Merhaba, Toyota aracımda arıza var. Ön teşhis ve fiyat aralığı rica ederim. {modelYear} / {km} / {district} / {complaint}",
    genel:
      "Merhaba, Toyota aracım için servis bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
  },
  nissan: {
    periyodik_bakim:
      "Merhaba, Nissan aracım için periyodik bakım fiyat aralığı öğrenmek istiyorum. {modelYear} / {km} / {district} / {complaint}",
    fiyat:
      "Merhaba, Nissan aracım için fiyat bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
    ariza:
      "Merhaba, Nissan aracımda arıza var. Ön teşhis ve fiyat aralığı rica ederim. {modelYear} / {km} / {district} / {complaint}",
    genel:
      "Merhaba, Nissan aracım için servis bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
  },
  genel: {
    periyodik_bakim:
      "Merhaba, aracım için periyodik bakım fiyat aralığı öğrenmek istiyorum. {modelYear} / {km} / {district} / {complaint}",
    fiyat:
      "Merhaba, aracım için fiyat bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
    ariza:
      "Merhaba, aracımda arıza var. Ön teşhis ve fiyat aralığı rica ederim. {modelYear} / {km} / {district} / {complaint}",
    genel:
      "Merhaba, aracım için servis bilgisi almak istiyorum. {modelYear} / {km} / {district} / {complaint}",
  },
};

export function normalizeBrandKey(value?: string): BrandKey {
  if (!value) return "genel";
  const normalized = value.toLowerCase().trim();
  if (normalized === "hyundai") return "hyundai";
  if (normalized === "kia") return "kia";
  if (normalized === "toyota") return "toyota";
  if (normalized === "nissan") return "nissan";
  return "genel";
}

export function normalizeServiceIntent(value?: string): ServiceIntentKey {
  if (!value) return "genel";
  const normalized = value.toLowerCase().trim();
  if (normalized.includes("bakim")) return "periyodik_bakim";
  if (normalized.includes("fiyat")) return "fiyat";
  if (normalized.includes("ariza") || normalized.includes("tamir"))
    return "ariza";
  return "genel";
}

export function getWhatsappTemplate(
  brand: BrandKey,
  serviceIntent: ServiceIntentKey,
): string {
  return (
    whatsappTemplates[brand]?.[serviceIntent] ??
    whatsappTemplates.genel.genel
  );
}

export function buildWhatsappMessage(
  brandInput?: string,
  serviceIntentInput?: string,
  input: WhatsappTemplateInput = {},
): string {
  const brand = normalizeBrandKey(brandInput);
  const serviceIntent = normalizeServiceIntent(serviceIntentInput);
  const template = getWhatsappTemplate(brand, serviceIntent);

  return template
    .replace("{modelYear}", input.modelYear || DEFAULT_MODEL_YEAR)
    .replace("{km}", input.km || DEFAULT_KM)
    .replace("{district}", input.district || DEFAULT_DISTRICT)
    .replace("{complaint}", input.complaint || DEFAULT_COMPLAINT);
}

export function buildWhatsappLink(
  brandInput?: string,
  serviceIntentInput?: string,
  input: WhatsappTemplateInput = {},
): string {
  const message = encodeURIComponent(
    buildWhatsappMessage(brandInput, serviceIntentInput, input),
  );
  return `https://wa.me/${serviceScope.whatsappNumber}?text=${message}`;
}

export function getHourSlotByDate(date: Date): HourSlot {
  const now = new Date(
    date.toLocaleString("en-US", {
      timeZone: "Europe/Istanbul",
    }),
  );
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (minutes < 8 * 60 + 30) return "pre_open";
  if (minutes < 14 * 60) return "open_morning";
  if (minutes < 20 * 60) return "open_evening";
  return "after_hours";
}

export function getHourSlot(): HourSlot {
  return getHourSlotByDate(new Date());
}

export function isBusinessHours(slot: HourSlot): boolean {
  return slot === "open_morning" || slot === "open_evening";
}

export function getRegionText(): string {
  return serviceScope.regions.join(", ");
}
