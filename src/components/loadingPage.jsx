import  { useRef, useEffect,useState } from 'react';

function IntersectionObserverComponent() {
  const targetRef = useRef();
    const [timeObserved,setTimeobserved]=useState(0)
  useEffect(() => {
    // Create an Intersection Observer with a callback function
    const observer = new IntersectionObserver((entries) => {
        console.log(entries)
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the observed element enters the viewport
        //   console.log('Element is in the viewport');
        // console.log(entry)
          // Stop observing the element to avoid multiple triggers
          observer.unobserve(entry.target);
          setTimeobserved((previous)=>previous+1)
        }
      });
    });

    // Start observing the target element when it's available
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, [timeObserved]); // Empty dependency array ensures this effect runs only once

  return <div ref={targetRef} style={{ height: '100px' }}>
    <h1>i am samir </h1>
  </div>;
}

export default IntersectionObserverComponent;
