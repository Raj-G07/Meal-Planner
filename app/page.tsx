import MealPlanner from "@/components/meal-planner"

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold text-pretty">Meal Planner</h1>
        <p className="text-muted-foreground">
          Enter ingredients you have on hand. The copilot will suggest recipes
        </p>
      </header>
      <MealPlanner />
    </main>
  )
}
