
import { useEffect } from "react";

function useIntersectionObserver({ target, onIntersect, enabled = true }) {
    useEffect(() => {
        if (!enabled) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersect();
            }
        });
        console.log(observer)
        observer.observe(target.current);
        return () => observer.disconnect();
    }, [target, onIntersect, enabled]);
}

export default useIntersectionObserver;
