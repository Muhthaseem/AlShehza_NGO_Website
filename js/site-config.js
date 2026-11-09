export const siteConfig = {
  language: 'en',
  theme: {
    headingFont: "'Space Grotesk', Arial, sans-serif",
    bodyFont: "'Space Grotesk', Arial, sans-serif",
    primary: '#10120F',
    primaryLight: '#191C18',
    primaryMedium: '#22271F',
    accent: '#D8F36A',
    accentText: '#3C4A13',
    accentLight: '#8293FF',
    accentDark: '#4056DD',
    warmIvory: '#F3F1E7',
  },
  organization: {
    name: 'Al Shehza Foundation',
    shortName: 'Al Shehza Foundation',
    legalName: 'Al Shehza Foundation (Guarantee) Limited',
    slogan: 'Compassion in action. Dignity for all.',
    description: 'A non-profit organization established in 2021 to support people and families facing hardship through practical community programmes.',
    founded: '2021',
    email: 'alshehzafoundation@gmail.com',
  },
  navigation: [
    { name: 'Home', href: 'index.html' },
    { name: 'Our Work', href: 'projects.html' },
    { name: 'Our Story', href: 'about.html' },
    { name: 'Contact', href: 'contact.html' },
  ],
  pages: {
    home: {
      title: 'Al Shehza Foundation',
      description: 'Al Shehza Foundation is a non-profit established in 2021. It supports people and families facing hardship through water, food, nourishment, and community programmes.',
      hero: {
        eyebrow: 'Al Shehza Foundation',
        title: 'Care that reaches people. Support that restores dignity.',
        subtitle: 'We support people and families facing hardship through community water projects, household wells, food assistance, children’s nourishment, and seasonal giving.',
        primaryAction: 'Discover our work',
        secondaryAction: 'Our story',
      },
      stats: [
        { value: '2021', label: 'Established' },
        { value: 'Dignity', label: 'Our approach' },
        { value: 'Practical care', label: 'Our commitment' },
      ],
      introduction: {
        eyebrow: 'Why we are here',
        title: 'Practical support, offered with dignity',
        paragraphs: [
          'Al Shehza Foundation (Guarantee) Limited is a non-profit organization established in 2021. Its work focuses on practical help for people and families experiencing poverty and hardship.',
          'The foundation’s programmes include community and household water access, food assistance, nourishment for children, Qurban sharing, and Quran learning resources. Each responds to a basic need while respecting the people and communities involved.',
        ],
      },
      programPillars: [
        { icon: 'water', number: '01', title: 'Community and household water', description: 'Community tanks and household tube wells support access to water for drinking and everyday needs.', href: 'projects.html#project-1' },
        { icon: 'hand-holding-heart', number: '02', title: 'Food and children’s nourishment', description: 'Rice, iftar meals, and yoghurt provide practical food support to households and children.', href: 'projects.html#project-3' },
        { icon: 'charity', number: '03', title: 'Seasonal giving and learning', description: 'Qurban meat is shared for Eid al-Adha, and Quran donations support children’s studies.', href: 'projects.html#project-6' },
      ],
      projects: {
        title: 'Care in action',
        description: 'The foundation’s initiatives address practical needs through community water, household water, food, nourishment, seasonal giving, and learning resources.',
        action: 'Explore our work',
      },
      callToAction: {
        title: 'A more dignified future is built',
        titleHighlight: 'together.',
        description: 'Ask about the foundation’s programmes, share a community enquiry, or get in touch with its leadership.',
        primaryAction: 'Meet our leadership',
      },
    },
    about: {
      title: 'Our Story',
      description: 'Learn why Al Shehza Foundation was established, whom its programmes support, and the values that guide its community work.',
      hero: {
        eyebrow: 'Our story',
        title: 'Community support grounded in dignity',
        subtitle: 'Established in 2021, Al Shehza Foundation supports people and families facing hardship through practical programmes shaped around essential needs.',
      },
      mission: {
        title: 'Our purpose',
        description: 'To respond to poverty and hardship with practical community support that helps people access essentials and is offered with respect for every person’s dignity.',
      },
      values: [
        { number: '01', title: 'Empathy', description: 'Listen to people and respond with compassion and respect.' },
        { number: '02', title: 'Dignity', description: 'Put people first and support them without compromising their dignity.' },
        { number: '03', title: 'Responsibility', description: 'Approach community support with care, transparency, and purpose.' },
      ],
      approach: {
        title: 'Listen to needs. Provide practical support.',
        description: 'The foundation’s work includes community water tanks and household tube wells, rice and iftar food donations, yoghurt for children, Qurban meat distribution, and Quran donations for children’s learning.',
      },
    },
    projects: {
      title: 'Our Work',
      description: 'Explore seven Al Shehza Foundation initiatives in community and household water, food assistance, children’s nourishment, Qurban, and Quran learning.',
      hero: {
        eyebrow: 'Our work',
        title: 'Practical care. Community impact.',
        subtitle: 'Our programs focus on essential needs, access to clean water, and support for families during challenging times.',
      },
      action: 'Contact our leadership',
    },
    contact: {
      title: 'Contact',
      description: 'Contact Al Shehza Foundation about its community programmes, general enquiries, or leadership.',
      hero: {
        eyebrow: 'Contact the foundation',
        title: 'Enquiries about our work',
        subtitle: 'Contact Al Shehza Foundation with a question about its programmes, community work, or general enquiries.',
      },
      leaderRole: 'Founder & President',
      leaderName: 'S. Rismir',
      leaderDescription: 'For direct enquiries about the foundation and its programmes, contact the Founder and President.',
      leaderPhone: '+94771415023',
      leaderEmail: 'sawahirrismir3@gmail.com',
      leadershipNote: 'Founder & President · Al Shehza Foundation',
    },
  },
  footer: {
    description: 'Al Shehza Foundation is a non-profit established in 2021. Its programmes support access to water, food, nourishment, and learning resources for people facing hardship.',
    copyright: 'All rights reserved.',
    projectLinks: ['Community support', 'Clean water', 'Seasonal relief'],
  },
};
