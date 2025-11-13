
import { theme } from '../../../theme/landing/invernadero/theme';
import { HeroSection } from '../../../components/landing/invernadero/HeroSection';
import { FeaturesSection } from '../../../components/landing/invernadero/FeaturesSection';
import { StatsSection } from '../../../components/landing/invernadero/StatsSection';
import { CTASection } from '../../../components/landing/invernadero/CTASection';

export const InvernaderoUteqView = () => {
  return (
    <div style={{ background: theme.primaryDark, overflow: 'hidden' }}>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};