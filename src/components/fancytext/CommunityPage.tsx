'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import InstagramEmbed from '../socialmedia/InstaPosts'
import TikTokPlayer from '../socialmedia/TiktokScreen'



interface SocialSectionProps {
    title: string;
    gradient: string;
    imageSrc: string;
    description: string;
    children: React.ReactNode;
}


const AnimatedBackground: React.FC = () => (
    <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 animate-gradient-xy"></div>
    </div>
)

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
    <div className={`bg-white dark:bg-zinc-800 shadow-lg overflow-hidden ${className}`}>
        {children}
    </div>
)

const CardHeader: React.FC<React.PropsWithChildren<object>> = ({ children }) => (
    <div className="px-4 sm:px-6 py-4 flex items-center justify-between">{children}</div>
)

const CardTitle: React.FC<React.PropsWithChildren<object>> = ({ children }) => (
    <h2 className="text-6xl font-bold text-white dark:text-gray-100">{children}</h2>
)

const CardContent: React.FC<React.PropsWithChildren<object>> = ({ children }) => (
    <div className="px-4 sm:px-6 py-4">{children}</div>
)

const CardDescription: React.FC<React.PropsWithChildren<object>> = ({ children }) => (
    <p className="text-2xl text-gray-300 dark:text-gray-300 mb-4">{children}</p>
)



const SocialSection: React.FC<SocialSectionProps> = ({ title, gradient, imageSrc, description, children }) => (
    <Card className={`w-full ${gradient} animate-gradient bg-[length:200%_200%]`}>
        <div className="max-w-7xl mx-auto">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <Image src={imageSrc} alt={`${title} logo`} width={128} height={128} />
            </CardHeader>
            <CardContent>
                <CardDescription>{description}</CardDescription>
                {children}
            </CardContent>
        </div>
    </Card>
)



const YouTubeSection: React.FC = () => {
    const videos = [
        "edZj4tszIG0",
        "edZj4tszIG0",
        "edZj4tszIG0",
        "edZj4tszIG0",
        "dQw4w9WgXcQ",
        "dQw4w9WgXcQ",
        "dQw4w9WgXcQ",
        "dQw4w9WgXcQ",
    ];

    return (
        <SocialSection
            title="YouTube"
            gradient="bg-gradient-to-r from-zinc-900 to-red-800"
            imageSrc="https://i.ibb.co/VNSXRDx/vecteezy-youtube-logo-png-youtube-icon-transparent-18930572.png"
            description="Check out what Lunar Boom has to offer on YouTube"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {videos.map((videoId, index) => (
                    <div key={index} className="aspect-video">
                        <iframe
                            className="w-full h-ful rounded-lg"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`YouTube video player ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-8'>
                <Link
                    href="https://www.youtube.com/channel/UCkWejueGfu2sfS9IEX77wFQ"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="px-6 py-2 bg-red-600 text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 transition duration-200"
                    >
                        Subscribe
                    </button>
                </Link>
            </div>
        </SocialSection>
    )
}

const TikTokSection: React.FC = () => (
    <SocialSection
        title="TikTok"
        gradient="bg-gradient-to-r from-black via-zinc-900 to-zinc-700"
        imageSrc="https://i.ibb.co/Vtd28GY/Tiktok-logo.png"
        description=""
    >
        <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="text-left max-w-md">
                <h1 className="text-2xl text-white underline">Want to use our music in a TikTok?</h1>
                <p className="text-lg mt-2 text-gray-200">
                    Go to Lunar Boom on TikTok and select any of our songs. We will repost any video made with our Music!
                </p>
            </div>

            <TikTokPlayer
                videoId="7440948418517814561"
                username="Lunar Boom"
                caption=""
                soundTitle="original sound - Lunar Boom"
            />

            <div className="text-left max-w-md">
                <h1 className="text-2xl text-white underline">Are you a TikTok creator?</h1>
                <p className="text-lg mt-2 text-gray-200">
                    Reach out to us on TikTok for collaborations. We would love to work on something together!
                </p>
            </div>
        </div>




        <div className="mb-4 md:mb-0 md:mr-4 flex justify-center">
            <Link
                href="https://www.tiktok.com/@lunar_boom_?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button
                    className="px-6 py-2 mt-6 bg-black text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition duration-200"
                >
                    Follow us
                </button>
            </Link>
        </div>
    </SocialSection>
)


const InstaSection: React.FC = () => (
    <SocialSection
        title="Instagram"
        gradient="bg-gradient-to-r from-zinc-900 via-zinc-700 to-pink-800"
        imageSrc="https://i.ibb.co/ZWCZzWL/insta-logo.png"
        description="Stay updated with our latest photos and stories"
    >


        <div className="mb-4 md:mb-0 md:mr-4 flex justify-center">
            <Link
                href="https://www.instagram.com/lunarboommusic/profilecard/?igsh=em1laTc2enVzZ3dx"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button
                    className="px-6 py-2 mt-6 bg-pink-800 text-white text-sm sm:text-base font-bold rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition duration-200"
                >
                    Follow us
                </button>
            </Link>
        </div>
    </SocialSection>
)




const SpotifySection: React.FC = () => {
    const spotifyUrls = [
        "https://open.spotify.com/embed/track/5qLD9qs6wv0mU1JutcN2Ge",
        "https://open.spotify.com/embed/track/27ylqmPgRVbhU7LohYRxYD",
        "https://open.spotify.com/embed/track/179eZw6GHnj9Ul6Qz6UXpW",
        "https://open.spotify.com/embed/track/0HmD2sguEa4tVk8FhlLuJG",
        "https://open.spotify.com/embed/track/4ivZP9vLilFqDJWF3y5H8x",
        'https://open.spotify.com/embed/track/3O4XIDo3KTrfgRPbph25E3',
        "https://open.spotify.com/embed/track/2OuRAGasrvkqi65ApPy5cI",
        
        // Add more Spotify track URLs as needed
    ];

    return (
        <SocialSection
            title="Spotify"
            gradient="bg-gradient-to-r from-green-700 to-green-500"
            imageSrc="https://i.ibb.co/NVJyQh0/spot-logo.png"
            description="Listen to our latest tracks and playlists"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {spotifyUrls.map((url, index) => (
                    <div key={index} className="aspect-video">
                        <iframe
                            style={{ borderRadius: '12px' }}
                            src={url + "?utm_source=generator"}
                            width="100%"
                            height="200"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={`Spotify track player ${index + 1}`}
                        ></iframe>
                    </div>
                ))}
            </div>
        </SocialSection>
    );
};

const ArtistSection: React.FC = () => {

    return (
        <SocialSection
            title="Lunar Boom Artists"
            gradient="bg-gradient-to-r from-gray-700 to-gray-500"
            imageSrc="https://i.postimg.cc/cHg0vcV1/logo.png"
            description=""
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {/* Artist Card */}
                <div className="bg-black rounded-lg p-6">
                    <h1 className="text-4xl text-red-500 font-bold text-center">Christina</h1>
                    <p className="text-lg text-red-500 mt-4 text-center">
                        Christina is a talented artist specializing in watercolors and paintings.
                    </p>

                    {/* Instagram Embed and Contributions */}
                    <div className="flex flex-col md:flex-row items-start gap-8 mt-6">
                        {/* Contributions Section */}
                        <div className="flex flex-col items-start gap-8">
                            <div className="flex-1">
                                <h2 className="text-lg underline text-red-400 font-bold mb-2">Contributions</h2>
                                <li className="text-sm text-red-200">Lunar Boom Logo</li>
                                <li className="text-sm text-red-200">Album Cover</li>
                                <li className="text-sm text-red-200">Tropic nights cover</li>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg underline text-red-400 font-bold mb-2">Achievments</h2>
                                <li className="text-sm text-red-200">8 followers on insta</li>
                                <li className="text-sm text-red-200">Cool drawings</li>
                                <li className="text-sm text-red-200">IDk what else to put</li>
                            </div>
                        </div>

                        {/* Instagram Embed Section */}
                        <div className="flex-1">
                            
                            <InstagramEmbed postLink="https://www.instagram.com/p/C7J3O5ktTRf/?utm_source=ig_embed&amp;utm_campaign=loading" />
                        </div>
                    </div>
                </div>

                <div className="bg-black rounded-lg p-4">
                    <h1 className="text-3xl text-blue-500 font-bold text-center">Artist 2</h1>
                    <p className="text-lg text-blue-300 mt-4 text-center">
                        Christina is a talented artist specializing in watercolors and paintings.
                    </p>
                    {/* Instagram Embed */}
                    <div className="flex flex-col items-start gap-8">
                            <div className="flex-1">
                                <h2 className="text-lg underline text-blue-400 font-bold mb-2">Contributions</h2>
                                <li className="text-sm text-blue-200">Lunar Boom Logo</li>
                                <li className="text-sm text-blue-200">Album Cover</li>
                                <li className="text-sm text-blue-200">Tropic nights cover</li>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg underline text-blue-400 font-bold mb-2">Achievments</h2>
                                <li className="text-sm text-blue-200">8 followers on insta</li>
                                <li className="text-sm text-blue-200">Cool drawings</li>
                                <li className="text-sm text-blue-200">IDk what else to put</li>
                            </div>
                        </div>
                </div>



            </div>
        </SocialSection>

    );
};




const Community: React.FC = () => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
            <AnimatedBackground />
            <div className="relative z-10 w-full px-0">


                <YouTubeSection />

                <InstaSection />

                <TikTokSection />



                <SpotifySection />
                <ArtistSection />





            </div>
        </div>
    )
}

export default Community