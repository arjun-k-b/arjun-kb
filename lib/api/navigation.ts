import navigationData from "@/data/config/navigation.json";
import type {
  NavigationItem,
  NavigationResponse,
} from "@/types/navigation";

export async function getNavigation(): Promise<NavigationResponse> {
  const data: NavigationItem[] = navigationData
    .filter((item) => item.isVisible)
    .sort((a, b) => a.order - b.order);

  return {
    success: true,
    data,
  };
}