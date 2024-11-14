import RootLayout from './layout';
import GlitchComponent from '@/src/components/fancytext/GlitchText';
import TextWithAnimation from '@/src/components/fancytext/MainPageText';
import WebsiteInfo from '@/src/components/fancytext/WebsiteInfo';




export default function Home() {
  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <GlitchComponent />

        

        <TextWithAnimation></TextWithAnimation>

        <WebsiteInfo />

      </div>
      

      

    
      
     
    </RootLayout>
  );
}
