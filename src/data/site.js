// Your personal details. Change them here once and they update everywhere:
// header, footer, page titles, About and Contact pages.

export const site = {
  name: "Samarita's Portfolio",
  email: 'samarita.kingreymark@gmail.com',
  location: 'Pasay City, Philippines',
  availability: 'Open to work',

  // One or two sentences shown at the top of the About page.
  tagline:
    'A curious developer with two years of experience in web, data and electronics.',

  // Home page introduction.
  intro:
    'Welcome to my portfolio. Here you can see the projects I have built, the tools I use, and what I have learned along the way. Choose a project to read how I made it.',

  // About page paragraphs. Add or remove items freely.
  bio: [
    'Tell your story in two or three short paragraphs. Start with how you got interested in your field, then say what you are working on now, and finish with what you want to do next.',
    'Keep sentences short and use everyday words. A visitor of any age should be able to understand what you do and why you enjoy it.',
  ],

  social: {
    github: 'https://github.com/nixxinix',
    linkedin: 'http://linkedin.com/in/king-rey-mark-samarita',
  },

  // Optional form service address (for example Formspree). Set it in a .env.local
  // file or in the Vercel dashboard as VITE_CONTACT_ENDPOINT. When empty, the
  // Contact form opens the visitor's email app instead.
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT ?? '',
}
