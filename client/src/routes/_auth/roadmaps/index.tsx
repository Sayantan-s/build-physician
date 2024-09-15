import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/roadmaps/')({
  component: () => <div>Hello /_auth/roadmaps/!</div>,
})
