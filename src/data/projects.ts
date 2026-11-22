export type ProjectCategory = 'Web App' | 'Mobile App' | 'Python Tool';

export interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  imagePath?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Toko Kita',
    category: 'Mobile App',
    description:
      'Inventory management mobile application built with Flutter and Firebase. Product catalogs, real-time stock tracking, transaction logs, and data reporting.',
    tech: ['Flutter', 'Dart', 'Firebase', 'State Management', 'NoSQL'],
    demoUrl: 'https://github.com/Velubby/tokokita_app',
    githubUrl: 'https://github.com/Velubby/tokokita_app',
    imagePath: '/tokokita.PNG',
  },
  {
    id: 2,
    title: 'oiya',
    category: 'Mobile App',
    description:
      'Messaging and interactive chat mobile application built with Flutter. Clean card-based UI, gesture transitions, secure onboarding, and real-time messaging views.',
    tech: ['Flutter', 'Dart', 'Mobile UI', 'Material Design', 'State Management'],
    demoUrl: 'https://github.com/Velubby/oiya',
    githubUrl: 'https://github.com/Velubby/oiya',
    imagePath: '/oiya.png',
  },
  {
    id: 3,
    title: 'Belutique',
    category: 'Web App',
    description:
      'E-commerce website for a Japanese-style grilled eel (unagi) store. Clean menu catalogue, cart mechanisms, and responsive checkout forms.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    demoUrl: 'https://velubby.github.io/belutique/',
    githubUrl: 'https://github.com/Velubby/belutique',
    imagePath: '/belutique.PNG',
  },
  {
    id: 4,
    title: 'GGWP Weather',
    category: 'Web App',
    description:
      'Weather web application integrated with AI that generates custom, localized fun facts for every city searched along with current meteorological reports.',
    tech: ['React', 'TypeScript', 'AI Integration', 'Weather API', 'Tailwind CSS'],
    demoUrl: 'https://github.com/Velubby/etl-weather',
    githubUrl: 'https://github.com/Velubby/etl-weather',
    imagePath: '/ggwp.PNG',
  },
];

export const projectFilters: Array<'All' | ProjectCategory> = [
  'All',
  'Web App',
  'Mobile App',
  'Python Tool',
];
