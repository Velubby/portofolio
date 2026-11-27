export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Toko Kita',
    description: 'Inventory management app for small shops.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    githubUrl: 'https://github.com/Velubby/tokokita_app',
  },
  {
    id: 2,
    title: 'oiya',
    description: 'Real-time messaging app with a card-based UI.',
    tech: ['Flutter', 'Dart', 'Material'],
    githubUrl: 'https://github.com/Velubby/oiya',
  },
  {
    id: 3,
    title: 'Belutique',
    description: 'E-commerce storefront for a grilled-eel shop.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
    githubUrl: 'https://github.com/Velubby/belutique',
    demoUrl: 'https://velubby.github.io/belutique/',
  },
  {
    id: 4,
    title: 'GGWP Weather',
    description: 'Weather app with AI-generated city facts.',
    tech: ['React', 'TypeScript', 'Weather API'],
    githubUrl: 'https://github.com/Velubby/etl-weather',
  },
];
