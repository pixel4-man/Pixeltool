export type CategoryId = 'image' | 'text' | 'pdf' | 'ai' | 'developer' | 'productivity';

export interface ToolItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  description: string;
  iconName: string;
  popular?: boolean;
  tags: string[];
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  toolCount: number;
  badge?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  plan: 'Free' | 'Pro';
  favouriteToolIds: string[];
  recentToolIds: string[];
  usageCount: number;
}
