"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core"

export default function IngredientsInput({
  ingredients,
  onChange,
  onSubmit,
  isLoading,
}: {
  ingredients: string[]
  onChange: (v: string[]) => void
  onSubmit?: () => void
  isLoading?: boolean
}) {
  const [value, setValue] = useState("")
  useCopilotReadable({
    description: "The state of our ingredients",
    value: value
  })

  useCopilotAction({
    name: "addIngredient",
    description: "Adds a ingredient to the Ingredients list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of ingredients to add",
        required: true,
      }
    ],
    handler:({title})=>{
      add(title);
      return "Ingredient add successfully"
    }
  })

  useCopilotAction({
    name: "removeIngredient",
    description: "Remove a ingredient to the Ingredients list",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of ingredients to remove",
        required: true,
      }
    ],
    handler:({title})=>{
      remove(title);
      return "Ingredient remove successfully"
    }
  })
  function add(v: string) {
    const clean = v.trim().toLowerCase()
    if (!clean) return
    if (ingredients.includes(clean)) return
    onChange([...ingredients, clean])
    setValue("")
  }

  function remove(v: string) {
    onChange(ingredients.filter((i) => i !== v))
  }

  return (
    <div className="space-y-3">
      <label className="sr-only" htmlFor="ingredient">
        Add ingredient
      </label>
      <div className="flex gap-2">
        <Input
          id="ingredient"
          placeholder="e.g., chicken, tomato, rice"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              add(value)
            }
          }}
          disabled={isLoading}
        />
        <Button type="button" variant="secondary" onClick={() => add(value)} disabled={isLoading || !value.trim()}>
          Add
        </Button>
      </div>

      {ingredients.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {ingredients.map((i) => (
            <Badge key={i} variant="outline" className="gap-1">
              <span>{i}</span>
              <button
                type="button"
                aria-label={`Remove ${i}`}
                className="ms-1 inline-flex"
                onClick={() => remove(i)}
                disabled={isLoading}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      ) : null}

      {onSubmit ? (
        <div className="text-right">
          <Button type="button" onClick={onSubmit} disabled={ingredients.length === 0 || isLoading}>
            {isLoading ? "Generating..." : "Suggest recipes"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
