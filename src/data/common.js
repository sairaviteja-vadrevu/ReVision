import { Home, GalleryHorizontalEnd, TerminalSquare } from "lucide-react";

export const TEMPLATES = {
  Movies: [
    {
      name: "Cyberpunk Hero",
      prompt:
        "Transform this person into a cyberpunk protagonist in a neon-lit city, with glowing tattoos and a futuristic urban backdrop",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Dune Warrior",
      prompt:
        "Make this person a desert warrior in a sci-fi setting inspired by Dune, with a stillsuit, sand dunes, and storm clouds",
      model: "PhotoMaker",
    },
    {
      name: "Time Traveler 2099",
      prompt:
        "Depict this person as a sleek, high-tech time traveler from the year 2099 with glowing circuits and space-time effects",
      model: "DreamShaper v8",
    },
    {
      name: "Vampire Royalty",
      prompt:
        "Reimagine this person as an elegant vampire in a gothic Victorian castle, with pale skin, fangs, and blood-red eyes",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Post-Apocalyptic Survivor",
      prompt:
        "Turn this person into a rugged survivor in a destroyed city landscape with tactical gear and dust effects",
      model: "DreamShaper v8",
    },
  ],
  Fantasy: [
    {
      name: "Elven Archer",
      prompt:
        "Make this person look like an elven archer from a fantasy world, wearing leaf armor, pointed ears, and standing in an enchanted forest",
      model: "DreamShaper v8",
    },
    {
      name: "Dark Sorcerer",
      prompt:
        "Transform this person into a dark fantasy sorcerer surrounded by purple magical energy and ancient runes",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Medieval Knight",
      prompt:
        "Render this person as a medieval knight in shining armor, sword in hand, with a battlefield behind",
      model: "DreamShaper v8",
    },
    {
      name: "Dragon Rider",
      prompt:
        "Place this person riding a dragon mid-air, with wind-blown hair and armor, in a fantasy sky",
      model: "PhotoMaker",
    },
    {
      name: "Witch Queen",
      prompt:
        "Turn this person into a regal witch queen in a moonlit forest with glowing orbs and spellbooks",
      model: "Realistic Vision v5.1",
    },
  ],
  Anime: [
    {
      name: "Shonen Hero",
      prompt:
        "Make this person a shonen anime main character with spiky hair, glowing aura, and a city exploding in the background",
      model: "DreamShaper v8",
    },
    {
      name: "High School Romance",
      prompt:
        "Render this person in a slice-of-life anime style as a high school student with cherry blossoms falling",
      model: "PhotoMaker",
    },
    {
      name: "Samurai Spirit",
      prompt:
        "Transform this person into a wandering anime samurai with traditional robes and a katana under moonlight",
      model: "DreamShaper v8",
    },
    {
      name: "Mecha Pilot",
      prompt:
        "Depict this person inside a giant robot cockpit in a futuristic anime universe with neon lighting",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Demon Slayer Style",
      prompt:
        "Style this person like a demon hunter anime character with special elemental effects (fire, water, etc.)",
      model: "PhotoMaker",
    },
  ],
  Cartoon: [
    {
      name: "Pixar Character",
      prompt:
        "Convert this person into a Pixar-style 3D cartoon character with exaggerated facial features and soft lighting",
      model: "PhotoMaker",
    },
    {
      name: "Disney Royalty",
      prompt:
        "Turn this person into a Disney-style prince or princess in a magical castle setting with bright colors",
      model: "PhotoMaker",
    },
    {
      name: "Comic Book Superhero",
      prompt:
        "Reimagine this person as a cel-shaded superhero in a comic book panel with action lines and bold inking",
      model: "DreamShaper v8",
    },
    {
      name: "South Park Style",
      prompt:
        "Convert this person into a South Park-style cartoon character with flat colors and paper-cutout look",
      model: "AnyLoRA",
    },
    {
      name: "Minion Universe",
      prompt:
        "Make this person a character in the Minions universe with oversized goggles and yellow tones",
      model: "PhotoMaker",
    },
  ],
  Stylized: [
    {
      name: "Monochrome Noir",
      prompt:
        "Create a black and white noir-style portrait of this person with shadows, smoke, and detective vibes",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Studio Ghibli Painting",
      prompt:
        "Render this person in a dreamy, watercolor Studio Ghibli-style background with gentle colors",
      model: "PhotoMaker",
    },
    {
      name: "Vaporwave Aesthetic",
      prompt:
        "Turn this person into a vaporwave-style character with retro 80s gridlines, purple hues, and Greek statues",
      model: "AnyLoRA",
    },
    {
      name: "Baroque Oil Painting",
      prompt:
        "Transform this person into a royal oil painting with 17th-century styling, brush strokes, and heavy shadows",
      model: "DreamShaper v8",
    },
    {
      name: "Digital Concept Art",
      prompt:
        "Depict this person in cinematic concept art style with high-detail lighting and atmosphere",
      model: "Realistic Vision v5.1",
    },
  ],
};

export const TABS = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "Explore",
    path: "/explore",
    icon: TerminalSquare,
  },
  {
    title: "Generations",
    path: "/generations",
    icon: GalleryHorizontalEnd,
  },
];
