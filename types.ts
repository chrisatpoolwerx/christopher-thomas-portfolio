
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  oneLine: string;
  context: string;
  role: string;
  scope: string[];
  hardThings: string[];
  insight: string;
  modelDescription: string;
  principles: { title: string; description: string }[];
  craft: { section?: string; title?: string; content?: string; description?: string }[];
  outcome?: string;
  outcomes?: string[];
  reflection: string;
  heroImage: string;
  visuals: string[];
  tools: string[];
}

export enum PageType {
  HOME = 'home',
  ABOUT = 'about',
  PROJECT = 'project'
}
