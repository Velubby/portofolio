"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Menu,
  X,
  CheckCircle2,
  Cpu,
  MapPin,
  Send,
  Terminal,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Smartphone,
  Database,
  ShieldCheck
} from "lucide-react";

// Project Data type
interface Project {
  id: number;
  title: string;
  category: "Web App" | "Mobile App" | "Python Tool";
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  imagePath?: string;
  uiMockup?: React.ReactNode;
}

// Course Category type
interface CourseCategory {
  title: string;
  icon: React.ReactNode;
  courses: string[];
}

// Animated Section Wrapper using Intersection Observer
interface AnimatedSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

function AnimatedSection({ id, className = "", children }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 } // trigger when 8% is visible for smooth trigger on mobile
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={domRef}
      className={`transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${className}`}
    >
      {children}
    </div>
  );
}

const WORDS = ["Mobile Developer", "Flutter Developer", "Frontend Developer", "Informatics Engineering Student"];

// Typing Animation Component for Hero Subtitle
function TypingText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullWord = WORDS[currentWordIndex];

    const tick = () => {
      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText((prev) => currentFullWord.substring(0, prev.length + 1));
      }

      let speed = isDeleting ? 30 : 80;

      if (!isDeleting && currentText === currentFullWord) {
        speed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
        speed = 500;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-text-secondary border-r-2 border-accent-purple pr-1 animate-pulse font-bold">
      {currentText}
    </span>
  );
}

// Custom Cursor Trail Component
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0);

    if (isMobile) return;

    const showTimeout = setTimeout(() => setIsHidden(false), 0);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearTimeout(showTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("[role='button']") !== null;

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  if (isHidden) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent-purple rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 border border-accent-purple transition-all duration-150 ${isHovered
          ? "w-10 h-10 bg-accent-purple/10 border-accent-purple"
          : "w-6 h-6 border-accent-purple/50"
          }`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`
        }}
      />
    </>
  );
}

export default function Home() {
  // States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<"All" | "Web App" | "Mobile App" | "Python Tool">("All");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Software Engineering & Programming");

  // Contact Form States
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Scroll spy to highlight active section in Navbar
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus === "error") setFormStatus("idle");
  };

  // Projects list (from real GitHub profile)
  const projects: Project[] = [
    {
      id: 1,
      title: "Toko Kita",
      category: "Mobile App",
      description: "Toko Kita - Inventory management mobile application built with Flutter and integrated with Firebase. Features product catalogs, real-time stock tracking, transaction logs, and data reporting.",
      tech: ["Flutter", "Dart", "Firebase", "State Management", "NoSQL"],
      demoUrl: "https://github.com/Velubby/tokokita_app",
      githubUrl: "https://github.com/Velubby/tokokita_app",
      imagePath: "/tokokita.PNG"
    },
    {
      id: 2,
      title: "oiya",
      category: "Mobile App",
      description: "A clean mobile application built with the Flutter framework. Focuses on smooth transitions, user registration, and clean user interfaces.",
      tech: ["Flutter", "Dart", "Mobile UI", "Material Design"],
      demoUrl: "https://github.com/Velubby/oiya",
      githubUrl: "https://github.com/Velubby/oiya",
      imagePath: "/oiya.png"
    },
    {
      id: 3,
      title: "Belutique",
      category: "Web App",
      description: "An e-commerce website for a Japanese-style grilled eel (unagi) store. Designed with a clean menu catalogue, cart mechanisms, and responsive checkout forms.",
      tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
      demoUrl: "https://github.com/Velubby/toko-belut-bakar-japanese-style",
      githubUrl: "https://github.com/Velubby/toko-belut-bakar-japanese-style",
      imagePath: "/belutique.PNG"
    },
    {
      id: 4,
      title: "GGWP Weather",
      category: "Python Tool",
      description: "An automated weather data pipeline. Extracts raw weather statistics from public APIs, cleans and transforms JSON parameters, and loads them into local CSV reports.",
      tech: ["Python", "JSON Parsing", "REST API", "ETL Pipeline"],
      demoUrl: "https://github.com/Velubby/etl-weather",
      githubUrl: "https://github.com/Velubby/etl-weather",
      imagePath: "/ggwp.PNG"
    }
  ];

  // Coursework from Universitas Duta Bangsa Surakarta
  const courseCategories: CourseCategory[] = [
    {
      title: "Software Engineering & Programming",
      icon: <Code className="w-5 h-5 text-accent-purple" />,
      courses: [
        "Pemrograman Mobile (Flutter & Dart)",
        "Pemrograman Web 1 & 2 (Frontend & PHP)",
        "Pemrograman Python",
        "Pemrograman Basis Data (SQL)",
        "Pemrograman Visual",
        "Pemrograman Berorientasi Objek (OOP)",
        "Struktur Data",
        "Rekayasa Perangkat Lunak"
      ]
    },
    {
      title: "Computer Systems & Distributed Infrastructure",
      icon: <Cpu className="w-5 h-5 text-accent-purple" />,
      courses: [
        "Sistem Terdistribusi",
        "Jaringan Komputer",
        "Sistem Operasi",
        "Organisasi dan Arsitektur Komputer",
        "Keamanan Informasi",
        "Teknik Digital & Elektronika",
        "Pengantar Internet of Things (IoT)"
      ]
    },
    {
      title: "Algorithms, Data & Machine Intelligence",
      icon: <Database className="w-5 h-5 text-accent-purple" />,
      courses: [
        "Kecerdasan Mesin dan Buatan (AI)",
        "Data Mining",
        "Sistem Rekomendasi",
        "Sistem Kendali (Control Systems)",
        "Matematika Diskrit",
        "Aljabar Linier",
        "Kalkulus 2",
        "Statistik & Metode Numerik",
        "Teori Bahasa dan Otomata"
      ]
    },
    {
      title: "Business, Methods & Professional Skills",
      icon: <ShieldCheck className="w-5 h-5 text-accent-purple" />,
      courses: [
        "Sistem dan Teknologi Informasi",
        "Kewirausahaan 1 & 2",
        "Inovasi dan Kreatifitas",
        "Manajemen",
        "Metodologi Penelitian",
        "Bahasa Inggris II & 3",
        "Bahasa Indonesia",
        "Pendidikan Agama Islam",
        "Kewarganegaraan & Pancasila"
      ]
    }
  ];

  const filteredProjects = projects.filter(
    (p) => projectFilter === "All" || p.category === projectFilter
  );

  return (
    <div className="flex-1 flex flex-col">
      <CustomCursor />
      {/* Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-bg-primary/80 border-b border-border-purple transition-all duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 text-text-primary font-bold tracking-widest text-lg group">
            <svg className="w-6 h-6 text-accent-purple transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" className="fill-bg-secondary/40 stroke-accent-purple" />
              <polyline points="12 22 12 12" />
              <polyline points="22 8.5 12 12 2 8.5" />
            </svg>
            <span>PORTOFOLIO</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["home", "about", "projects", "education", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`text-sm font-medium capitalize tracking-wide transition-colors ${activeSection === section ? "text-accent-purple font-semibold" : "text-text-muted hover:text-text-secondary"
                  }`}
              >
                {section === "education" ? "Coursework" : section}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-bg-primary border-b border-border-purple py-4 px-6 flex flex-col gap-4">
            {["home", "about", "projects", "education", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium capitalize tracking-wide transition-colors py-2 border-b border-border-purple/20 last:border-0 ${activeSection === section ? "text-accent-purple font-semibold" : "text-text-muted hover:text-text-secondary"
                  }`}
              >
                {section === "education" ? "Coursework" : section}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">

        {/* Hero Section */}
        <AnimatedSection id="home" className="py-20 md:py-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 border-b border-border-purple/30">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="purple-badge">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 inline-block animate-pulse" />
              Undergraduate Student
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-text-primary">
              Hi, I&apos;m <span className="text-text-secondary">Achmad Ichwani</span>.
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-text-secondary max-w-xl min-h-[2rem]">
              Web Developer &amp; <TypingText />
            </p>
            <p className="text-base text-text-muted max-w-lg mx-auto md:mx-0">
              I am a 6th-semester Informatics Engineering student at Universitas Duta Bangsa Surakarta. I build clean, structured codebases for mobile applications using Flutter/Dart and responsive full-stack websites.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
              <a href="#projects" className="glow-btn w-full sm:w-auto text-center">
                View My Projects
              </a>
              <a href="#contact" className="outline-purple-btn w-full sm:w-auto text-center">
                Contact Me
              </a>
            </div>
          </div>

          <div className="w-full md:w-5/12 max-w-md">
            <div className="purple-card p-2 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
              {/* Decorative browser dots */}
              <div className="flex gap-1.5 p-2 border-b border-border-purple/40 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <Image
                src="/me.jpeg"
                alt="Achmad Ichwani Avatar Artwork"
                width={500}
                height={500}
                className="w-full h-auto rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </AnimatedSection>

        {/* About & Skills Section */}
        <AnimatedSection id="about" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-purple/30">
          <div className="flex flex-col md:flex-row gap-12">
            {/* About Bio */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <span className="text-accent-purple font-mono">01.</span> About Me
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  I am a passionate technology student in my 6th semester at Universitas Duta Bangsa Surakarta. With a solid grounding in software engineering methodologies, I focus on building functional mobile apps and modern web tools.
                </p>
                <p>
                  As an aspiring intern, I am looking to apply my knowledge of OOP architectures, database normalization, and cross-platform UI systems in a professional developer workflow. I enjoy solving complex logic puzzles and writing clean codebases.
                </p>
                <p>
                  My current stacks center on Flutter/Dart for mobile app dev, and PHP / JavaScript / SQL databases for responsive web interfaces.
                </p>
              </div>
            </div>

            {/* Skills grid */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <span className="text-accent-purple font-mono">02.</span> Technical Stack
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-accent-purple" /> Mobile App Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Flutter Framework", "Dart Language", "Firebase Integration", "Material & Cupertino UI", "OOP Principles"].map((s) => (
                      <span key={s} className="purple-badge">
                        <CheckCircle2 className="w-3 h-3 text-accent-purple mr-1.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent-purple" /> Web & Database Setup
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["PHP Programming", "MySQL / SQL databases", "HTML5 & CSS3", "JavaScript (ES6)", "Bootstrap / Tailwind"].map((s) => (
                      <span key={s} className="purple-badge">
                        <CheckCircle2 className="w-3 h-3 text-accent-purple mr-1.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-accent-purple" /> Informatics Engineering Basics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Data Structures", "Relational Databases", "Computer Networking", "Python Scripts", "Systems Security"].map((s) => (
                      <span key={s} className="purple-badge">
                        <CheckCircle2 className="w-3 h-3 text-accent-purple mr-1.5" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-purple/30">
          <div className="space-y-6 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                  <span className="text-accent-purple font-mono">03.</span> Public Projects
                </h2>
                <p className="text-text-muted">Real-world codebases. Features actual screenshots and live project links.</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex border border-border-purple bg-bg-secondary p-1 rounded-lg self-start sm:self-auto">
                {(["All", "Web App", "Mobile App", "Python Tool"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setProjectFilter(tab)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${projectFilter === tab
                      ? "bg-accent-purple text-bg-primary"
                      : "text-text-muted hover:text-text-primary"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <div key={p.id} className="purple-card flex flex-col justify-between overflow-hidden">
                <div className="p-6 space-y-4">
                  {/* Category & Icons */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-text-secondary px-2 py-0.5 border border-border-purple rounded">
                      {p.category}
                    </span>
                    <div className="flex gap-3 text-text-muted">
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple transition-colors" title="GitHub Code">
                        <Github className="w-4.5 h-4.5" />
                      </a>
                      <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple transition-colors" title="Live Link">
                        <ExternalLink className="w-4.5 h-4.5" />
                      </a>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-text-primary hover:text-accent-purple transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Visual Display: Image or Fallback Mockup */}
                  <div className="pt-2">
                    {p.imagePath ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border-purple bg-bg-primary">
                        <Image
                          src={p.imagePath}
                          alt={`${p.title} Screenshot`}
                          fill
                          className="object-cover hover:scale-102 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video rounded-lg overflow-hidden border border-border-purple bg-bg-primary p-3">
                        {p.uiMockup}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Tags Footer */}
                <div className="px-6 pb-6 pt-3 border-t border-border-purple/30 bg-bg-primary/30 flex flex-wrap gap-1.5">
                  {p.tech.map((tag) => (
                    <span key={tag} className="text-[9px] font-semibold text-text-secondary bg-bg-tertiary border border-border-purple/50 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Education & Coursework Section */}
        <AnimatedSection id="education" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-purple/30">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">

            {/* Left Column: Education Info */}
            <div className="w-full md:w-5/12 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                  <span className="text-accent-purple font-mono">04.</span> Education &amp; Coursework
                </h2>
                <p className="text-text-muted">A summary of my ongoing academic roadmap and core subjects.</p>
              </div>

              <div className="purple-card p-6 space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-text-primary text-base">Universitas Duta Bangsa Surakarta</h3>
                    <p className="text-xs text-text-secondary font-semibold">Bachelor of Informatics Engineering</p>
                  </div>
                  <span className="text-[10px] font-bold text-bg-primary bg-accent-purple px-2 py-0.5 rounded shrink-0">
                    6th Semester
                  </span>
                </div>
                <div className="space-y-2 border-t border-border-purple/30 pt-3 text-xs text-text-muted leading-relaxed">
                  <p>
                    Currently maintaining an active study schedule focusing on mobile software development and distributed network structures.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-text-secondary pt-1">
                    <BookOpen className="w-3.5 h-3.5 text-accent-purple" />
                    <span>39 Core Courses Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Course categories */}
            <div className="w-full md:w-7/12 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-text-secondary mb-2">
                Academic Curriculum Categories (Click to toggle)
              </h3>

              <div className="space-y-3">
                {courseCategories.map((cat) => {
                  const isOpen = expandedCategory === cat.title;
                  return (
                    <div key={cat.title} className="purple-card overflow-hidden">
                      <button
                        onClick={() => setExpandedCategory(isOpen ? null : cat.title)}
                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-bg-tertiary/20"
                      >
                        <div className="flex items-center gap-3">
                          {cat.icon}
                          <span className="text-sm font-bold text-text-primary">{cat.title}</span>
                        </div>
                        <span className="text-accent-purple">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 border-t border-border-purple/30 bg-bg-secondary/30">
                          <div className="grid sm:grid-cols-2 gap-2 mt-2">
                            {cat.courses.map((course) => (
                              <div key={course} className="flex items-center gap-2 text-xs text-text-muted py-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-purple shrink-0" />
                                <span>{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">

            {/* Contact Details */}
            <div className="flex-1 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <span className="text-accent-purple font-mono">05.</span> Say Hello
              </h2>
              <p className="text-text-muted leading-relaxed max-w-lg">
                I am actively seeking internship roles for my 7th-semester academic requirements. If you have open mobile or web developer internship positions, feel free to reach out!
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3.5 text-text-muted">
                  <div className="p-2.5 bg-bg-secondary border border-border-purple rounded-lg text-accent-purple">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Email Address</div>
                    <a href="mailto:ahmad.ichwani86@gmail.com" className="text-sm font-semibold text-text-primary hover:text-accent-purple transition-colors">
                      ahmad.ichwani86@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-text-muted">
                  <div className="p-2.5 bg-bg-secondary border border-border-purple rounded-lg text-accent-purple">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Location</div>
                    <span className="text-sm font-semibold text-text-primary">
                      Surakarta, Indonesia
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4 pt-4">
                {[
                  { icon: <Github className="w-5 h-5" />, url: "https://github.com/Velubby", title: "GitHub" },
                  { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/achmad-ichwani-2033681a5/", title: "LinkedIn" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-bg-secondary border border-border-purple rounded-lg text-text-muted hover:text-accent-purple hover:border-border-purple-hover hover:-translate-y-0.5 transition-all"
                    title={social.title}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="flex-1">
              <div className="purple-card p-6 md:p-8">
                {formStatus === "success" ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-bg-tertiary border border-accent-purple rounded-full flex items-center justify-center mx-auto text-accent-purple">
                      <CheckCircle2 className="w-8 h-8 animate-bounce" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">Message Sent Successfully!</h3>
                    <p className="text-xs text-text-muted max-w-xs mx-auto">
                      Thank you for reaching out, Achmad. I have received your message and will contact you shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="outline-purple-btn text-xs py-2 px-4 mt-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus === "submitting"}
                        placeholder="John Doe"
                        className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded-lg border border-border-purple focus:border-accent-purple focus:outline-none transition-colors text-sm disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus === "submitting"}
                        placeholder="john@example.com"
                        className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded-lg border border-border-purple focus:border-accent-purple focus:outline-none transition-colors text-sm disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Message Content
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={formStatus === "submitting"}
                        rows={4}
                        placeholder="Hi Achmad, I saw your portfolio and would like to invite you for an interview..."
                        className="w-full bg-bg-primary text-text-primary px-4 py-3 rounded-lg border border-border-purple focus:border-accent-purple focus:outline-none transition-colors text-sm resize-none disabled:opacity-50"
                      />
                    </div>

                    {formStatus === "error" && (
                      <p className="text-xs text-red-400 font-semibold">
                        Please fill in all fields before sending.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="glow-btn w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <span className="w-4.5 h-4.5 border-2 border-bg-primary border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </AnimatedSection>

      </main>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-border-purple py-8 mt-12 text-center text-xs text-text-muted">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div>
            &copy; {new Date().getFullYear()} Achmad Ichwani. All rights reserved.
          </div>
          <div className="font-mono text-[10px] text-accent-purple flex items-center justify-center gap-1.5">
            <Code className="w-3.5 h-3.5" />
            Built with Next.js &amp; Tailwind CSS v4. persistent dark theme.
          </div>
        </div>
      </footer>
    </div>
  );
}
