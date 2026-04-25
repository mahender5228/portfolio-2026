import { SceneCanvas } from "../components/scene-canvas";
import { StoryOverlays, type StoryStop } from "../components/story-overlays";

const stops: StoryStop[] = [
  {
    id: "summary",
  },
  {
    id: "arsenal",
  },
  {
    id: "experience",
  },
  {
    id: "projects",
  },
  {
    id: "academic-research",
  },
  {
    id: "education",
  },
  {
    id: "certifications",
  },
  {
    id: "contact",
  },
];

export default function Page() {
  return (
    <main className="relative min-h-[800vh] bg-neutral-950 text-white">
      <SceneCanvas />
      <StoryOverlays stops={stops} />
    </main>
  );
}
