export const siteConfig = {
  language: 'en',
  theme: {
    headingFont: "'Lora', Georgia, serif",
    bodyFont: "'DM Sans', sans-serif",
    primary: '#1E4653',
    primaryLight: '#2C5D6A',
    primaryMedium: '#3D7585',
    accent: '#B85C3E',
    accentText: '#8E3D27',
    accentLight: '#D8864E',
    accentDark: '#C45A3E',
    warmIvory: '#F7F5EB',
  },
  organization: {
    name: 'Al Shehza Foundation',
    shortName: 'Al Shehza Foundation',
    legalName: 'Al Shehza Foundation (Guarantee) Limited',
    slogan: 'Compassion in action. Dignity for all.',
    description: 'A non-profit organization supporting vulnerable communities through social care, clean water, and seasonal relief.',
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
      description: 'Al Shehza Foundation works to alleviate poverty and restore dignity through community support, clean water, and seasonal relief.',
      hero: {
        eyebrow: 'Al Shehza Foundation',
        title: 'Care that reaches people. Support that restores dignity.',
        subtitle: 'We work alongside underserved communities to meet essential needs, improve access to clean water, and build a more secure future.',
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
        title: 'Support rooted in dignity',
        paragraphs: [
          'Al Shehza Foundation (Guarantee) Limited is a non-profit organization established in 2021 to support people and families facing poverty and hardship.',
          'From immediate assistance to community-led infrastructure, we believe every person deserves care, opportunity, and the chance to live with dignity.',
        ],
      },
      programPillars: [
        { icon: 'water', number: '01', title: 'Water for daily life', description: 'Community wells and household tube wells bring essential water closer to home.', href: 'projects.html#project-1' },
        { icon: 'hand-holding-heart', number: '02', title: 'Food and nourishment', description: 'Rice, iftar meals, and yoghurt offer practical support to people and children in need.', href: 'projects.html#project-3' },
        { icon: 'charity', number: '03', title: 'Faith and learning', description: 'Qurban and Quran donations share care, learning, and the spirit of giving.', href: 'projects.html#project-6' },
      ],
      projects: {
        title: 'Care in action',
        description: 'Our work responds to immediate needs while supporting healthier, more resilient communities.',
        action: 'Explore our work',
      },
      callToAction: {
        title: 'A more dignified future is built',
        titleHighlight: 'together.',
        description: 'Learn about our work and the people at the heart of Al Shehza Foundation.',
        primaryAction: 'Meet our leadership',
      },
    },
    about: {
      title: 'Our Story',
      description: 'Learn about Al Shehza Foundation, its mission, and its commitment to compassionate community support.',
      hero: {
        eyebrow: 'Our story',
        title: 'Rooted in compassion. Focused on dignity.',
        subtitle: 'Established in 2021, Al Shehza Foundation works to uplift underserved communities through thoughtful, practical social support.',
      },
      mission: {
        title: 'A commitment to care',
        description: 'We aim to alleviate poverty, support people through difficult times, and help communities access the essentials needed for health and well-being.',
      },
      values: [
        { number: '01', title: 'Empathy', description: 'Listen to people and respond with compassion and respect.' },
        { number: '02', title: 'Dignity', description: 'Put people first and support them without compromising their dignity.' },
        { number: '03', title: 'Responsibility', description: 'Approach community support with care, transparency, and purpose.' },
      ],
      approach: {
        title: 'Relief for today. Hope for tomorrow.',
        description: 'We share practical support through community and household water projects, food and nourishment donations, and initiatives rooted in faith and learning.',
      },
    },
    projects: {
      title: 'Our Work',
      description: 'Explore Al Shehza Foundation projects in community water, food support, children’s nourishment, Qurban, and Quran learning.',
      hero: {
        eyebrow: 'Our work',
        title: 'Practical care. Community impact.',
        subtitle: 'Our programs focus on essential needs, access to clean water, and support for families during challenging times.',
      },
      action: 'Contact our leadership',
    },
    contact: {
      title: 'Contact',
      description: 'Meet the founder and president of Al Shehza Foundation.',
      hero: {
        eyebrow: 'Leadership',
        title: 'The people behind the purpose.',
        subtitle: 'Al Shehza Foundation is guided by a commitment to compassionate service and human dignity.',
      },
      leaderRole: 'Founder & President',
      leaderName: 'S. Rismir',
      leaderDescription: 'Founder and President of Al Shehza Foundation, leading its work to support communities with compassion and dignity.',
      leaderPhone: '+94771415023',
      leaderEmail: 'sawahirrismir3@gmail.com',
      leadershipNote: 'Founder & President · Al Shehza Foundation',
    },
  },
  footer: {
    description: 'A non-profit organization working with compassion to alleviate poverty and restore human dignity.',
    copyright: 'All rights reserved.',
    projectLinks: ['Community support', 'Clean water', 'Seasonal relief'],
  },
};
