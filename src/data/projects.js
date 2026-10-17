// One object per project. To add a project:
//   1. Put a picture in public/images/projects/  (kebab-case name, 1200 x 900)
//   2. Copy one object below, give it a new unique `slug`, and edit the text.
// Its card and its details page (/projects/your-slug) appear automatically.
// New `category` words automatically get their own filter button.

export const projects = [
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    category: 'Data',
    image: '/images/projects/weather-dashboard.svg',
    summary: 'A simple dashboard that turns a year of weather readings into charts anyone can read.',
    role: 'Designer and developer',
    date: 'March 2026',
    tools: ['Python', 'SQL', 'Chart library'],
    overview:
      'This project collects daily temperature and rainfall readings and shows them as clear charts, so a family or a farm can see what the weather has been doing at a glance.',
    problem:
      'The raw numbers came from several files with different formats and many missing days. Reading them one by one was slow, and nobody could see the bigger picture.',
    steps: [
      'Cleaned and combined the files into one tidy table.',
      'Filled small gaps carefully and marked days that were still missing.',
      'Built charts for temperature, rainfall and the monthly average.',
      'Tested the dashboard with three people and simplified the labels they found confusing.',
    ],
    result:
      'The dashboard loads in under two seconds and was understood by every tester without any explanation.',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/your-username/weather-dashboard',
  },
  {
    slug: 'smart-plant-monitor',
    title: 'Smart Plant Monitor',
    category: 'Hardware',
    image: '/images/projects/smart-plant-monitor.svg',
    summary: 'A small device that measures soil moisture and tells you when a plant needs water.',
    role: 'Builder and programmer',
    date: 'January 2026',
    tools: ['Arduino', 'ESP32', 'C++'],
    overview:
      'A low-cost monitor that sits in a plant pot, reads soil moisture and light, and sends a friendly message to a phone when the plant is thirsty.',
    problem:
      'Many people forget to water plants, or water them too much. Commercial monitors can be expensive and hard to set up.',
    steps: [
      'Chose affordable sensors and tested them in different soils.',
      'Wrote the program that reads the sensors and saves power by sleeping between readings.',
      'Connected the device to Wi-Fi to send alerts.',
      'Built a small case so the electronics stay dry.',
    ],
    result:
      'The monitor ran for six weeks on one battery charge and warned correctly before every dry spell during testing.',
    liveUrl: '',
    codeUrl: 'https://github.com/your-username/smart-plant-monitor',
  },
  {
    slug: 'budget-tracker-website',
    title: 'Budget Tracker Website',
    category: 'Web',
    image: '/images/projects/budget-tracker-website.svg',
    summary: 'A friendly website for keeping track of weekly spending, built to work on any phone.',
    role: 'Designer and front-end developer',
    date: 'November 2025',
    tools: ['HTML', 'CSS', 'JavaScript'],
    overview:
      'A budgeting page where you type what you spent and instantly see how much is left for the week, with large buttons and plain words.',
    problem:
      'Most budgeting apps ask people to create an account and fill in many screens. Older relatives and teenagers both told me they simply gave up.',
    steps: [
      'Interviewed five people about how they track money today.',
      'Sketched three layouts and tested the simplest one on paper.',
      'Built the page with large text, high contrast and big buttons.',
      'Saved entries on the device so no account is needed.',
    ],
    result:
      'Testers added their first expense in under 20 seconds, including a tester who had never used a budgeting app.',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/your-username/budget-tracker',
  },
  {
    slug: 'library-app-design',
    title: 'Library App Design',
    category: 'Design',
    image: '/images/projects/library-app-design.svg',
    summary: 'Screens for a mobile app that helps people find and reserve books at their local library.',
    role: 'UI and UX designer',
    date: 'September 2025',
    tools: ['Figma', 'User testing'],
    overview:
      'A set of mobile screens for searching a library catalog, reserving a book and getting a reminder before it is due.',
    problem:
      'The existing library website was designed for desktop computers, and its small links were hard to tap. Parents and children struggled to use it together.',
    steps: [
      'Mapped the steps a visitor takes from searching to picking up a book.',
      'Designed a short flow with one clear action on every screen.',
      'Checked text size and color contrast against accessibility guidelines.',
      'Made a clickable prototype and tested it with children and older adults.',
    ],
    result:
      'In testing, everyone reserved a book without help, and the final design needs three taps instead of seven.',
    liveUrl: 'https://example.com',
    codeUrl: '',
  },
  {
    slug: 'recipe-sharing-website',
    title: 'Recipe Sharing Website',
    category: 'Web',
    image: '/images/projects/recipe-sharing-website.svg',
    summary: 'A small website where friends and family can save and share their favorite recipes.',
    role: 'Full-stack developer',
    date: 'June 2025',
    tools: ['HTML', 'CSS', 'JavaScript', 'Python'],
    overview:
      'A shared recipe book for a family. Anyone can add a recipe with photos, ingredients and steps, and search by ingredient.',
    problem:
      'Family recipes were scattered across messages, notebooks and photos. People kept asking the same person to resend them.',
    steps: [
      'Listed the information every recipe needs.',
      'Built the form and the recipe pages.',
      'Added search by ingredient and a print-friendly layout.',
      'Wrote short instructions for family members who are not used to websites.',
    ],
    result:
      'Over forty recipes were added in the first month, and the print layout became the most used feature.',
    liveUrl: 'https://example.com',
    codeUrl: 'https://github.com/your-username/recipe-sharing',
  },
  {
    slug: 'door-lock-prototype',
    title: 'Door Lock Prototype',
    category: 'Hardware',
    image: '/images/projects/door-lock-prototype.svg',
    summary: 'A prototype door lock that opens with a card or a phone and records who came in.',
    role: 'Embedded systems developer',
    date: 'April 2025',
    tools: ['ESP32', 'C++', 'Wi-Fi'],
    overview:
      'A working model of a smart lock: it reads an access card, opens the latch and logs each entry so the owner can review it later.',
    problem:
      'Keys get lost and copied, and the owner has no record of who entered. The goal was a low-cost lock that is simple enough for anyone in the household to use.',
    steps: [
      'Selected the card reader and the lock mechanism.',
      'Wrote the program that checks each card against an approved list.',
      'Added a small screen that shows clear messages like "Welcome" and "Card not allowed".',
      'Tested what happens during a power cut so the door never locks someone in.',
    ],
    result:
      'The prototype opened correctly for approved cards in every test and kept a complete entry log.',
    liveUrl: '',
    codeUrl: 'https://github.com/your-username/door-lock',
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
