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
import { Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Sorting", link: "/sorting" },
    { name: "About", link: "/about" }
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

      {/* About Content */}
      <div id="about" className="relative z-10 flex flex-col items-center justify-center h-full px-6 gap-8 pt-32 text-center">
        <h1 className="text-6xl font-bold">About Me</h1>

        <p className="text-xl max-w-3xl text-muted-foreground leading-relaxed">
          Hi, I’m <span className="font-semibold text-black">Archishman Adhikari</span>, a passionate Computer Science
          student and aspiring full-stack developer. I enjoy building applications that solve real-world
          problems while blending clean design with powerful functionality.
        </p>

        <div className="max-w-2xl space-y-4 text-lg text-gray-700">
          <p>
            <strong>Experience:</strong> Built projects like <em>Brilia</em> (AI-Powered Micro SaaS),
            <em>SplitEase</em> (Bill Splitter platform), <em>AlgoFlow</em> (Algorithm Visualizer), and more.
          </p>
          <p>
            Skilled in <strong>Java, JavaScript, Node.js, Express, MongoDB, React, Tailwind CSS</strong>,
            and exploring system-level concepts like CS fundamentals, algorithms and many more.
          </p>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <NavbarButton href="mailto:archishmanadhikari@gmail.com" className="flex items-center gap-2">
            <Mail className="w-5 h-5" /> archishmanadhikari09@gmail.com
          </NavbarButton>
          <NavbarButton href="https://github.com/cinearchie" className="flex items-center gap-2">
            <Github className="w-5 h-5" /> GitHub
          </NavbarButton>
          <NavbarButton href="https://linkedin.com/in/archishmanadhikari" className="flex items-center gap-2">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </NavbarButton>
        </div>
      </div>
    </div>
  )
}
