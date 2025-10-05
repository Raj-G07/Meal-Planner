import MealPlanner from "@/components/meal-planner"

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl p-6 md:p-10 space-y-6">
      <header className="space-y-2">
        <div className="flex items-center gap-4">
        <img src="/MealPlanner2.0.png" alt="Meal Planner Logo" className="h-16 w-16 rounded-2xl"/>
        <h1 className="text-3xl md:text-4xl font-semibold text-pretty text-[color:var(--text-heading)]">Meal Planner</h1>
        </div>
        <p className="text-[color:var(--text-muted)]">
          Enter ingredients you have on hand. The copilot will suggest recipes
        </p>
      </header>
      <MealPlanner />
    </main>
  )
}
