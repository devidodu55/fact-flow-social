
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

export const facts: Fact[] = [
  {
    id: "1",
    title: "Bananas Are Berries, But Strawberries Aren't",
    content: "Botanically speaking, bananas are classified as berries, while strawberries are considered 'aggregate accessory fruits'. This is because bananas develop from a single flower with one ovary, while strawberries develop from a flower with multiple ovaries.",
    source: "Botanical Journal",
    imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
    category: "Science",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "Honey Never Spoils",
    content: "Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat. Honey's low moisture content, acidic pH, and hydrogen peroxide production create an environment where bacteria cannot survive.",
    imageUrl: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
    category: "Food",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "3",
    title: "A Day on Venus is Longer Than a Year on Venus",
    content: "Venus rotates extremely slowly. It takes about 243 Earth days to complete one rotation, while it only takes 225 Earth days to orbit the Sun. This means a day on Venus (sunrise to sunrise) is longer than its year!",
    source: "NASA",
    category: "Space",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Octopuses Have Three Hearts",
    content: "Octopuses have one main heart that pumps blood around the body and two additional hearts that pump blood specifically to the gills. Their blood is also blue due to a copper-rich protein called hemocyanin.",
    imageUrl: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10",
    category: "Marine Biology",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "The First Computer Bug Was an Actual Bug",
    content: "The term 'bug' to describe computer glitches originated in 1947 when Grace Hopper found a moth stuck in a relay of the Harvard Mark II computer. She taped the moth in her logbook with the note, 'First actual case of bug being found.'",
    source: "Computer History Museum",
    category: "Technology",
    createdAt: new Date().toISOString(),
  }
];

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
