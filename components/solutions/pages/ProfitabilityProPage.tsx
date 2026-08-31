import SolutionDetailLanding from "@/components/landing/SolutionDetailLanding";
import type { SolutionDetailData as SolutionItem } from "@/lib/services/solutions.service";

export default function ProfitabilityProPage({ solution }: { solution: SolutionItem }) {
  return (
    <SolutionDetailLanding
      solution={solution}
      heroImage="/assets/image/Product_4.png"
      impactImage="/assets/image/Product_4.png"
      showHeroCopy={true}
    />
  );
}
