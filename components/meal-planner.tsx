"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import IngredientsInput from "./ingredients-input";
import RecipeCard from "./recipe-card";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { generateRecipes } from "@/app/actions/generate-recipes";

type Recipe = {
  title: string
  description?: string
  ingredientsUsed: string[]
  missingIngredients: string[]
  steps: string[]
  timeMinutes: number
  tags: string[]
  calories: number
}

const system =
  "You are a helpful meal planner. Propose approachable recipes that mostly use the provided ingredients. " +
  "Minimize missing ingredients and suggest simple substitutes when needed. " +
  "Return concise steps and realistic times. Keep it home-cook friendly.";

export default function MealPlanner() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasRecipes = (recipes?.length ?? 0) > 0;
  const onSubmitHandler = async ({ ingredients: userIngredients }) => {
     setIngredients(userIngredients);
     setError(null);
     setLoading(true);
     try{
       const generated = await generateRecipes(userIngredients)
        setRecipes(generated as Recipe[])
        return { success: true, message: "Recipes generated via direct LLM" }
     } catch(err: any){
      setRecipes([]);
      setError(typeof err?.message === "string" ? err.message : "Failed to fetch recipes");
     } finally{
      setLoading(false);
     } 
    }
  useCopilotReadable({
    description: "The list of ingredients currently available.",
    value: ingredients.join(", "),
  });
  useCopilotReadable({
    description: "The list of recipes generated based on the current ingredients.",
    value: hasRecipes ? recipes!.map((r) => r.title).join(", ") : "No recipes generated yet"
  })
  useCopilotAction({
    name: "suggestRecipes",
    description: "Suggest recipes based on the user's current ingredients. Call this action when the user asks for recipe ideas or wants to see what they can cook.",
    parameters: [
      {
        name: "ingredients",
        type: "string[]",
        description: "List of ingredients available to the user (e.g. ['chicken', 'rice', 'tomato'])",
        required: true,
      },
    ],
    handler: async ({ ingredients: userIngredients }) => {
      await onSubmitHandler({ ingredients: userIngredients });
     return {success: true, message: "Recipes generated successfully"}
    },
  });

  return (
    <div className="grid gap-6">
      {/* Left Panel: Copilot */}
      <Card className="md:col-span-1 backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-lg">CopilotKit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-[color:var(--text-accent)]">Current ingredients</div>
              <div
                className={cn(
                  "flex flex-wrap gap-2",
                  ingredients.length === 0 && "text-muted-foreground"
                )}
              >
                {ingredients.length === 0 ? (
                  <span className="text-sm">No ingredients yet</span>
                ) : (
                  ingredients.map((ing) => (
                    <Badge key={ing} variant="secondary">
                      {ing}
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <IngredientsInput
              ingredients={ingredients}
              onChange={setIngredients}
              isLoading={loading}
              onSubmit={
                async () => {
                  await onSubmitHandler({ ingredients });
                }
              }
            />

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Right Panel: Results */}
      <div className="md:col-span-2 space-y-4">
        {!hasRecipes && !loading? (
          <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6">
            <CardContent className="py-10 text-center text-muted-foreground text-[color:var(--text-muted)]">
              Add ingredients and click “Suggest recipes” to see ideas here.
            </CardContent>
          </Card>
        ) : null}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 ">
            {[0, 1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse ">
                <CardHeader>
                  <div className="h-5 w-2/3 bg-muted rounded" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-32 w-full bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {hasRecipes ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {recipes!.map((r) => (
              <RecipeCard key={r.title} recipe={r} />
            ))}
          </div>
        ) : null}
      </div>
      <CopilotPopup
        instructions={system}
        labels={{
          title: "🍽️ Assistant",
          initial: "Need  help planning your meals?",
        }}
      />
    </div>
  );
}
