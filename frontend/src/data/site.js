export const site = {
  name: 'Ayman EL HARI',
  initials: 'AE',
  role: 'Étudiant développeur web full-stack',
  intro:
    "J'apprends le développement web en construisant des applications complètes avec React, Symfony et Docker.",
  availability: 'Disponible pour un stage',
  cvFile: 'cv.pdf',

  // Résumé affiché dans la carte « En bref » du hero.
  highlights: [
    {
      label: 'Formation',
      value: "Concepteur Développeur d'applications",
      detail: 'Normandie Web School',
    },
    { label: 'Recherche', value: 'Stage ou alternance' },
    { label: 'Stack principale', value: 'React · Symfony · Docker' },
    { label: 'Langues', value: 'Arabe, anglais (C1), français (B2)' },
  ],

  about: [
    "Je suis un étudiant Concepteur Développeur d'applications à Normandie Web School, après une formation en ingénierie Big Data à l'ESIGELEC et deux années de classes préparatoires MP. J'aime comprendre comment une application fonctionne de l'interface jusqu'à la base de données.",
    "Rigoureux, adaptable et à l'aise à l'écrit comme à l'oral (français B2, anglais C1, arabe langue maternelle), je cherche un stage ou une alternance pour travailler sur des projets réels et progresser auprès d'une équipe.",
  ],

  education: [
    {
      title: "Concepteur Développeur d'applications",
      school: 'Normandie Web School',
      note: 'En cours',
      current: true,
    },
    { title: 'Ingénierie Big Data', school: 'ESIGELEC' },
    { title: 'Classes préparatoires MP', school: 'Mathématiques et physique', note: '2 ans' },
  ],

  skills: [
    { group: 'Front-end', icon: 'front', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
    { group: 'Back-end', icon: 'back', items: ['PHP', 'Symfony', 'Java', 'Python', 'API REST'] },
    { group: 'Bases de données', icon: 'database', items: ['SQL', 'PostgreSQL', 'Oracle'] },
    { group: 'Outils', icon: 'tools', items: ['Git et GitHub', 'Docker'] },
  ],

  email: 'aelhari@normandiewebschool.fr',
  socials: [
    { label: 'GitHub', icon: 'github', handle: 'Yokaine', url: 'https://github.com/Yokaine' },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      handle: 'ayman-el-hari',
      url: 'https://www.linkedin.com/in/ayman-el-hari',
    },
  ],
}
