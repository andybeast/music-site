
'use client'

import TextWithAnimation from '@/src/components/fancytext/MainPageText';
import WebsiteInfo from '@/src/components/fancytext/WebsiteInfo';





export default function Home() {
  return (

    
    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-zinc-500 to-zinc-900">
      
      
      
      
     
      
      <TextWithAnimation></TextWithAnimation>
      
    
      
      <div className="w-screen">
        <WebsiteInfo />
      </div>



    </div>






  );
}
