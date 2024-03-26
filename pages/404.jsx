import FadeInOut from '@/components/Animation/FadeInOut'

export default function Custom404() {
  return (
    <FadeInOut delay={0.25}>
      <div className="h-screen absolute inset-0 w-full overflow-hidden flex flex-col justify-center items-center">
        <h1 className="font-mono text-primary">404: Page Not Found</h1>
      </div>
    </FadeInOut>
  )
}
