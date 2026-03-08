// ============================================================
// Types for the Excuse Generator AI application
// ============================================================

export type ExcuseCategory =
  | "University"
  | "Work"
  | "Friends"
  | "Family"
  | "Relationship"
  | "Absurd";

export type Language = "en" | "es";

export interface Excuse {
  id: string;
  text: string;
  category: ExcuseCategory;
  createdAt: string;
}

export interface GenerateExcuseRequest {
  category: ExcuseCategory;
  language: Language;
}

export interface GenerateExcuseResponse {
  excuse: string;
  category: ExcuseCategory;
}
