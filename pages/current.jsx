import FadeInOut from '@/components/Animation/FadeInOut'

export default function CurrentExhibition() {
  return (
    <FadeInOut delay={0.25}>
      <div className="min-h-screen w-screen max-w-screen flex flex-col justify-center items-center">
        <h1 className="text-primary uppercase">Current</h1>
      </div>
    </FadeInOut>
  )
}
