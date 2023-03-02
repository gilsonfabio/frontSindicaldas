import Footer from "../components/Footer";
import Menubar from "../components/Menubar";
import Slideshow from "../components/SliderShow";

export default function Home() {
  return (
    <div className="flex flex-col bg-black w-full h-full" >
       <Menubar />
       <Slideshow />
       
        <Footer />
    </div>
  )
}   
