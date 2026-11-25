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
    key: 'perspective',
    title: 'PERSPECTIVE',
    border: '#5b3f78',
    lines: [
      'A debate-driven opinion',
      'platform where every question',
      'splits into For, Neutral and',
      'Against, with a challenge',
      'system and helpfulness',
      'rankings across sides.',
    ],
    githubUrl: 'https://github.com/eshmeetbhachu/perspective',
    liveUrl: 'https://perspective-lilac.vercel.app/',
  },
  {
    key: 'wildlife',
    title: 'WILDLIFE SIGHTING MAP',
    border: '#3e6b3f',
    lines: [
      'A community-powered map for',
      'logging and exploring animal',
      'sightings, with smart species',
      'suggestions and a live feed',
      'of wildlife around you.',
    ],
    githubUrl: 'https://github.com/eshmeetbhachu/wildlife-sighting',
    liveUrl: 'https://wildlife-sighting.vercel.app/',
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
    key: 'kidney',
    title: 'KIDNEY DISEASE CLASSIFIER',
    border: '#2b6466',
    lines: [
      'A deep learning model that',
      'classifies kidney CT scans as',
      'normal, cyst, stone or tumor,',
      'with Score-CAM heatmaps and',
      'confidence scoring that make',
      'its predictions explainable.',
    ],
    // Same repo as Swim-Safe for now, as requested.
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

// Tech stack slips (TechStackModal). `icon` is the file name in assets/tech/.
export const TECH_STACK = [
  {
    heading: 'LANGUAGES',
    items: [
      { name: 'C++', icon: 'cplusplus' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'SQL', icon: 'sql' },
      { name: 'Java', icon: 'java' },
    ],
  },
  {
    heading: 'FRAMEWORKS & LIBRARIES',
    items: [
      { name: 'React.js', icon: 'react' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express.js', icon: 'express' },
      { name: 'Fastify', icon: 'fastify' },
      { name: 'Socket.IO', icon: 'socketio' },
      { name: 'Mongoose', icon: 'mongoose' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    heading: 'DATABASES & SYSTEMS',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'PostGIS', icon: 'postgis' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Redis', icon: 'redis' },
      { name: 'BullMQ', icon: 'bullmq' },
    ],
  },
  {
    heading: 'DEVELOPER TOOLS & DEPLOYMENT',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Postman', icon: 'postman' },
      { name: 'Vercel', icon: 'vercel' },
      { name: 'Render', icon: 'render' },
    ],
  },
];
