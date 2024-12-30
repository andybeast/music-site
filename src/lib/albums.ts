export interface Album {
    id: number;
    title: string;
    genres: string[];
    price: number;
    lenght: string;
    description: string;
    releaseDate?: string;
    topsong: string;
    image: string;
    link: string;
    attribute: string;
    songs: string[];
}


export const albums: Album[] = [
    {
        id: 1,
        title: "Tropic Nights",
        genres: ["Pop", "R&B"],
        price: 10,
        lenght: "7:27",
        description: 'Tropic Nights takes you on a vibrant journey through exotic beats and infectious pop rhythms, all while weaving in the smooth allure of R&B. The album kicks off with "Time’s Up," a standout track that holds a special place in Lunar Boom’s history as their very first creation. Get ready to vibe, groove, and lose yourself in this genre-blending experience!',
        releaseDate: "2024-11-07",
        topsong: "Time's Up",
        image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
        link: "albums/tropicnights",
        attribute: "EP",
        songs: ["times up", "believe it", "or not"]
    },
    {
        id: 2,
        title: "Lofi Reggae",
        genres: ["Reggae", "Lofi"],
        price: 5,
        lenght: "13:24",
        description: "Lofi Reggae is a laid-back lofi reggae album(who would have guessed) that instantly transports you to a serene beachside retreat. With chilled-out rhythms, mellow grooves, and tropical undertones, it captures the essence of swaying palm trees, ocean breezes, and golden sunsets. Perfect for relaxing, studying, or just daydreaming of paradise.",
        releaseDate: "2024-11-12",
        topsong: "Monkey Tunes",
        image: "https://i.ibb.co/DQrg0Xc/LUnar-Boom.jpg",
        link: "albums/lofireggae",
        attribute: "EP",
        songs: ["tropicanos", "sunny lofi", "monkey tunes", "beachy lofi"]
    },

    {
        id: 3,
        title: "Planetary Lofi",
        genres: ["Lofi", "RnB", "Electro"],
        price: 0,
        lenght: "17:20",
        description: "Planetary Lofi is a cosmic journey through soothing space-inspired lofi beats. With ethereal melodies, ambient textures, and a weightless vibe, this album captures the feeling of floating among the stars. Perfect for stargazing, deep focus, or simply escaping to the vastness of the universe.",
        releaseDate: "2024-11-14",
        topsong: "mars",
        image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
        link: "albums/planetarylofi",
        attribute: "EP",
        songs: ["gliese 12b","kepler 22b", "luyten b", "ross 128b", "earth", "mars" ]  
    },

    {
        id: 4,
        title: "Christmas Lofi",
        genres: ["Lofi"],
        price: 0,
        lenght: "12:04",
        description: "Christmas Lofi wraps you in a cozy blanket of festive lofi beats, blending the warmth of holiday classics with a chill, modern vibe. With gentle jingles, soft piano, and snowy ambience, this album is perfect for sipping hot cocoa, decorating the tree, or simply relaxing by the fire this holiday season.",
        releaseDate: "2024-11-14",
        topsong: "Warm Darkness",
        image: "https://i.ibb.co/YDxMFz8/LUnar-Boom.jpg",
        link: "albums/christmaslofi",
        attribute: "EP",
        songs: ["warm darkness", "gingerbread tunes", "glühwein nights", "soft snow", "fireplace heat"]
    },

]