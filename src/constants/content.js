// Placeholder-free copy, transcribed from the Canva references (source of truth).

export const IDENTITY = {
  name: 'Eshmeet Singh Bhachu',
};

export const RECEIPT_CONTENT = {
  welcome: 'WELCOME',
  bio: "Hi, I'm a computer science student who loves building things, breaking things, and figuring out why I broke them. I enjoy turning random ideas into real projects and experimenting with code, technology, and AI.",
  stats: [
    ['AGE', '21.0'],
    ['LOCATION', 'Chandigarh, India'],
    ['STACK', 'C++, Javascript, MERN'],
    ['CURRENTLY', 'Building & Learning'],
  ],
};

export const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/eshmeet-singh-bhachu/' },
  { key: 'github', label: 'GitHub', href: 'https://github.com/eshmeetbhachu' },
  { key: 'gmail', label: 'Email', href: 'mailto:eshmeetsingh2005@gmail.com' },
];

// Barcode links to the resume PDF.
export const RESUME_URL = 'https://drive.google.com/file/d/1mE8VSsOdTuZcdSV4IL1TSTA76jbd8k7H/view?usp=drive_link';

export const EXPERIENCE_CONTENT = {
  company: 'ANTIER SOLUTIONS',
  role: 'Software Development Intern',
  location: 'Mohali, India',
  date: 'June’26',
  // The design's exact line breaks (first line indented to the company name).
  lines: [
    'independently built and refined',
    'a full-stack application, handling',
    'feature development, API integration,',
    'testing, debugging, and version',
    'control.',
  ],
};

// Real GitHub/live links are not final yet — placeholders per instructions,
// structured so they can just be swapped for the real URLs later.
// `lines` are the design's exact line breaks (the Canva layout wraps each
// description by hand; free wrapping would drift from it).
export const PROJECTS_CONTENT = [
  {
    key: 'canvassync',
    title: 'CANVASSYNC',
    border: '#531b1b',
    lines: [
      'A real-time collaborative',
      'whiteboard built for seamless',
      'multi-user drawing, with',
      'persistent boards and scalable',
      'backend infrastructure.',
    ],
    githubUrl: 'https://github.com/eshmeetbhachu/CanvasSync',
    liveUrl: 'https://canvas-sync-ruddy.vercel.app/',
  },
  {
    key: 'swim-safe',
    title: 'SWIM-SAFE',
    border: '#3b496a',
    lines: [
      'A role-based pool operations',
      'platform built to streamline',
      'user management, applicant',
      'hiring workflows, and',
      'administrative operations.',
    ],
    githubUrl: 'https://github.com/eshmeetbhachu/pool-managment-system',
  },
  {
    key: 'assembly',
    title: 'Assembly',
    border: '#d26b00',
    lines: [
      'An interactive React word-',
      'guessing game featuring',
      'randomized challenges, dynamic',
      'keyboard input, attempt',
      'tracking, and responsive game',
      'states.',
    ],
    githubUrl: 'https://github.com/eshmeetbhachu/Assembly-game',
  },
];

export const ABOUT_CONTENT = {
  heading: 'ABOUT ME',
  paragraphs: [
    "Hi, I'm a software developer who likes turning ideas into things people can actually use.",
    "These days I'm dabbling in ai, designing, and projects that make me learn something I didn't know yesterday.",
    "When I'm not coding, you'll probably find me listening to music, sketching, yapping to myself or daydreaming about FOOD. (An accurate description below)",
  ],
};

// Photographs, in grid order (row by row). Only two captions are known so far
// ("Moon." and "Kite." from the reference screenshots); the rest are null and
// render without a caption until real titles are supplied.
export const PHOTOS = [
  { key: 'photo-1', title: 'Moon.' },
  { key: 'photo-2', title: 'Golden Temple.' },
  { key: 'photo-3', title: 'Kite.' },
  { key: 'photo-4', title: 'Clouds.' },
  { key: 'photo-5', title: 'Plate.' },
  { key: 'photo-6', title: 'Sunset.' },
  { key: 'photo-7', title: 'Tree.' },
  { key: 'photo-8', title: 'Moon.' },
  { key: 'photo-9', title: 'Mumbai.' },
];
