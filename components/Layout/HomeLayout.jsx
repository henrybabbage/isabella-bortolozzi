import TransitionLayout from '../Animation/TransitionLayout'
import ReferenceGrid from '../Utilities/ReferenceGrid'
import SmoothScroll from '../Utilities/SmoothScroll'

export default function HomeLayout({ children }) {
  return (
    <TransitionLayout>
      <SmoothScroll>
        <div id="home">
          <ReferenceGrid />
          {children}
        </div>
      </SmoothScroll>
    </TransitionLayout>
  )
}
