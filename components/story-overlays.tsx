"use client";

import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type StoryStop = {
  id:
    | "summary"
    | "arsenal"
    | "experience"
    | "projects"
    | "academic-research"
    | "education"
    | "certifications"
    | "contact";
};

export type Theme = {
  bg: string;
  text: string;
  subtext: string;
  box: string;
  pill: string;
  pillHover: string;
};

const accentClass =
  "bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent";

const arsenalSkills = [
  "JavaScript and Node.js",
  "Data analysis and visualization",
  "R language proficiency",
  "Python",
  "Machine learning and deep learning",
  "RESTful API development",
  "SQL",
];

const projectItems = [
  {
    title: "ClimYieldNet (Precision Agriculture AI)",
    subtitle: "Python, ML/DL, Data Fusion, 2026",
    body: "Engineered a novel multimodal AI model to predict crop yields and soil fertility by fusing drone imagery and IoT sensor data. Authored a technical research paper detailing the architecture and training methodologies for upcoming IEEE submission, demonstrating a massive leap in predictive accuracy over traditional single-modal systems.",
    tags: ["Python", "ML/DL", "Data Fusion"],
  },
  {
    title: "RentMyExtras (P2P Marketplace)",
    subtitle: "Next.js, Firebase Console, 2026",
    body: "Founded and engineered a comprehensive peer-to-peer equipment rental platform. Built a scalable MERN-stack architecture deployed to seamlessly handle user-to-user transactions for high-value gear, managing the full development lifecycle across web and mobile platforms.",
    tags: ["Next.js", "Firebase Console", "MERN Stack"],
    live: true,
  },
  {
    title: "Crop Yield Prediction using ML",
    subtitle: "Python, React, Jupyter notebook, Docker, 2025",
    body: "Developed a machine learning model to accurately predict crop yield, leveraging Python and Jupyter Notebook for data analysis and visualization.",
    tags: ["Python", "React", "Docker"],
  },
  {
    title: "Tech Contributor at LeadTailor (AI B2B)",
    subtitle: "Next.js, Prisma, AWS, SQL, Stripe, 2023",
    body: "Contributed to the implementation and management of modern technologies including SQL, Prisma, Next.js, and AWS, supporting scalable AI driven B2B solutions.",
    tags: ["Next.js", "Prisma", "AWS"],
  },
  {
    title: "Accident Detection Application",
    subtitle: "Python, Android Studio, Firebase, Algorithms, 2022",
    body: "Built a real-time accident detection system using Python, focused on safety automation and quick emergency response.",
    tags: ["Python", "Android Studio", "Firebase"],
  },
];

const researchItems = [
  {
    title: "Hybrid ML Crop Yield Predictor",
    subtitle: "Python, Deep Learning, Random Forest, 2026",
    body: "Engineered an optimized 21-layer deep neural network and evaluated ensemble algorithms on extensive agricultural datasets, achieving an 11% RMSE. Authored and presented a research paper proposing a hybrid methodology that bridges mechanistic crop simulations with machine learning to enhance predictive accuracy and interpretability.",
    tags: ["Python", "Deep Learning", "Random Forest"],
  },
  {
    title: "ClimYieldNet (Climate-Resilient AI)",
    subtitle: "Python, Spatial-Temporal DL, Data Fusion, 2026",
    body: "Engineered a multimodal deep learning architecture combining ResCNNs, TCNs, and Attention Bi-LSTMs to accurately forecast crop yields under extreme weather conditions, achieving an exceptional 4.19 q/ha RMSE. Authored an accepted research paper detailing this architecture and pioneering ethical AI deployment through differential privacy firewalls and epistemic uncertainty quantification.",
    tags: ["Python", "Spatial-Temporal DL", "Data Fusion"],
  },
];

const getCardTheme = (index: number): Theme => {
  return {
    bg: "bg-white/20 border-white/30", 
    text: "text-slate-900", 
    subtext: "text-slate-800", 
    box: "bg-white/30 border-white/25", 
    pill: "bg-white/50 border-white/40 text-slate-900", 
    pillHover: "hover:bg-white/70 hover:text-slate-950" 
  };
};

function PanelShell({
  children,
  className,
  theme,
}: {
  children: ReactNode;
  className?: string;
  theme: Theme;
}) {
  return (
    <div
      className={`w-full max-w-3xl rounded-[28px] border p-7 shadow-[0_20px_80px_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-colors duration-500 ${theme.bg} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function IntroGreeting() {
  return (
    <section className="flex min-h-[72vh] items-end justify-center px-6 pb-24 pt-24 md:px-12 md:pb-32">
      <div className="w-full max-w-3xl rounded-[28px] border border-white/30 bg-white/25 p-8 shadow-[0_20px_80px_rgba(255,255,255,0.08)] backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-700/80">Greeting Protocol</p>
        <h1 className={`mt-4 text-3xl font-semibold leading-tight md:text-5xl ${accentClass}`}>
          print("Hello, World.")
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-800 md:text-lg">
          The first code we ever wrote, and coincidentally, the only code that I didn&apos;t have to look up on Stack Overflow for my portfolio.
          Scroll down to begin the journey.
        </p>
      </div>
    </section>
  );
}

function SummaryPanel({ theme }: { theme: Theme }) {
  return (
    <PanelShell theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold leading-tight md:text-5xl ${theme.text}`}>
        <span className={accentClass}>Hey</span> <span>👋</span>{" "}
        <span className={accentClass}>I'm Mahender Bhambhu</span>
      </h2>
      <h3 className="mt-2 text-xl font-medium text-purple-600">
        AI/ML Engineer & Full-Stack Developer
      </h3>
      <p className={`mt-6 max-w-3xl text-base leading-8 md:text-lg ${theme.subtext}`}>
        AI/ML Engineer and experienced Full-Stack Developer with a proven track record. Having
        skills in Python, Node.js, and cloud deployments, alongside graduate-level academic
        publications in machine learning and multimodal data fusion. Passionate about translating
        complex, data-driven research into impactful, high-performance technology.
      </p>
    </PanelShell>
  );
}

function ArsenalPanel({ theme }: { theme: Theme }) {
  return (
    <PanelShell theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold md:text-5xl ${theme.text}`}>
        <span className={accentClass}>Technical Arsenal</span> <span>🤖 🛠️</span>
      </h2>

      <div className={`mt-6 rounded-2xl border p-5 ${theme.box}`}>
        <div className="flex flex-wrap gap-2">
          {arsenalSkills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:border-pink-400/45 hover:shadow-[0_12px_32px_rgba(217,70,239,0.24)] ${theme.pill} ${theme.pillHover}`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

function ExperiencePanel({ theme }: { theme: Theme }) {
  return (
    <PanelShell theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold md:text-5xl ${theme.text}`}>
        <span className={accentClass}>Experience Timeline</span> <span>💻</span>
      </h2>

      <div className="mt-6 space-y-6 border-l border-white/40 pl-5">
        <div className="relative">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.9)]" />
          <h3 className={`text-lg font-semibold ${theme.text}`}>
            Full Stack Web Developer @ Azikya Software Solution
          </h3>
          <p className={`mt-1 text-sm font-medium ${theme.subtext}`}>Feb 2023 - Nov 2023</p>
          <p className={`mt-2 text-sm leading-7 ${theme.subtext}`}>
            Executed complex e-commerce solutions using MERN stack and SQL, integrated Stripe, and
            managed AWS cloud applications to improve scalability and performance.
          </p>
        </div>

        <div className="relative">
          <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.9)]" />
          <h3 className={`text-lg font-semibold ${theme.text}`}>
            Web Developer Intern @ Internshala
          </h3>
          <p className={`mt-1 text-sm font-medium ${theme.subtext}`}>Jul 2021 - Dec 2021</p>
          <p className={`mt-2 text-sm leading-7 ${theme.subtext}`}>
            Completed a six-month internship contributing to real-world project deliverables and
            collaborative software engineering scenarios.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}

function ProjectsPanel({
  title,
  emoji,
  items,
  theme,
}: {
  title: string;
  emoji?: string;
  items: Array<{
    title: string;
    subtitle: string;
    body: string;
    tags: string[];
    live?: boolean;
  }>;
  theme: Theme;
}) {
  return (
    <PanelShell theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold md:text-5xl ${theme.text}`}>
        <span className={accentClass}>{title}</span> {emoji && <span>{emoji}</span>}
      </h2>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((project) => (
          <article
            key={project.title}
            className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/16 ${theme.box}`}
          >
            <h3 className={`text-base font-semibold ${theme.text}`}>{project.title}</h3>
            <p className={`mt-1 text-xs font-bold ${accentClass}`}>{project.subtitle}</p>
            <p className={`mt-3 text-sm leading-6 ${theme.subtext}`}>{project.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${theme.pill}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.live ? (
              <div className="mt-4">
                <a
                  className="inline-flex rounded-full border border-pink-400/40 bg-gradient-to-r from-purple-500/85 to-pink-500/85 px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
                  href="#"
                >
                  Live
                </a>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </PanelShell>
  );
}

function EducationPanel({ theme }: { theme: Theme }) {
  return (
    <PanelShell theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold md:text-5xl ${theme.text}`}>
        <span className={accentClass}>Education</span> <span>📖</span>
      </h2>
      <div className={`mt-6 rounded-2xl border p-5 ${theme.box}`}>
        <div className="space-y-4">
          <div className="grid gap-2 md:grid-cols-[80px_1fr]">
            <span className={`font-semibold ${theme.text}`}>2026</span>
            <span className={theme.subtext}>M.Eng : AI/ML | Chandigarh University Mohali, PB</span>
          </div>
          <div className="grid gap-2 md:grid-cols-[80px_1fr]">
            <span className={`font-semibold ${theme.text}`}>2023</span>
            <span className={theme.subtext}>B.Eng: Computer Science | Chandigarh University Mohali, PB</span>
          </div>
          <div className="grid gap-2 md:grid-cols-[80px_1fr]">
            <span className={`font-semibold ${theme.text}`}>2019</span>
            <span className={theme.subtext}>Higher Secondary | Vidya Devi Mandir School Hisar, HR</span>
          </div>
          <div className="grid gap-2 md:grid-cols-[80px_1fr]">
            <span className={`font-semibold ${theme.text}`}>2016</span>
            <span className={theme.subtext}>Metric | St. Kabir School Hisar, HR</span>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function CertificationsPanel({ theme }: { theme: Theme }) {
  return (
    <PanelShell theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold md:text-5xl ${theme.text}`}>
        <span className={accentClass}>Certifications</span> <span>👨🏻‍💻</span>
      </h2>

      <div className={`mt-6 rounded-2xl border p-5 ${theme.box}`}>
        <ul className={`space-y-4 text-sm font-medium leading-7 ${theme.subtext}`}>
          <li>Programming for Everybody (Getting Started with Python), Coursera, S2ZKGBKXBD5U</li>
          <li>
            Cybersecurity Roles, Processes and Operating System Security, Coursera, HT5C3A49UY9
          </li>
          <li>Build Your First React Website, Coursera, DKJFAQEM2WBN</li>
          <li>Crash Course on Python, Coursera, YLTTHUYLSSQN</li>
        </ul>
      </div>
    </PanelShell>
  );
}

function ContactPanel({ theme }: { theme: Theme }) {
  return (
    <PanelShell className="max-w-xl p-6 md:p-7" theme={theme}>
      <h2 className={`mt-4 text-3xl font-semibold md:text-5xl ${theme.text}`}>
        <span className={accentClass}>Let&apos;s Build Together</span> <span>🙏</span>
      </h2>
      <div className={`mt-5 rounded-2xl border p-5 ${theme.box}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.28em] opacity-80 ${theme.subtext}`}>
          Contact Info
        </p>
        <div className="mt-4 space-y-4">
          <div className={`rounded-xl border px-4 py-3 ${theme.box}`}>
            <p className={`flex items-center text-[11px] uppercase tracking-[0.24em] font-semibold opacity-80 ${theme.subtext}`}>
              <span className="mr-2 tracking-normal text-sm">✉️</span> Email
            </p>
            <a className={`mt-1 block text-base font-medium transition-colors hover:text-pink-600 ${theme.text}`} href="mailto:bhambhu27@gmail.com">
              bhambhu27@gmail.com
            </a>
          </div>
          <div className={`rounded-xl border px-4 py-3 ${theme.box}`}>
            <p className={`flex items-center text-[11px] uppercase tracking-[0.24em] font-semibold opacity-80 ${theme.subtext}`}>
              <span className="mr-2 tracking-normal text-sm">📞</span> Phone
            </p>
            <a className={`mt-1 block text-base font-medium transition-colors hover:text-pink-600 ${theme.text}`} href="tel:+919872687150">
              +91 9872687150
            </a>
          </div>
          <div className={`rounded-xl border px-4 py-3 ${theme.box}`}>
            <p className={`flex items-center text-[11px] uppercase tracking-[0.24em] font-semibold opacity-80 ${theme.subtext}`}>
              <span className="mr-2 tracking-normal text-sm">💼</span> LinkedIn
            </p>
            <a
              className={`mt-1 block text-base font-medium leading-6 transition-colors hover:text-pink-600 ${theme.text}`}
              href="https://www.linkedin.com/in/mahender-bhambhu-146596218/"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/mahender-bhambhu-146596218
            </a>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function PoliceModelShowcase() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/police.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state) => {
    if (!group.current) {
      return;
    }
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.2 + Math.PI / 10;
  });

  return (
    <group ref={group} position={[0, -1.2, 0]} scale={1.35}>
      <primitive object={clonedScene} />
    </group>
  );
}

function FinalThanksPanel() {
  return (
    <div className="w-full max-w-4xl rounded-[30px] border border-white/15 bg-[#0a0a0a]/78 p-5 shadow-2xl backdrop-blur-xl">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent">
          <div className="h-[340px] md:h-[420px]">
            <Canvas camera={{ position: [0, 1.8, 8.5], fov: 32 }} dpr={[1, 1.5]}>
              <ambientLight intensity={1.4} />
              <directionalLight intensity={2.6} position={[5, 6, 6]} />
              <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#334155" />
              <Suspense fallback={null}>
                <PoliceModelShowcase />
              </Suspense>
            </Canvas>
          </div>
        </div>

        <div className="flex items-center">
          <div className="rounded-[24px] border border-white/12 bg-[#16161d]/78 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <h2 className={`text-3xl font-semibold md:text-5xl ${accentClass}`}>Busted.</h2>
            <p className="mt-5 text-base leading-8 text-white/88 md:text-lg">
              License, registration, and job offers, please. You&apos;ve been caught speeding through
              my entire tech stack. But seriously, thank you for taking the time to scroll all the
              way to the end. I really appreciate it. Drop a message on contact info and let&apos;s get in touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HireMePanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    if (!noBtnRef.current) return;
    
    // Teleport the button
    const randomX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 160 + 80);
    const randomY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 120 + 60);

    gsap.to(noBtnRef.current, {
      x: randomX,
      y: randomY,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!yesBtnRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.35; 
    const deltaY = (e.clientY - centerY) * 0.35;
    
    gsap.to(yesBtnRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    if (yesBtnRef.current) {
      gsap.to(yesBtnRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    }
    if (noBtnRef.current) {
      gsap.to(noBtnRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        overwrite: "auto",
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/15 bg-[#0a0a0a]/78 px-6 py-16 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center text-center mt-8 md:px-12 md:py-20"
    >
      <h2 className={`text-4xl font-bold md:text-6xl ${accentClass}`}>So... Am I hired?</h2>
      <p className="mt-4 text-base md:text-lg text-slate-300">You&apos;ve seen the stack, you&apos;ve seen the ride. What&apos;s the verdict?</p>
      
      <div className="mt-16 flex flex-row items-center justify-center gap-12 md:gap-24 h-56 w-full relative">
        <button 
          ref={yesBtnRef}
          onClick={() => alert("Great choice! Looking forward to connecting. 🎉")}
          className="group relative flex flex-col items-center z-20 cursor-pointer"
        >
          {/* UPDATED: Loading the local yes.png file */}
          <img 
            src="/yes.png" 
            alt="Yes! Hire me" 
            className="h-32 w-32 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-transform group-hover:scale-110 md:h-40 md:w-40" 
          />
          <span className="mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-lg md:text-xl font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition hover:brightness-110">
            YES!
          </span>
        </button>

        <button 
          ref={noBtnRef}
          onMouseEnter={handleNoHover}
          onClick={handleNoHover} 
          className="relative z-10 flex flex-col items-center"
        >
          {/* UPDATED: Loading the local no.png file */}
           <img 
            src="/no.png" 
            alt="No" 
            className="h-28 w-28 opacity-70 md:h-32 md:w-32" 
          />
           <span className="mt-2 rounded-full border border-white/20 bg-white/5 px-8 py-2 text-base md:text-lg font-bold text-slate-400">
             No
           </span>
        </button>
      </div>
    </div>
  );
}

function renderPanel(stop: StoryStop, index: number) {
  const theme = getCardTheme(index);

  switch (stop.id) {
    case "summary":
      return <SummaryPanel theme={theme} />;
    case "arsenal":
      return <ArsenalPanel theme={theme} />;
    case "experience":
      return <ExperiencePanel theme={theme} />;
    case "projects":
      return <ProjectsPanel title="Real World Projects" emoji="🚀" items={projectItems} theme={theme} />;
    case "academic-research":
      return <ProjectsPanel title="Academic Research" emoji="🔬" items={researchItems} theme={theme} />;
    case "education":
      return <EducationPanel theme={theme} />;
    case "certifications":
      return <CertificationsPanel theme={theme} />;
    case "contact":
      return <ContactPanel theme={theme} />;
  }
}

export function StoryOverlays({ stops }: { stops: StoryStop[] }) {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stickerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(() => {
    const triggers: ScrollTrigger[] = [];

    panelRefs.current.forEach((panel, index) => {
      const section = sectionRefs.current[index];
      const sticker = stickerRefs.current[index];

      if (!panel || !section) return;

      gsap.set(panel, {
        x: "-5vw", 
        y: 120,
        rotate: -6,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          end: "bottom 30%",
          scrub: 0.9,
          invalidateOnRefresh: true, 
        },
      });

      timeline.to(
        panel,
        {
          x: "0vw",
          y: 0,
          rotate: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.46,
        },
        0 
      );

      if (sticker) {
        timeline.to(
          sticker,
          {
            y: () => {
              const panelHeight = panel.clientHeight;
              const stickerHeight = sticker.clientHeight;
              return Math.max(0, panelHeight - stickerHeight - 64);
            },
            ease: "none", 
            duration: 1.06, 
          },
          0 
        );
      }

      timeline.to(
        panel,
        {
          x: "-12vw",
          y: -100,
          rotate: -12,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.38,
        },
        0.68 
      );

      if (timeline.scrollTrigger) {
        triggers.push(timeline.scrollTrigger);
      }
    });

    gsap.to(".bitmoji-bob", {
      y: -15, 
      rotation: 3, 
      duration: 0.4,
      yoyo: true,
      repeat: -1, 
      ease: "sine.inOut",
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [stops]);

  return (
    <div className="relative z-10 overflow-hidden">
      <IntroGreeting />
      
      {stops.map((stop, index) => (
        <section
          key={stop.id}
          ref={(node) => {
            sectionRefs.current[index] = node;
          }}
          className="flex min-h-screen items-center justify-center px-6 py-24 md:justify-start md:px-12 md:pl-[26vw] lg:pl-[28vw]"
        >
          <div
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            className="w-full max-w-3xl relative"
          >
            <div 
              ref={(node) => {
                stickerRefs.current[index] = node;
              }}
              className="absolute top-8 -left-4 w-28 -translate-x-full pointer-events-none z-20 md:-left-8 md:w-36 lg:-left-12 lg:w-44"
            >
              <img 
                src={`/bit${index + 1}.png`} 
                alt="Bitmoji Sticker" 
                className="bitmoji-bob h-auto w-full drop-shadow-2xl" 
              />
            </div>
            
            {renderPanel(stop, index)}
          </div>
        </section>
      ))}

      <section className="flex flex-col items-center justify-center px-6 py-24 md:px-12 pb-32">
        <FinalThanksPanel />
        <HireMePanel />
      </section>
    </div>
  );
}

useGLTF.preload("/models/police.glb");