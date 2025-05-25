import gsap from "gsap";
import "./App.css"


const HeroToggle = () => {
    gsap.to(".a", {
        x: 400,
        duration: 1,
        ease: "power1.inOut",
    })
    return (
    
        <div className="a">BOX</div>
    )
}
export default HeroToggle;
