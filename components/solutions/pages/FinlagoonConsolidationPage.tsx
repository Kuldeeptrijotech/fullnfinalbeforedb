import SolutionDetailLanding from "@/components/landing/SolutionDetailLanding";
import type { SolutionDetailData as SolutionItem } from "@/lib/services/solutions.service";

export default function FinlagoonConsolidationPage({ solution }: { solution: SolutionItem }) {
  return (
    <SolutionDetailLanding
      solution={solution}
      heroImage="/assets/heroes/industry-blue.png"
      impactImage="/assets/heroes/industry-blue.png"
      showHeroCopy={true}
    />
  );
}
