/**
 * ════════════════════════════════════════════════════════════════════════
 *  PORTFOLIO CONTENT — edit this one file to update the whole website.
 * ════════════════════════════════════════════════════════════════════════
 *
 *  • Everything you see on the site (text, links, skills, projects, timeline,
 *    SEO tags) comes from the objects below. You never need to touch the
 *    React components to change content.
 *  • Lines marked `TODO` still need your input.
 *  • Images and files live in the /public folder. Reference them WITHOUT a
 *    leading slash, e.g. "images/profile.webp" or "resume.pdf".
 *  • Icons come from react-icons. Find one at https://react-icons.github.io/react-icons,
 *    add it to the matching `import` line below, then use it as `icon: TheIconName`.
 *  • Any optional field can be removed or set to `null` to hide it.
 */

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiDart,
  SiPython,
  SiTensorflow,
  SiPhp,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import { LuGithub, LuMail, LuMonitorSmartphone, LuSmartphone, LuServer } from 'react-icons/lu';

const GITHUB = 'https://github.com/itzJimuel';

/* ─── Site / SEO ──────────────────────────────────────────────────────── */
export const site = {
  // The public URL of the deployed site (used for social previews and SEO).
  url: 'https://jimuel-amuto.vercel.app',
  title: 'Jimuel Amuto — Front-End Developer',
  description:
    'Jimuel Amuto is a front-end developer and IT student from Butuan City, Philippines, building clean, responsive web and mobile interfaces with React, Next.js and Flutter.',
  locale: 'en_PH',
  ogImage: 'og-image.png', // 1200×630 image shown when the link is shared
  ogImageAlt: 'Jimuel Amuto — Front-End Developer',
};

/* ─── Profile ─────────────────────────────────────────────────────────── */
export const profile = {
  name: 'Jimuel Amuto',
  initials: 'JA',
  role: 'Front-End Developer',
  location: 'Butuan City, Philippines',
  tagline:
    'I design and build clean, responsive interfaces for the web and mobile, using React, Next.js and Flutter.',
  // Short status badge in the hero. Set to null to hide it.
  availability: 'Open to internships & junior front-end roles',
  email: 'jimuelamuto@gmail.com',
  resume: 'resume.pdf', // public/resume.pdf — replace the file to update it
  photo: {
    src: 'images/profile.webp', // from your GitHub avatar; a larger photo (~800×1000) will look sharper
    alt: 'Portrait of Jimuel Amuto',
    width: 368,
    height: 460,
  },
};

/* ─── Social links (hero, contact and footer) ─────────────────────────── */
export const socials = [
  { label: 'GitHub', url: GITHUB, icon: LuGithub },
  // TODO: add LinkedIn when ready — also add LuLinkedin to the "react-icons/lu" import above:
  // { label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile', icon: LuLinkedin },
  { label: 'Email', url: `mailto:${profile.email}`, icon: LuMail },
];

/* ─── Section titles & navigation (order here = order on the page) ────── */
export const sections = [
  { id: 'about', nav: 'About', title: 'A little about me' },
  {
    id: 'skills',
    nav: 'Skills',
    title: 'Languages & tools',
    intro: 'The technologies I use most, grouped by where they fit in a project.',
  },
  {
    id: 'projects',
    nav: 'Projects',
    title: 'Selected projects',
    intro: 'Real projects from my GitHub, from a church management system to a machine-learning mobile app.',
  },
  // Shows the Education timeline (and Experience too, once you add entries below).
  // When you add work experience, you may want to rename this to "Experience & education".
  { id: 'education', nav: 'Education', title: 'Education' },
  {
    id: 'contact',
    nav: 'Contact',
    title: 'Let’s build something together',
    intro:
      'Have a project, an internship opening, or just want to say hi? My inbox is always open and I usually reply within a day or two.',
  },
];

/* ─── About ───────────────────────────────────────────────────────────── */
export const about = {
  paragraphs: [
    'I’m a front-end developer and 4th-year IT student at Caraga State University – Cabadbaran Campus, based in Butuan City, Philippines. I love turning ideas into interfaces that feel clean, fast and easy to use, on both the web and mobile.',
    'Most of my web work is in React, Next.js and Tailwind CSS. My biggest project so far is a phone-friendly church management system with QR-code check-in, built for a local congregation. I also build mobile UIs in Flutter and have trained image-classification models, so I’m comfortable working beyond the front end when a project needs it.',
    'I’m looking for an internship or junior front-end role where I can keep learning from a great team and ship work that people actually use.',
  ],
  facts: [
    { label: 'Based in', value: 'Butuan City, PH' },
    { label: 'Studying', value: 'IT, 4th year @ CSU' },
    { label: 'Focus', value: 'Front-end & UI' },
    { label: 'Also into', value: 'Flutter & ML' },
  ],
};

/* ─── Skills ──────────────────────────────────────────────────────────── */
export const skills = [
  {
    category: 'Front-End',
    icon: LuMonitorSmartphone,
    items: [
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    category: 'Mobile & Machine Learning',
    icon: LuSmartphone,
    items: [
      { name: 'Flutter', icon: SiFlutter },
      { name: 'Dart', icon: SiDart },
      { name: 'Python', icon: SiPython },
      { name: 'TensorFlow Lite', icon: SiTensorflow },
    ],
  },
  {
    category: 'Back-End & Tools',
    icon: LuServer,
    items: [
      { name: 'PHP', icon: SiPhp },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: TbBrandVscode },
      { name: 'Vercel', icon: SiVercel },
    ],
  },
];

/* ─── Projects ────────────────────────────────────────────────────────── */
// `featured: true` shows a project as a large, full-width card at the top.
// `demo` is optional (null hides it). `demoLabel` changes its link text
// (default "Live demo"), e.g. "Watch demo" for a video.
export const projects = [
  {
    name: 'Door of Hope ChMS',
    description:
      'A phone-friendly church management system for Door of Hope Assembly of God: member records, QR-code check-in, automatic attendance status, role-based access and a pastor’s dashboard that flags who needs a follow-up.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    image: 'images/projects/door-of-hope.webp',
    imageAlt: 'Door of Hope ChMS sign-in screen on desktop and mobile',
    github: `${GITHUB}/Door-of-Hope-ChMS`,
    demo: 'https://doorofhopechms.vercel.app',
    demoLabel: 'Live site',
    featured: true,
  },
  {
    name: 'BoardingHub',
    description:
      'A boarding house and dormitory finder for students, with search filters, room reservations, saved listings, OTP account verification and an admin panel.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    image: 'images/projects/boardinghub.webp',
    imageAlt: 'BoardingHub home page with a boarding house search bar',
    github: `${GITHUB}/ReadyFinalChecking`,
    demo: null,
  },
  {
    name: 'Car Brand Logo Classifier',
    description:
      'A Flutter app that recognizes 10 car brands common in the Philippines from the camera or gallery, using an on-device TensorFlow Lite model and logging results to Firebase.',
    tech: ['Flutter', 'Dart', 'TensorFlow Lite', 'Firebase'],
    image: 'images/projects/car-brand-classifier.webp',
    imageAlt: 'Training the car logo model in Teachable Machine, with Honda predicted at 100%',
    github: `${GITHUB}/IT-120-Final-Project-GitHub-repository-Submission`,
    demo: 'https://www.youtube.com/watch?v=GtmuSy8X12s',
    demoLabel: 'Watch demo',
  },
  {
    name: 'Flutter UI Components',
    description:
      'A set of reusable Flutter widgets: scaffold layouts with app bars, tabs, side drawers, floating action buttons and bottom navigation.',
    tech: ['Flutter', 'Dart'],
    image: 'images/projects/flutter-ui-components.webp',
    imageAlt: 'Three Flutter app screens showing tabs, a floating action button and a side drawer',
    github: `${GITHUB}/Flutter_Widget_UIComponents`,
    demo: null,
  },
];

/* ─── Experience & Education (newest first) ───────────────────────────── */
// `highlights` is optional: a short list of achievements.
// TODO: add work experience, internships or freelance work here when you have it, e.g.
// {
//   title: 'Front-End Developer Intern',
//   org: 'Company Name',
//   location: 'Butuan City',
//   period: 'Jun 2027 — Aug 2027',
//   description: 'What you worked on.',
// },
export const experience = [];

export const education = [
  {
    title: 'BS Information Technology',
    org: 'Caraga State University – Cabadbaran Campus',
    location: 'Cabadbaran City',
    period: '2023 — Present',
    description: 'Fourth-year student focusing on web design, front-end development and machine learning.',
    highlights: [
      'IT 120 final project: a Flutter app that recognizes car brands with an on-device ML model',
      'Built web systems in PHP/MySQL and Next.js as course and personal projects',
    ],
  },
];
