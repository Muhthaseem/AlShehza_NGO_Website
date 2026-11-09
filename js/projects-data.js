const projectImage = path => `${import.meta.env.BASE_URL}assets/images/${path}`;

export const projects = {
  'community-well': {
    order: 1,
    category: 'Community water',
    title: 'Community well project',
    summary: 'Community water tanks at mosques and madrasas provide a shared point for drinking water and wudhu.',
    images: [projectImage('community_water_well_donation/12.jpeg')],
    sections: [
      { heading: 'Water for shared spaces', content: '<p>This initiative supports community water tanks with piped water at mosques and madrasas. The facilities are intended to make water available for drinking and for wudhu.</p>' },
      { heading: 'A shared community resource', content: '<p>People who attend or use these shared spaces—including worshippers, students, and neighbours—can access the facility as part of their daily routines.</p>' },
    ],
  },
  'tube-well-donations': {
    order: 2,
    category: 'Household water',
    title: 'Tube-well donations',
    summary: 'Household tube wells support access to water for drinking and everyday activities at home.',
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
      { heading: 'Water for household use', content: '<p>The foundation provides tube wells to households to support access to water for drinking and daily activities.</p>' },
      { heading: 'An everyday resource', content: '<p>A household well brings a water source closer to the people who use it. The initiative focuses on making this basic resource more accessible at home.</p>' },
    ],
  },
  'rice-bag-donations': {
    order: 3,
    category: 'Food support',
    title: 'Rice donations for households',
    summary: 'Rice donations provide a staple food to households experiencing hardship.',
    images: [
      projectImage('rice_bag_donation/7.png'),
      projectImage('rice_bag_donation/8.png'),
      projectImage('rice_bag_donation/9.png'),
      projectImage('rice_bag_donation/10.png'),
      projectImage('rice_bag_donation/11.png'),
    ],
    sections: [
      { heading: 'Staple food assistance', content: '<p>Rice is a staple food in many households. This initiative donates rice to people and families who need support.</p>' },
      { heading: 'Support for the family table', content: '<p>Providing rice offers practical food assistance and helps households prepare meals at home.</p>' },
    ],
  },
  'iftar-food-donations': {
    order: 4,
    category: 'Ramadhan relief',
    title: 'Iftar food donations',
    summary: 'Meals are prepared and shared with children and community members to break the fast during Ramadhan.',
    images: [
      projectImage('iftar_food_donation/1.png'),
      projectImage('iftar_food_donation/2.png'),
      projectImage('iftar_food_donation/3.png'),
      projectImage('iftar_food_donation/4.png'),
      projectImage('iftar_food_donation/5.png'),
      projectImage('iftar_food_donation/6.png'),
    ],
    sections: [
      { heading: 'Food during Ramadhan', content: '<p>The foundation prepares and shares iftar meals with children and community members during Ramadhan, providing food for people to break their fast.</p>' },
      { heading: 'A community meal', content: '<p>Sharing iftar brings people together around a meal and reflects the season’s values of generosity and care.</p>' },
    ],
  },
  'nutrient-yoghurt-donations': {
    order: 5,
    category: 'Children’s nutrition',
    title: 'Nutrient-rich yoghurt donations',
    summary: 'Yoghurt donations provide children with additional food support.',
    images: [
      projectImage('nutrient_yoghurt_donation/13.png'),
      projectImage('nutrient_yoghurt_donation/14.png'),
      projectImage('nutrient_yoghurt_donation/15.png'),
      projectImage('nutrient_yoghurt_donation/16.png'),
      projectImage('nutrient_yoghurt_donation/17.png'),
    ],
    sections: [
      { heading: 'Food support for children', content: '<p>The foundation shares yoghurt with children as part of its nourishment work. This initiative adds a food item to the support provided to children and families.</p>' },
      { heading: 'Practical nourishment', content: '<p>Yoghurt donations are one part of the foundation’s wider food and nourishment programmes for children.</p>' },
    ],
  },
  'qurban-programme': {
    order: 6,
    category: 'Eid al-Adha giving',
    title: 'Qurban programme',
    summary: 'Qurban meat is distributed to people and families experiencing hardship for Eid al-Adha.',
    images: [],
    sections: [
      { heading: 'Eid al-Adha distribution', content: '<p>The foundation arranges Qurban and distributes its meat to people and families experiencing hardship during Eid al-Adha.</p>' },
      { heading: 'Sharing with the community', content: '<p>The programme reflects the tradition of Qurban and the practice of sharing with others during the Eid period.</p>' },
    ],
  },
  'quran-donations': {
    order: 7,
    category: 'Faith & learning',
    title: 'Quran donations',
    summary: 'Quran donations provide learning resources to children studying to read, write, and memorise the Quran.',
    images: [],
    sections: [
      { heading: 'Learning materials for children', content: '<p>The foundation donates Qurans to children who are learning to read and write the Quran and to children pursuing memorisation.</p>' },
      { heading: 'A practical learning resource', content: '<p>These donations provide learners and teachers with a text used in their ongoing studies.</p>' },
    ],
  },
};
