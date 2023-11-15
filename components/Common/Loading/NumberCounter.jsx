import { animated, useSpring } from 'react-spring'

export default function NumberCounter({ n }) {
	const { number } = useSpring({
		from: { number: 1 },
		number: n,
		delay: 200,
		config: { mass: 1, tension: 20, friction: 10 },
	})
	return <animated.span className="text-primary z-10 whitespace-pre w-fit px-1">{number.to((n) => n.toFixed(0))}</animated.span>
}
