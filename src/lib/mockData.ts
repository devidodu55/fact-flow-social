export interface Fact {
  id: string;
  title: string;
  content: string;
  source?: string;
  imageUrl?: string;
  category: string;
  createdAt: string;
}

export interface Reaction {
  id: string;
  factId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  text?: string;
  gifUrl?: string;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  reactionId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  text: string;
  gifUrl?: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

// Extended list of facts with more interesting content
export const facts: Fact[] = [
  {
    id: "fact1",
    title: "Les fourmis peuvent soulever 50 fois leur poids",
    content: "Les fourmis sont incroyablement fortes pour leur taille. Si les humains avaient la même force proportionnelle, nous pourrions soulever une voiture au-dessus de notre tête!",
    category: "nature",
    source: "National Geographic",
    createdAt: "2023-01-15T09:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1558954355-2bb36d5d6c6e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy",
  },
  {
    id: "fact2",
    title: "Une journée sur Vénus est plus longue qu'une année",
    content: "Vénus tourne si lentement sur elle-même qu'il faut 243 jours terrestres pour compléter une rotation. Mais son orbite autour du soleil ne prend que 225 jours, ce qui signifie qu'une journée vénusienne est plus longue qu'une année vénusienne!",
    category: "astronomy",
    source: "NASA",
    createdAt: "2023-02-20T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact3",
    title: "Le miel ne se périme jamais",
    content: "Les archéologues ont trouvé des pots de miel dans des tombes égyptiennes vieux de plus de 3000 ans qui sont encore parfaitement comestibles. Grâce à sa composition chimique unique, le miel peut rester intact indéfiniment s'il est correctement scellé.",
    category: "food",
    source: "Smithsonian Magazine",
    createdAt: "2023-03-10T11:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact4",
    title: "Les octopodes ont trois cœurs",
    content: "Les octopodes ont un système circulatoire complexe avec trois cœurs: deux pompent le sang à travers les branchies, tandis que le troisième fait circuler le sang dans le reste du corps.",
    category: "biology",
    source: "Ocean Conservancy",
    createdAt: "2023-04-05T16:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact5",
    title: "Un éclair est cinq fois plus chaud que la surface du soleil",
    content: "Un éclair peut atteindre environ 30 000 degrés Celsius, ce qui est cinq fois plus chaud que la surface du soleil (qui est d'environ 5 500 degrés Celsius).",
    category: "science",
    source: "National Weather Service",
    createdAt: "2023-05-12T10:10:00Z",
    imageUrl: "https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact6",
    title: "Les koalas ont des empreintes digitales presque identiques aux humains",
    content: "Les koalas ont des empreintes digitales si similaires aux nôtres qu'elles ont déjà été confondues avec celles d'humains sur des scènes de crime. Cette évolution convergente est remarquable car nous ne sommes pas étroitement liés.",
    category: "animals",
    source: "Australian Museum",
    createdAt: "2023-06-18T13:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1579879583914-fa46cbec0a5c?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact7",
    title: "Le café est la deuxième marchandise la plus échangée au monde",
    content: "Après le pétrole, le café est la marchandise la plus échangée au monde. Plus de 500 milliards de tasses de café sont consommées chaque année dans le monde entier.",
    category: "economics",
    source: "International Coffee Organization",
    createdAt: "2023-07-22T09:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact8",
    title: "Les bananes sont radioactives",
    content: "Les bananes contiennent du potassium-40, un isotope radioactif naturel. Mais pas d'inquiétude, vous devriez manger environ 10 millions de bananes en une seule fois pour souffrir des effets de la radiation.",
    category: "food",
    source: "American Nuclear Society",
    createdAt: "2023-08-30T15:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact9",
    title: "Le cerveau humain peut stocker 2.5 pétaoctets d'informations",
    content: "Selon les estimations scientifiques, la capacité de stockage du cerveau humain est d'environ 2.5 pétaoctets (ou 2 500 000 gigaoctets). C'est assez pour stocker 300 ans de vidéos en continu!",
    category: "biology",
    source: "Scientific American",
    createdAt: "2023-09-14T11:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
  {
    id: "fact10",
    title: "L'eau peut bouillir et geler en même temps",
    content: "Au 'point triple', une combinaison spécifique de température et de pression, l'eau peut exister simultanément sous forme solide, liquide et gazeuse. C'est l'un des phénomènes les plus fascinants de la thermodynamique.",
    category: "physics",
    source: "American Physical Society",
    createdAt: "2023-10-05T14:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1603546945862-c72fdce70ce2?ixlib=rb-4.0.3&q=85&fm=jpg",
  },
];

// Helper function to add a new fact
export const addNewFact = (fact: Omit<Fact, "id" | "createdAt">) => {
  const newFact: Fact = {
    ...fact,
    id: `fact${facts.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  facts.push(newFact);
  return newFact;
};

// Helper function to get facts by category
export const getFactsByCategory = (category: string) => {
  return facts.filter(fact => fact.category === category);
};

export const reactions: Reaction[] = [
  {
    id: "r1",
    factId: "1",
    userId: "user1",
    username: "fruitlover",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fruitlover",
    text: "Mind blown! I've been living a lie about strawberries all this time.",
    likes: 42,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
    comments: [
      {
        id: "c1",
        reactionId: "r1",
        userId: "user2",
        username: "botanist_bob",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=botanist_bob",
        text: "Wait until you learn about raspberries!",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
        likes: 8,
      },
    ],
  },
  {
    id: "r2",
    factId: "2",
    userId: "user3",
    username: "history_buff",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=history_buff",
    text: "Ancient Egyptians were truly ahead of their time in preservation techniques.",
    gifUrl: "https://media.tenor.com/VszqpvMyhYEAAAAd/ancient-egypt-simpsons.gif",
    likes: 27,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
    comments: [],
  },
  {
    id: "r3",
    factId: "3",
    userId: "user4",
    username: "space_explorer",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=space_explorer",
    text: "Venus is truly bizarre! Imagine a day lasting longer than a year!",
    likes: 54,
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
    comments: [
      {
        id: "c2",
        reactionId: "r3",
        userId: "user5",
        username: "galaxy_girl",
        userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=galaxy_girl",
        text: "The concept of 'day' and 'year' gets really confusing on other planets!",
        createdAt: new Date(Date.now() - 3600000 * 7).toISOString(), // 7 hours ago
        likes: 15,
      },
    ],
  },
];

// Helper function to get reactions for a specific fact
export const getReactionsForFact = (factId: string): Reaction[] => {
  return reactions.filter((reaction) => reaction.factId === factId);
};
