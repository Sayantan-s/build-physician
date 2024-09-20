import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/roadmaps/$roadmap')({
  component: () => <div>Hello /_auth/roadmaps/$roadmap!</div>,
})
