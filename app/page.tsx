import { CustomLocaleSwitcher } from "@/components/CustomeLocaleSwitcher";
import MealPlanner from "@/components/meal-planner";
export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 md:px-10 py-10 space-y-10">
      <header className="space-y-2">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-6">
          {/* Logo and Title Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur-lg opacity-30" />
                <img
                  src="/MealPlanner2.0.png"
                  alt="Meal Planner Logo"
                  className="relative h-14 w-14 rounded-2xl shadow-lg ring-2 ring-background"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-pretty text-foreground">
                  Meal Planner
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  AI-Powered Recipe Discovery
                </p>
              </div>
            </div>
            <CustomLocaleSwitcher/>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
               Enter ingredients you have on hand. The copilot will suggest recipes
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-10">
        <MealPlanner />
      </div>
    </main>
  );
}
