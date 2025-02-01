import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meeting/$meetingId')({
  component: Meeting,
})

function Meeting() {
  return <div>Meeting</div>
}
