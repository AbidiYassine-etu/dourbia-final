'use client'
import Carousel from "./components/Carousel";
import About from "./components/About";
import Features from "./components/Feature";
import Packages from "./components/Packages";
import DemoSection from "./components/Demo";
import VideoDemoSection from "./components/VideoSection";

export default function Home() {
  return (
    <main>
    <Carousel />
    <About/>
    <Features/>
    <DemoSection/>
    <Packages/>
    <VideoDemoSection/>
  </main>
  );
}
