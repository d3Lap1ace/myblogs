import Header from '@/components/Header';
import IntroCard from '@/components/IntroCard';

export default function Home() {
    return (
        <div
            className="min-h-screen relative"
            style={{
                backgroundImage: 'url(/myblogs/background.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="relative z-10">
                <Header />
                {/* <HeroSection /> */}
                <IntroCard />
            </div>
        </div>
    );
}
