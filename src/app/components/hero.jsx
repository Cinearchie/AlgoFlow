"use client"

import { DotPattern } from "@/components/magicui/dot-pattern"
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle
} from "@/components/ui/resizable-navbar"
import { useState } from "react"
import { Github , Linkedin } from 'lucide-react';
import SortingAnimation from "@/app/components/animation"
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { MoveUpRight } from 'lucide-react';
export default function Hero() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", link: "#" },
    { name: "Sorting", link: "sorting" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-black">
  {/* Navbar */}
  <Navbar>
  <NavBody>
  <NavbarLogo />
  <NavItems items={navItems} />

  {/* Right side actions */}
  <div className="flex items-center gap-4">
    <NavbarButton href="https://github.com/cinearchie" className="flex items-center gap-2">
      <Github className="w-5 h-5" />
    </NavbarButton>
    <NavbarButton href="https://linkedin.com/in/archishmanadhikari" className="flex items-center gap-2">
      <Linkedin className="w-5 h-5" />
    </NavbarButton>
  </div>
</NavBody>

    {/* Mobile Nav */}
    <MobileNav visible>
      <MobileNavHeader>
        <NavbarLogo />
        <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </MobileNavHeader>
      <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {navItems.map((item, idx) => (
          <a key={idx} href={item.link} className="text-lg">
            {item.name}
          </a>
        ))}
      </MobileNavMenu>
    </MobileNav>
  </Navbar>

  {/* Full background */}
  <DotPattern className="absolute inset-0 w-full h-full" />

  {/* Foreground content */}
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-6 gap-8 pt-32">
    {/* 👆 added `pt-32` (padding-top) so Hero moves below navbar */}
    <div className="md:w-3/4 space-y-4 text-center md:text-left">
      <h1 className="text-7xl font-bold">Algorithm Visualizer</h1>
      <p className="text-3xl text-muted-foreground">
      Master algorithms effortlessly with interactive step-by-step visualizations,<br/>
      turning complex concepts into clear, engaging learning experiences
      </p>
      <PulsatingButton className="flex items-center gap-2" href="/sorting">
  Check It Out <MoveUpRight className="inline-block w-5 h-5" />
</PulsatingButton>
    </div>

    <div className="md:w-1/4 relative z-10">
      {/* you can add illustration / animation here */}
      <div className="mb-6">
    <SortingAnimation />
  </div>
    </div>
  </div>
</div>

  )
}
