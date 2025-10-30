import lingoCompiler from "lingo.dev/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any Next.js config options here
};

export default lingoCompiler.next({
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de"],
  // models: "lingo.dev", // Option 1: Lingo.dev Engine
  models: {
    // "*:*": "groq:qwen/qwen3-32b", // Option 2: GROQ
    "*:*": "google:gemini-2.0-flash", // Option 2: Google AI
    // "*:*": "openrouter:mistralai/mistral-small-24b-instruct-2501", // Option 2: OpenRouter
    // "*:*": "ollama:mistral-small3.1", // Option 2: Ollama
    // "*:*": "mistral:mistral-small-latest", // Mistral
  },
})(nextConfig);
