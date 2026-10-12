import {
  siPython, siFastapi, siReact, siTypescript, siJavascript, siPostgresql, siRedis, siDocker,
  siMongodb, siNeo4j, siQdrant, siAngular, siFlask, siCelery, siGit, siGooglegemini,
  siHuggingface, siTailwindcss, siVite, siGsap, siScikitlearn,
} from 'simple-icons';

// `hex` is the brand color; dark brand colors get a lighter fallback so they read on black.
const t = (icon, name, hex) => ({ name: name || icon.title, path: icon.path, hex: hex || `#${icon.hex}` });

export const STACK = [
  [t(siHuggingface, 'BERT / Sentence-BERT'), t(siQdrant, 'Qdrant'), t(siNeo4j, 'Neo4j'), t(siGooglegemini, 'Gemini API'), t(siScikitlearn, 'scikit-learn'), t(siPostgresql, 'pgvector')],
  [t(siPython), t(siFastapi, 'FastAPI'), t(siFlask, 'Flask', '#e9ede6'), t(siCelery, 'Celery'), t(siRedis, 'Redis')],
  [t(siReact), t(siTypescript, 'TypeScript'), t(siJavascript, 'JavaScript'), t(siAngular, 'Angular', '#dd0031'), t(siTailwindcss, 'Tailwind'), t(siGsap, 'GSAP')],
  [t(siPostgresql, 'PostgreSQL'), t(siMongodb, 'MongoDB'), t(siDocker), t(siGit), t(siVite)],
];

// Order for the scrolling skill band.
export const MARQUEE = [
  t(siPython), t(siFastapi, 'FastAPI'), t(siHuggingface, 'BERT'), t(siQdrant, 'Qdrant'), t(siNeo4j, 'Neo4j'),
  t(siGooglegemini, 'Gemini'), t(siReact), t(siTypescript, 'TypeScript'), t(siPostgresql, 'PostgreSQL'),
  t(siRedis, 'Redis'), t(siCelery, 'Celery'), t(siDocker), t(siMongodb, 'MongoDB'), t(siAngular, 'Angular', '#dd0031'),
];
