import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-base-200 via-base-100 to-base-200">
      <SignUp />
    </div>
  )
}