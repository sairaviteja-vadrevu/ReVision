import { Home, GalleryHorizontalEnd, TerminalSquare } from "lucide-react";
import CyberpunkLogo from "assets/Cyberpunk.jpg";
import DuneLogo from "assets/Dune.jpg";
import TimeTravelerLogo from "assets/Time_Traveler.jpg";
import ActionMovieLogo from "assets/ActionHero.jpg";
import InterstellarLogo from "assets/Interstellar.jpg";
import ElvenLogo from "assets/Elven_Archer.jpg";
import DarkSorcererLogo from "assets/Dark_Sorcerer.jpg";
import DragonRiderLogo from "assets/Dragon_Rider.jpg";
import WitchQueenLogo from "assets/Witch_Queen.jpg";
import ForestGuardianLogo from "assets/Forest_Guardian.jpg";
import ShonenLogo from "assets/Shonen.jpg";
import BlossomLogo from "assets/Blossom.jpg";
import SamuraiLogo from "assets/Samurai.jpg";
import MysticLogo from "assets/MysticAura.jpg";
import PixarLogo from "assets/Pixar.jpg";
import SuperheroLogo from "assets/SuperHero.jpg";
import DisneyLogo from "assets/Disney.jpg";
import DetectiveLogo from "assets/Detective.jpg";
import NoirLogo from "assets/Monochrome_Noir.jpg";
import GhibliLogo from "assets/Ghibli.jpg";
import VaporwaveLogo from "assets/Vaporwave.jpg";
import DigitalLogo from "assets/Digital_Concept_Art.jpg";

export const TEMPLATES = {
  Movies: [
    {
      name: "Cyberpunk Hero",
      prompt:
        "Transform this person into a cyberpunk protagonist in a neon-lit city, with glowing tattoos and a futuristic urban backdrop. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity with no deviation \u2014 preserve the original expression, emotion, gaze direction, skin tone, lip shape, eye structure, hairline, and natural imperfections. Do not stylize the face. Only apply the visual style to clothing, background, and lighting. Face must be a 1:1 photoreal match to the uploaded image. Final image should reflect the original person\u2019s emotion and energy while blending seamlessly into the context. Use cinematic lighting and ultra-sharp rendering.",
      logo: CyberpunkLogo,
    },
    {
      name: "Dune Warrior",
      prompt:
        "Make this person a desert warrior in a sci-fi setting inspired by Dune, with a stillsuit, sand dunes, and storm clouds. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity with no deviation \u2014 preserve the original expression, emotion, gaze direction, skin tone, lip shape, eye structure, hairline, and natural imperfections. Do not stylize the face. Only apply the visual style to clothing, background, and lighting. Face must be a 1:1 photoreal match to the uploaded image. Final image should reflect the original person\u2019s emotion and energy while blending seamlessly into the context. Use cinematic lighting and ultra-sharp rendering.",
      logo: DuneLogo,
    },
    {
      name: "Time Traveler 2099",
      prompt:
        "Depict this person as a sleek, high-tech time traveler from the year 2099 with glowing circuits and space-time effects. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity with no deviation \u2014 preserve the original expression, emotion, gaze direction, skin tone, lip shape, eye structure, hairline, and natural imperfections. Do not stylize the face. Only apply the visual style to clothing, background, and lighting. Face must be a 1:1 photoreal match to the uploaded image. Final image should reflect the original person\u2019s emotion and energy while blending seamlessly into the context. Use cinematic lighting and ultra-sharp rendering.",
      logo: TimeTravelerLogo,
    },
    {
      name: "Action Movie Star",
      prompt:
        "Make this person look like a 90s action movie star with leather jacket, explosions in the background, and gritty urban lighting. Preserve exact facial features from the uploaded image \u2014 expression, gaze, skin texture, and emotion must be identical. Stylize only the background and clothing for cinematic intensity.",
      logo: ActionMovieLogo,
    },
    {
      name: "Interstellar Explorer",
      prompt:
        "Depict this person in a space suit on an alien planet, inspired by Interstellar. Background should include foreign terrain, stars, and nebulae. Preserve uploaded face perfectly \u2014 including emotional tone, expression, and realistic detailing. No facial changes.",
      logo: InterstellarLogo,
    },
  ],
  Fantasy: [
    {
      name: "Elven Archer",
      prompt:
        "Transform this person into a high-fantasy elven archer with pointed ears, green robes, and a glowing bow in an enchanted forest. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity \u2014 preserve original expression, skin tone, eye shape, and emotional feel. Apply style only to the outfit, ears, and background. Face should be hyper-real and identical to the original.",
      logo: ElvenLogo,
    },
    {
      name: "Dark Sorcerer",
      prompt:
        "Depict this person as a dark sorcerer summoning ancient powers in a gothic magical chamber. Maintain the original facial identity, expression, and structure without stylization. Enhance only the costume and atmosphere with magical elements and dramatic lighting.",
      logo: DarkSorcererLogo,
    },
    {
      name: "Dragon Rider",
      prompt:
        "Render this person riding a dragon mid-air with fire and wind effects. Preserve facial identity 100% \u2014 no alterations to face shape, eyes, or expression. Stylize only the armor, dragon, and sky background. Final image must maintain photoreal likeness.",
      logo: DragonRiderLogo,
    },
    {
      name: "Witch Queen",
      prompt:
        "Transform this person into a majestic witch queen surrounded by arcane symbols and moonlight. Preserve facial realism and emotion from the uploaded image. Apply magical effects only to background and accessories.",
      logo: WitchQueenLogo,
    },
    {
      name: "Forest Guardian",
      prompt:
        "Make this person a mystical guardian of the forest, with natural armor, vines, and glowing wildlife. Maintain a 1:1 photorealistic match to the uploaded face \u2014 expression, skin texture, and features must remain untouched.",
      logo: ForestGuardianLogo,
    },
  ],
  Anime: [
    {
      name: "Shonen Protagonist",
      prompt:
        "Render this person as a shonen anime hero with a glowing aura and explosive background. Keep facial identity perfectly intact in anime form \u2014 eye shape, expression, and hairstyle must reflect original image. Do not exaggerate or distort face.",
      logo: ShonenLogo,
    },
    {
      name: "Blossom High",
      prompt:
        "Depict this person in a soft, slice-of-life anime setting with cherry blossoms. Maintain facial identity and emotion exactly from the original photo, only stylizing clothes and background.",
      logo: BlossomLogo,
    },
    {
      name: "Samurai Soul",
      prompt:
        "Make this person a ronin-style samurai anime with traditional garb and moonlit scenery. Keep face realistic and identical to uploaded image. Stylize only outfit and background.",
      logo: SamuraiLogo,
    },
    {
      name: "Mystic Aura",
      prompt:
        "Transform this person into a magical anime character with sparkles and pastel effects. Preserve original facial expression and likeness in full. Eyes, smile, and structure must match uploaded image exactly.",
      logo: MysticLogo,
    },
  ],
  Cartoon: [
    {
      name: "Pixar Style",
      prompt:
        "Convert this person into a Pixar-style 3D character. Facial identity must remain exactly the same \u2014 expression, structure, and emotion preserved. Apply Pixar lighting and color grading without changing face.",
      logo: PixarLogo,
    },
    {
      name: "Comic Superhero",
      prompt:
        "Turn this person into a comic book superhero with cel shading and action lines. Face must remain identical to uploaded image in expression and emotion. Stylize suit and setting only.",
      logo: SuperheroLogo,
    },
    {
      name: "Disney Royalty",
      prompt:
        "Render this person as a Disney-style prince/princess with magical castle background. Preserve the real face 100% and only stylize background, clothes, and light effects.",
      logo: DisneyLogo,
    },
    {
      name: "Cartoon Detective",
      prompt:
        "Make this person a noir cartoon detective with trench coat and city background. Face must retain its original shape, emotion, and realism, stylized only in cartoon colors.",
      logo: DetectiveLogo,
    },
  ],
  Stylized: [
    {
      name: "Monochrome Noir",
      prompt:
        "Create a black and white noir-style portrait of this person with deep shadows and detective ambiance. Preserve face and expression fully. Style applies only to lighting and contrast.",
      logo: NoirLogo,
    },
    {
      name: "Studio Ghibli",
      prompt:
        "Render this person in a dreamy Ghibli-style world while keeping their face exactly the same in structure, tone, and expression. Stylize only the background and outfit.",
      logo: GhibliLogo,
    },
    {
      name: "Vaporwave",
      prompt:
        "Place this person in a retro vaporwave aesthetic with grids, neon lights, and statues. Keep facial identity 1:1 with the uploaded image. Stylize only colors and vibe.",
      logo: VaporwaveLogo,
    },
    {
      name: "Digital Concept Art",
      prompt:
        "Render this person in cinematic concept art style with dramatic lighting. Preserve identity strictly \u2014 apply stylization only to color grading and environment.",
      logo: DigitalLogo,
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
