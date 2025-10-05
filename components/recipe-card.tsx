import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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


export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Card className="overflow-hidden backdrop-blur-lg bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6">
      <CardHeader>
        <CardTitle className="text-xl text-[color:var(--text-heading)]">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recipe.description ? <p className="text-sm text-muted-foreground">{recipe.description}</p> : null}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{recipe.timeMinutes} min</Badge>
          <Badge variant="secondary">{recipe.calories} kcal</Badge>
          {recipe.tags?.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>

        <div className="text-sm">
          <div className="font-medium">Uses</div>
          <p className="text-muted-foreground">{recipe.ingredientsUsed.join(", ")}</p>
        </div>

        {recipe.missingIngredients.length > 0 ? (
          <div className="text-sm">
            <div className="font-medium">Might need</div>
            <p className="text-muted-foreground">{recipe.missingIngredients.join(", ")}</p>
          </div>
        ) : null}

        <div className="text-sm">
          <div className="font-medium">Steps</div>
          <ol className="list-decimal ms-4 text-muted-foreground space-y-1">
            {recipe.steps.slice(0, 4).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
