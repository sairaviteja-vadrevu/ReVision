import { Home, GalleryHorizontalEnd, TerminalSquare } from "lucide-react";

export const TEMPLATES = {
  Movies: [
    {
      name: "Cyberpunk Hero",
      prompt:
        "Transform this person into a cyberpunk protagonist in a neon-lit city, with glowing tattoos and a futuristic urban backdrop. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity with no deviation \u2014 preserve the original expression, emotion, gaze direction, skin tone, lip shape, eye structure, hairline, and natural imperfections. Do not stylize the face. Only apply the visual style to clothing, background, and lighting. Face must be a 1:1 photoreal match to the uploaded image. Final image should reflect the original person\u2019s emotion and energy while blending seamlessly into the context. Use cinematic lighting and ultra-sharp rendering.",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Dune Warrior",
      prompt:
        "Make this person a desert warrior in a sci-fi setting inspired by Dune, with a stillsuit, sand dunes, and storm clouds. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity with no deviation \u2014 preserve the original expression, emotion, gaze direction, skin tone, lip shape, eye structure, hairline, and natural imperfections. Do not stylize the face. Only apply the visual style to clothing, background, and lighting. Face must be a 1:1 photoreal match to the uploaded image. Final image should reflect the original person\u2019s emotion and energy while blending seamlessly into the context. Use cinematic lighting and ultra-sharp rendering.",
      model: "PhotoMaker",
    },
    {
      name: "Time Traveler 2099",
      prompt:
        "Depict this person as a sleek, high-tech time traveler from the year 2099 with glowing circuits and space-time effects. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity with no deviation \u2014 preserve the original expression, emotion, gaze direction, skin tone, lip shape, eye structure, hairline, and natural imperfections. Do not stylize the face. Only apply the visual style to clothing, background, and lighting. Face must be a 1:1 photoreal match to the uploaded image. Final image should reflect the original person\u2019s emotion and energy while blending seamlessly into the context. Use cinematic lighting and ultra-sharp rendering.",
      model: "DreamShaper v8",
    },
    {
      name: "Action Movie Star",
      prompt:
        "Make this person look like a 90s action movie star with leather jacket, explosions in the background, and gritty urban lighting. Preserve exact facial features from the uploaded image \u2014 expression, gaze, skin texture, and emotion must be identical. Stylize only the background and clothing for cinematic intensity.",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Sci-Fi Assassin",
      prompt:
        "Render this person as a futuristic assassin in a cybernetic suit, surrounded by holograms and neon blades. Facial identity must remain 100% intact \u2014 expression, skin tone, and face structure must match the uploaded image exactly. Do not modify the face. Apply style to costume and environment only.",
      model: "DreamShaper v8",
    },
    {
      name: "Interstellar Explorer",
      prompt:
        "Depict this person in a space suit on an alien planet, inspired by Interstellar. Background should include foreign terrain, stars, and nebulae. Preserve uploaded face perfectly \u2014 including emotional tone, expression, and realistic detailing. No facial changes.",
      model: "PhotoMaker",
    },
  ],
  Fantasy: [
    {
      name: "Elven Archer",
      prompt:
        "Transform this person into a high-fantasy elven archer with pointed ears, green robes, and a glowing bow in an enchanted forest. Use the uploaded image as a strict facial reference. Reconstruct the exact facial identity \u2014 preserve original expression, skin tone, eye shape, and emotional feel. Apply style only to the outfit, ears, and background. Face should be hyper-real and identical to the original.",
      model: "DreamShaper v8",
    },
    {
      name: "Dark Sorcerer",
      prompt:
        "Depict this person as a dark sorcerer summoning ancient powers in a gothic magical chamber. Maintain the original facial identity, expression, and structure without stylization. Enhance only the costume and atmosphere with magical elements and dramatic lighting.",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Dragon Rider",
      prompt:
        "Render this person riding a dragon mid-air with fire and wind effects. Preserve facial identity 100% \u2014 no alterations to face shape, eyes, or expression. Stylize only the armor, dragon, and sky background. Final image must maintain photoreal likeness.",
      model: "PhotoMaker",
    },
    {
      name: "Witch Queen",
      prompt:
        "Transform this person into a majestic witch queen surrounded by arcane symbols and moonlight. Preserve facial realism and emotion from the uploaded image. Apply magical effects only to background and accessories.",
      model: "DreamShaper v8",
    },
    {
      name: "Forest Guardian",
      prompt:
        "Make this person a mystical guardian of the forest, with natural armor, vines, and glowing wildlife. Maintain a 1:1 photorealistic match to the uploaded face \u2014 expression, skin texture, and features must remain untouched.",
      model: "Realistic Vision v5.1",
    },
  ],
  Anime: [
    {
      name: "Shonen Protagonist",
      prompt:
        "Render this person as a shonen anime hero with a glowing aura and explosive background. Keep facial identity perfectly intact in anime form \u2014 eye shape, expression, and hairstyle must reflect original image. Do not exaggerate or distort face.",
      model: "DreamShaper v8",
    },
    {
      name: "Romantic Schoolgirl/Boy",
      prompt:
        "Depict this person in a soft, slice-of-life anime setting with cherry blossoms. Maintain facial identity and emotion exactly from the original photo, only stylizing clothes and background.",
      model: "PhotoMaker",
    },
    {
      name: "Samurai Soul",
      prompt:
        "Make this person a ronin-style samurai with traditional garb and moonlit scenery. Keep face realistic and identical to uploaded image. Stylize only outfit and background.",
      model: "DreamShaper v8",
    },
    {
      name: "Magical Girl/Boy",
      prompt:
        "Transform this person into a magical anime character with sparkles and pastel effects. Preserve original facial expression and likeness in full. Eyes, smile, and structure must match uploaded image exactly.",
      model: "PhotoMaker",
    },
    {
      name: "Mecha Pilot",
      prompt:
        "Render this person inside a high-tech mecha cockpit in a futuristic anime style. Use uploaded face as 1:1 reference \u2014 maintain identity completely while applying stylization only to suit and cockpit.",
      model: "Realistic Vision v5.1",
    },
  ],
  Cartoon: [
    {
      name: "Pixar Style",
      prompt:
        "Convert this person into a Pixar-style 3D character. Facial identity must remain exactly the same \u2014 expression, structure, and emotion preserved. Apply Pixar lighting and color grading without changing face.",
      model: "PhotoMaker",
    },
    {
      name: "Comic Superhero",
      prompt:
        "Turn this person into a comic book superhero with cel shading and action lines. Face must remain identical to uploaded image in expression and emotion. Stylize suit and setting only.",
      model: "DreamShaper v8",
    },
    {
      name: "Disney Royalty",
      prompt:
        "Render this person as a Disney-style prince/princess with magical castle background. Preserve the real face 100% and only stylize background, clothes, and light effects.",
      model: "PhotoMaker",
    },
    {
      name: "South Park Style",
      prompt:
        "Convert this person into a South Park-style character while keeping eye shape, hairstyle, and expression consistent with the original image.",
      model: "AnyLoRA",
    },
    {
      name: "Cartoon Detective",
      prompt:
        "Make this person a noir cartoon detective with trench coat and city background. Face must retain its original shape, emotion, and realism, stylized only in cartoon colors.",
      model: "DreamShaper v8",
    },
  ],
  Stylized: [
    {
      name: "Monochrome Noir",
      prompt:
        "Create a black and white noir-style portrait of this person with deep shadows and detective ambiance. Preserve face and expression fully. Style applies only to lighting and contrast.",
      model: "Realistic Vision v5.1",
    },
    {
      name: "Studio Ghibli",
      prompt:
        "Render this person in a dreamy Ghibli-style world while keeping their face exactly the same in structure, tone, and expression. Stylize only the background and outfit.",
      model: "PhotoMaker",
    },
    {
      name: "Vaporwave",
      prompt:
        "Place this person in a retro vaporwave aesthetic with grids, neon lights, and statues. Keep facial identity 1:1 with the uploaded image. Stylize only colors and vibe.",
      model: "AnyLoRA",
    },
    {
      name: "Baroque Painting",
      prompt:
        "Turn this person into a royal 1600s-style oil painting while maintaining all facial features and realism. Do not stylize the face, only the background and clothing.",
      model: "DreamShaper v8",
    },
    {
      name: "Digital Concept Art",
      prompt:
        "Render this person in cinematic concept art style with dramatic lighting. Preserve identity strictly \u2014 apply stylization only to color grading and environment.",
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
