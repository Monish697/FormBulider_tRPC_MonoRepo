export type ElementType = 'text' | 'image' | 'short-input' | 'long-input' | 'poll' | 'email' | 'number' | 'single-select' | 'multi-select' | 'checkbox' | 'dropdown' | 'rating' | 'date';

export interface FormElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  props: Record<string, any>; // specific properties for the element (e.g., placeholder, text content, image URL)
}

export type Theme = 'light' | 'dark' | 'glassmorphism';
export type Visibility = 'public' | 'private' | 'unlisted';

export interface FormState {
  appTheme: 'light' | 'dark';
  elements: FormElement[];
  theme: Theme;
  visibility: Visibility;
  allowedEmails: string[];
  backgroundUrl: string | null;
  customAppBg: string | null;
  customCanvasBg: string | null;
  customTextColor: string | null;
  companyName: string | null;
  toggleAppTheme: () => void;
  setCompanyName: (name: string) => void;
  setVisibility: (visibility: Visibility) => void;
  setAllowedEmails: (emails: string[]) => void;
  addElement: (element: FormElement) => void;
  loadTemplate: (elements: FormElement[]) => void;
  setFormStyle: (style: { backgroundUrl?: string | null, customAppBg?: string | null, customCanvasBg?: string | null, customTextColor?: string | null }) => void;
  updateElementPosition: (id: string, x: number, y: number) => void;
  updateElementProps: (id: string, props: Record<string, any>) => void;
  removeElement: (id: string) => void;
  reorderElements: (oldIndex: number, newIndex: number) => void;
  setTheme: (theme: Theme) => void;
  setBackgroundUrl: (url: string | null) => void;
}
