export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
}

export interface NavigationResponse {
  success: boolean;
  data: NavigationItem[];
  message?: string;
}