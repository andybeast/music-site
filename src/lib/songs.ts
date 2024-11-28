export interface Song {
    id: number;
    title: string;
    image: string;
    link: string;
    album: string;
    strength: number;
    genres: string[];
    price: number;
  }
  
  export const songLinks: Record<number, string> = {
    1: "https://storage.googleapis.com/lunarboom-music/Completesongs/Canyoubelieveit%20SNIPPET.wav",
    2: "https://storage.googleapis.com/lunarboom-music/Completesongs/TimesUp-kopi.wav",
    3: "https://storage.googleapis.com/lunarboom-music/Completesongs/Donotgiveup-snip.wav",
    4: "https://storage.googleapis.com/lunarboom-music/Completesongs/tropicanos_snippppet.wav",
    5: "https://storage.googleapis.com/lunarboom-music/Completesongs/sunny%20lofi_snipp.wav",
    6: "https://storage.googleapis.com/lunarboom-music/Completesongs/monkey%20tunes_snip.wav",
    7: "https://storage.googleapis.com/lunarboom-music/Completesongs/beachy%20lofi_snip.wav",
    8: "https://storage.googleapis.com/lunarboom-music/Completesongs/Gingerbread%20tunes%20SNippet.wav",
    9: "https://storage.googleapis.com/lunarboom-music/Completesongs/Glühwein%20Nights%20snippet.wav",
    10: "https://storage.googleapis.com/lunarboom-music/Completesongs/Warm%20Darkness%20snippet.wav",
    11: "https://storage.googleapis.com/lunarboom-music/Completesongs/Soft%20Snow%20snippet.wav",
    12: "https://storage.googleapis.com/lunarboom-music/Completesongs/Fireplace%20Heat%20snippet.wav",
    13: "https://storage.googleapis.com/lunarboom-music/Completesongs/Gliese%2012%20b%20snip.wav",
    14: "https://storage.googleapis.com/lunarboom-music/Completesongs/Kepler-22b%20snip.wav",
    15: "https://storage.googleapis.com/lunarboom-music/Completesongs/Luyten%20b%20snip.wav",
    16: "https://storage.googleapis.com/lunarboom-music/Completesongs/Ross%20128%20b%20snip.wav",
    17: "https://storage.googleapis.com/lunarboom-music/Completesongs/earth%20snip.wav",
    18: "https://storage.googleapis.com/lunarboom-music/Completesongs/Mars%20snip.wav",
  };
  
  export const songs: Song[] = [
    {
      id: 1,
      title: "Believe It",
      image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
      link: "albums/tropicnights",
      album: "Tropic Nights",
      strength: 3,
      genres: ["Pop"],
      price: 3
    },
    {
      id: 2,
      title: "Times Up",
      image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
      link: "albums/tropicnights",
      album: "Tropic Nights",
      strength: 2,
      genres: ["Pop"],
      price: 2
    },
    {
      id: 3,
      title: "Or Not",
      image: "https://i.ibb.co/4swsR48/Designer-1.jpg",
      link: "albums/tropicnights",
      album: "Tropic Nights",
      strength: 3,
      genres: ["Pop"],
      price: 3,
    },
    {
      id: 4,
      title: "tropicanos",
      image: "https://i.ibb.co/DQrg0Xc/LUnar-Boom.jpg",
      link: "/lofireggae",
      album: "Lofi Reggae",
      strength: 0.99,
      genres: ["Lofi", "Reggae"],
      price: 0.99
    },
    {
      id: 5,
      title: "sunny lofi",
      image: "https://i.ibb.co/DQrg0Xc/LUnar-Boom.jpg",
      link: "/lofireggae",
      album: "Lofi Reggae",
      strength: 0.99,
      genres: ["Lofi", "Reggae"],
      price: 0.99
    },
    {
      id: 6,
      title: "monkey tunes",
      image: "https://i.ibb.co/DQrg0Xc/LUnar-Boom.jpg",
      link: "/lofireggae",
      album: "Lofi Reggae",
      strength: 1,
      genres: ["Lofi", "Reggae"],
      price: 1
    },
    {
      id: 7,
      title: "beachy lofi",
      image: "https://i.ibb.co/DQrg0Xc/LUnar-Boom.jpg",
      link: "/lofireggae",
      album: "Lofi Reggae",
      strength: 0.99,
      genres: ["Lofi", "Reggae"],
      price: 0.99
    },
    {
      id: 8,
      title: "Gingerbread Tunes",
      image: "https://i.ibb.co/YDxMFz8/LUnar-Boom.jpg",
      link: "/christmaslofi",
      album: "Christmas Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Christmas"],
      price: 0.99
    },
    {
      id: 9,
      title: "Glühwein Nights",
      image: "https://i.ibb.co/YDxMFz8/LUnar-Boom.jpg",
      link: "/christmaslofi",
      album: "Christmas Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Christmas"],
      price: 0.99
    },
    {
      id: 10,
      title: "Warm Darkness",
      image: "https://i.ibb.co/YDxMFz8/LUnar-Boom.jpg",
      link: "/christmaslofi",
      album: "Christmas Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Christmas"],
      price: 0.99
    },
    {
      id: 11,
      title: "Soft Snow",
      image: "https://i.ibb.co/YDxMFz8/LUnar-Boom.jpg",
      link: "/christmaslofi",
      album: "Christmas Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Christmas"],
      price: 0.99
    },
    {
      id: 12,
      title: "Fireplace Heat",
      image: "https://i.ibb.co/YDxMFz8/LUnar-Boom.jpg",
      link: "/christmaslofi",
      album: "Christmas Lofi",
      strength: 1.5,
      genres: ["Lofi", "RnB", "Christmas"],
      price: 1.5
    },
    {
      id: 13,
      title: "Gliese 12 b",
      image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
      link: "/planetarylofi",
      album: "Planetary Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Electro"],
      price: 0.99
    },
    {
      id: 14,
      title: "Kepler 22b",
      image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
      link: "/planetarylofi",
      album: "Planetary Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Electro"],
      price: 0.99
    },
    {
      id: 15,
      title: "Luyten b",
      image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
      link: "/planetarylofi",
      album: "Planetary Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Electro"],
      price: 0.99
    },
    {
      id: 16,
      title: "Ross 128",
      image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
      link: "/planetarylofi",
      album: "Planetary Lofi",
      strength: 0.99,
      genres: ["Lofi", "RnB", "Electro"],
      price: 0.99
    },
    {
      id: 17,
      title: "earth",
      image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
      link: "/planetarylofi",
      album: "Planetary Lofi",
      strength: 1,
      genres: ["Lofi", "RnB", "Electro"],
      price: 1
    },
    {
      id: 18,
      title: "mars",
      image: "https://i.ibb.co/TvxymD5/soft-shadow.jpg",
      link: "/planetarylofi",
      album: "Planetary Lofi",
      strength: 1,
      genres: ["Lofi", "RnB", "Electro"],
      price: 1
    },
  ];
  
  // Helper function to get song audio URL by ID
  export function getSongAudioUrl(id: number): string | undefined {
    return songLinks[id];
  }
  
  