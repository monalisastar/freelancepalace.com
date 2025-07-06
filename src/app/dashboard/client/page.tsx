// app/dashboard/client/page.tsx
import ClientHero from "./components/ClientHero";
import StartProjectCTA from "./components/StartProjectCTA";
import RecommendedFreelancers from "./components/RecommendedFreelancers";
import StatsOverview from "./components/StatsOverview";
import RewardTiers from "./components/RewardTiers";
import WalletCard from "./components/WalletCard";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-10">
      <ClientHero />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StartProjectCTA />
        <WalletCard />
      </div>
      <RecommendedFreelancers />
      <StatsOverview />
      <RewardTiers />
    </div>
  );
}

