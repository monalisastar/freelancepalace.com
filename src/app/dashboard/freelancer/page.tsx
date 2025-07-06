'use client';

import WelcomeCard from './components/WelcomeBanner';
import JobFeed from './components/JobFeed';
import ProposalsPanel from './components/ProposalsPanel';
import WalletCard from './components/WalletCard';
import PerformanceChart from './components/PerformanceChart';
import NotificationsPanel from './components/NotificationsPanel';
import AIChatAssistant from './components/AIChatAssistant';

export default function FreelancerDashboardHome() {
  return (
    <>
      <WelcomeCard />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mt-4">
        <JobFeed />
        <ProposalsPanel />
        <WalletCard />
        <PerformanceChart />
        <NotificationsPanel />
      </div>
      <div className="mt-6">
        <AIChatAssistant />
      </div>
    </>
  );
}

