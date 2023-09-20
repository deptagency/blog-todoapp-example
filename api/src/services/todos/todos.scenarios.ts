import type { Prisma, Todo } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TodoCreateArgs>({
  todo: {
    one: { data: { body: 'String', updatedAt: '2023-09-14T18:53:24.740Z' } },
    two: { data: { body: 'String', updatedAt: '2023-09-14T18:53:24.740Z' } },
  },
})

export type StandardScenario = ScenarioData<Todo, 'todo'>
