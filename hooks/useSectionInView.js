import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useSectionInView(sectionName, threshold = 0.75) {
    const { ref, inView } = useInView({
        threshold,
    })
    const setInViewSection = useActiveSectionStore((state) => state.setInViewSection)

    useEffect(() => {
        if (inView) {
            setInViewSection(sectionName)
        }
    }, [inView, setInViewSection, sectionName])

    return {
        ref,
    }
}
