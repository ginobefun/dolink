export type FormState = {
    message: string | null;
    hasError: boolean;
    link?: string;
}

export interface Link {
  id: string;
  destination: string;
  backHalf: string;
  title?: string;
  createdAt: Date;
}