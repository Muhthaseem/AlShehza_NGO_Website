const projectImage = path => `${import.meta.env.BASE_URL}assets/images/${path}`;

export const projects = {
  'community-well': {
    order: 1,
    category: 'Community water',
    title: 'Community well project',
    summary: 'Shared water points at mosques and madrasas support drinking and wudhu for the wider community.',
    images: [projectImage('community_water_well_donation/12.jpeg')],
    sections: [
      { heading: 'Water for shared spaces', content: '<p>We support multipurpose community tanks with piped water at mosques and madrasas, helping make water available for drinking and wudhu.</p>' },
      { heading: 'A resource for everyone', content: '<p>By placing these facilities in shared community spaces, the project serves worshippers, students, and neighbours in their daily routines.</p>' },
    ],
  },
  'tube-well-donations': {
    order: 2,
    category: 'Household water',
    title: 'Tube-well donations',
    summary: 'Tube wells bring essential water closer to households for drinking and everyday home needs.',
    images: [
      projectImage('tube_well_donation/18.png'),
      projectImage('tube_well_donation/19.png'),
      projectImage('tube_well_donation/20.png'),
      projectImage('tube_well_donation/21.png'),
      projectImage('tube_well_donation/22.png'),
      projectImage('tube_well_donation/23.png'),
      projectImage('tube_well_donation/24.png'),
      projectImage('tube_well_donation/25.png'),
      projectImage('tube_well_donation/26.png'),
      projectImage('tube_well_donation/27.png'),
      projectImage('tube_well_donation/28.png'),
      projectImage('tube_well_donation/29.png'),
    ],
    sections: [
      { heading: 'Water close to home', content: '<p>We provide tube wells to households where access to essential water is needed for drinking and daily activities.</p>' },
      { heading: 'Practical, lasting support', content: '<p>Each well is intended to serve the household and the people who rely on it, making an important everyday resource more accessible.</p>' },
    ],
  },
  'rice-bag-donations': {
    order: 3,
    category: 'Food support',
    title: 'Rice-bag donations',
    summary: 'Rice donations help households facing hardship bring a staple food to the family table.',
    images: [
      projectImage('rice_bag_donation/7.png'),
      projectImage('rice_bag_donation/8.png'),
      projectImage('rice_bag_donation/9.png'),
      projectImage('rice_bag_donation/10.png'),
      projectImage('rice_bag_donation/11.png'),
    ],
    sections: [
      { heading: 'A staple shared with care', content: '<p>Rice is an essential food in many homes. Through this initiative, we donate bags of rice to people and families who need support.</p>' },
      { heading: 'Relief for households', content: '<p>Every donation is a practical contribution toward easing food needs and helping families prepare meals at home.</p>' },
    ],
  },
  'iftar-food-donations': {
    order: 4,
    category: 'Ramadhan relief',
    title: 'Iftar food donations',
    summary: 'Freshly prepared meals are shared with children and community members for iftar during Ramadhan.',
    images: [
      projectImage('iftar_food_donation/1.png'),
      projectImage('iftar_food_donation/2.png'),
      projectImage('iftar_food_donation/3.png'),
      projectImage('iftar_food_donation/4.png'),
      projectImage('iftar_food_donation/5.png'),
      projectImage('iftar_food_donation/6.png'),
    ],
    sections: [
      { heading: 'A meal at iftar', content: '<p>During Ramadhan, we prepare and share food with children and others who are fasting, so they can break their fast with a nourishing meal.</p>' },
      { heading: 'The spirit of sharing', content: '<p>These gatherings bring people together around the iftar table in a spirit of generosity, care, and community.</p>' },
    ],
  },
  'nutrient-yoghurt-donations': {
    order: 5,
    category: 'Children’s nutrition',
    title: 'Nutrient-rich yoghurt donations',
    summary: 'Yoghurt is shared with children in need as a nourishing addition to their food.',
    images: [
      projectImage('nutrient_yoghurt_donation/13.png'),
      projectImage('nutrient_yoghurt_donation/14.png'),
      projectImage('nutrient_yoghurt_donation/15.png'),
      projectImage('nutrient_yoghurt_donation/16.png'),
      projectImage('nutrient_yoghurt_donation/17.png'),
    ],
    sections: [
      { heading: 'Nourishment for children', content: '<p>We provide nutrient-rich yoghurt to children who need additional food support, including those at risk of not getting enough nutrients.</p>' },
      { heading: 'Care in every serving', content: '<p>This simple food donation is one way we respond to children’s needs with thoughtful, practical care.</p>' },
    ],
  },
  'qurban-programme': {
    order: 6,
    category: 'Eid al-Adha giving',
    title: 'Qurban programme',
    summary: 'Qurban meat is shared with people and families in need during Eid al-Adha.',
    images: [],
    sections: [
      { heading: 'Sharing the Qurban', content: '<p>For Eid al-Adha, we arrange Qurban and distribute its meat to people and families in need.</p>' },
      { heading: 'A tradition of generosity', content: '<p>Rooted in the Muslim tradition of Qurban, the programme helps share the blessings of Eid with those who may otherwise have less to celebrate with.</p>' },
    ],
  },
  'quran-donations': {
    order: 7,
    category: 'Faith & learning',
    title: 'Quran donations',
    summary: 'Qurans are provided to children learning to read, write, and memorise the Quran.',
    images: [],
    sections: [
      { heading: 'Supporting Quran learning', content: '<p>We donate Qurans for children studying to read and write the Quran and for those pursuing memorisation.</p>' },
      { heading: 'A resource for the journey', content: '<p>Providing these texts helps learners and their teachers continue their studies with an essential resource close at hand.</p>' },
    ],
  },
};
