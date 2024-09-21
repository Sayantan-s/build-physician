import { Link, createFileRoute } from '@tanstack/react-router'
import { authApi } from '@apis/hooks/auth'

export const Route = createFileRoute('/_auth/_layout/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { mutate: signOut, isPending } = authApi.useSignOut()

  const handleSignOut = async () => await signOut()

  return (
    <div>
      <button onClick={handleSignOut} disabled={isPending}>
        {isPending ? 'loading...' : 'Sign out'}
      </button>
      <Link to="/roadmaps">Roadmaps</Link>
    </div>
  )
}
