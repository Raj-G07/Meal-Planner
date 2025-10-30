# 🥗 AI Meal Planner

An intelligent **Meal Planner and Recipe Generator** built with **Next.js**, **CopilotKit UI**, and **Copilot Cloud Runtime** and **Lingo.dev multilingual support**.  
It allows users to **add ingredients manually or via AI instructions**, and then generates **3–5 smart recipes** instantly. Each with detailed steps, time, calories, and tags.
All localized across multiple languages

## 🚀 Features

- 🧠 **CopilotKit Integration** – Add ingredients or instructions using natural language.
- 📝 **Manual Ingredient Entry** – Add items by typing or selecting from your pantry.
- 🍽️ **AI Recipe Generation** – Suggests 3–5 recipes based on available ingredients.
- 🧾 **Structured JSON Recipes** – Each recipe follows a consistent, machine-readable schema.
- 🌐 **Multilingual Support (Lingo.dev)** – Switch seamlessly between **English, Spanish, German, and French**.  
- 🪄 **Beautiful Locale Switcher** – Custom glassmorphism-inspired dropdown (`CustomLocaleSwitcher`).  
- ⚡ **Instant Recipe Cards** – Automatically displayed as visually appealing recipe cards.
- 🌐 Built with **Next.js + React + Tailwind CSS**, powered by **Copilot Cloud LLM Runtime**.

## Screenshots
<img width="1348" height="598" alt="Screenshot 2025-10-05 202245" src="https://github.com/user-attachments/assets/56739ccf-3d23-42ad-a8a9-146e49df78bd" />

## 🧩 Recipe JSON Schema

Each AI-generated recipe follows this exact schema for consistency:

```json
{
  "title": "string (short name)",
  "description": "string (1–2 lines, optional)",
  "ingredientsUsed": ["subset of provided ingredients"],
  "missingIngredients": ["minimal, common pantry items if needed"],
  "steps": ["5–8 concise cooking steps"],
  "timeMinutes": 0,
  "tags": ["quick", "healthy", "gluten-free"],
  "calories": 0
}
```

## 🏗️ Tech Stack

| Layer | Tools |
|-------|-------|
| Frontend | React, Next.js 13+, Tailwind CSS |
| AI Runtime | [Copilot Cloud Runtime](https://copilotkit.ai) |
| UI Components | `@copilotkit/react-ui` |
| LLM Model | OpenAI `gpt-4o-mini` (configurable) |


## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/meal-planner-copilotkit.git
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Create `.env`

```env
COPILOT_CLOUD_PUBLIC_API_KEY=your_copilot_cloud_api_key
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key
```

