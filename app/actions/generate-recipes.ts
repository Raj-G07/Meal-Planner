"use server"

import { z } from "zod"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"

const RecipeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  ingredientsUsed: z.array(z.string()).default([]),
  missingIngredients: z.array(z.string()).default([]),
  steps: z.array(z.string()).default([]),
  timeMinutes: z.number().int().positive().default(20),
  tags: z.array(z.string()).default([]),
  calories: z.number().int().positive().default(400),
})

const RecipesResponseSchema = z.object({
  recipes: z.array(RecipeSchema).min(1).max(6),
})

export type GeneratedRecipe = z.infer<typeof RecipeSchema>

export async function generateRecipes(ingredients: string[]): Promise<GeneratedRecipe[]> {
  const normalized = ingredients.map((s) => s.trim()).filter(Boolean)

  const prompt = `
You are a helpful meal planner. Based on the given ingredients, suggest 3–5 approachable recipes.
Return recipes that match this exact JSON schema via the tool:
- title (short)
- description (1-2 lines, optional)
- ingredientsUsed (subset of provided ingredients)
- missingIngredients (minimal, common pantry items when needed)
- steps (5-8 concise steps)
- timeMinutes (rough total time)
- tags (like "quick", "healthy", "gluten-free")
- calories (rough estimate)

Guidelines:
- Prefer recipes that primarily use the provided ingredients.
- Keep substitutions minimal and reasonable.
- Use simple, beginner-friendly language.

Provided ingredients: ${normalized.join(", ")}
`

  const { object } = await generateObject({
    model:  openai("gpt-4o-mini"),
    schema: RecipesResponseSchema,
    prompt,
  })

  return object.recipes
}
