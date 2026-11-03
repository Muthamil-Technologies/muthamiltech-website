// Real photographs of Japan used on japanone.app, from Wikimedia Commons under open licences
// (CC0, public domain, CC BY, CC BY-SA), each credited on /credits. They show the world around
// JapanOne; none is presented as JapanOne's own school, workplace or product. Files: public/photos.
export type PhotoId = "study-hero" | "study-class" | "study-partner" | "work-hero" | "work-street" | "work-ssw" | "work-partner" | "learn-hero" | "live-hero" | "live-town" | "travel-hero" | "travel-torii" | "home-torii" | "home-arrive" | "home-shop" | "shop-pottery" | "learn-kanji" | "travel-kiyomizu" | "travel-yukata" | "live-supermarket" | "live-shibuya";

export type JOPhoto = {
  id: PhotoId;
  src: string;
  alt: string;
  /** object-position for crops. */
  focus?: string;
  title: string;
  creator: string;
  license: string;
  licenseUrl: string;
  page: string;
};

export const PHOTOS: JOPhoto[] = [
  { id: "study-hero", src: "/photos/study-hero.jpg", alt: "Students walking to Komaba Campus, University of Tokyo", focus: "50% 60%",
    title: "Students walking towards Komaba Campus, University of Tokyo", creator: "Tokyo538", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Students_walking_towards_Komaba_Campus,_University_of_Tokyo.jpg" },
  { id: "study-class", src: "/photos/study-class.jpg", alt: "A Japanese classroom with desks and a blackboard",
    title: "Classroom2", creator: "Darklanlan", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Classroom2.jpg" },
  { id: "study-partner", src: "/photos/study-partner.jpg", alt: "Students outside a building at the University of Tokyo's Hongo Campus",
    title: "Students, Engineering Building 2 - Hongo Campus, the University of Tokyo - DSC05011", creator: "Daderot", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Students,_Engineering_Building_2_-_Hongo_Campus,_the_University_of_Tokyo_-_DSC05011.jpg" },
  { id: "work-hero", src: "/photos/work-hero.jpg", alt: "Two workers in hard hats levelling gravel on a truck near Shibuya station, Tokyo", focus: "50% 35%",
    title: "Workers leveling ballast on a road-rail dual usage truck, near Shibuya station", creator: "Syced", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Workers_leveling_ballast_on_a_road-rail_dual_usage_truck,_near_Shibuya_station.jpg" },
  { id: "work-street", src: "/photos/work-street.jpg", alt: "Commuters on a train platform in Tokyo",
    title: "Commuting - Sony A7R (12287655784)", creator: "Luke Ma from Taipei, Taiwan ROC", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", page: "https://commons.wikimedia.org/w/index.php?curid=31655068" },
  { id: "work-ssw", src: "/photos/work-ssw.jpg", alt: "Construction workers directing a truck at a building site in Osaka",
    title: "Construction works Japan, Osaka", creator: "Editorq35", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Construction_works_Japan,_Osaka.jpg" },
  { id: "work-partner", src: "/photos/work-partner.jpg", alt: "Commuters boarding a crowded train in Japan",
    title: "混雑 (24585315301)", creator: "fto mizno", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:%E6%B7%B7%E9%9B%91_(24585315301).jpg" },
  { id: "learn-hero", src: "/photos/learn-hero.jpg", alt: "Shop signs in Japanese at the market by Shimotakaido station, Tokyo", focus: "50% 30%",
    title: "Shimotakaido Ekimae Ichiba 01", creator: "Suikotei", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Shimotakaido_Ekimae_Ichiba_01.jpg" },
  { id: "live-hero", src: "/photos/live-hero.jpg", alt: "Shinjuku Ward Office, Tokyo",
    title: "Shinjuku Ward Office 2023-02-16", creator: "Asanagi", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:Shinjuku_Ward_Office_2023-02-16.jpg" },
  { id: "live-town", src: "/photos/live-town.jpg", alt: "Mount Fuji above the houses of a Japanese town", focus: "50% 40%",
    title: "View of Mt Fuji from Shinkansen - March 2025", creator: "Kuroshiononeko", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en", page: "https://commons.wikimedia.org/wiki/File:View_of_Mt_Fuji_from_Shinkansen_-_March_2025.jpg" },
  { id: "travel-hero", src: "/photos/travel-hero.jpg", alt: "A Shinkansen bullet train passing in front of Mount Fuji",
    title: "Shinkansen passing in front of Mount Fuji", creator: "Manish Prabhune", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", page: "https://commons.wikimedia.org/w/index.php?curid=184356913" },
  { id: "travel-torii", src: "/photos/travel-torii.jpg", alt: "A path of red torii gates at Fushimi Inari Shrine, Kyoto",
    title: "20181110 Fushimi Inari Torii 10", creator: "Balon Greyjoy", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en/", page: "https://commons.wikimedia.org/w/index.php?curid=107789454" },
  { id: "home-torii", src: "/photos/home-torii.jpg", alt: "A red torii gate at Fushimi Inari Shrine, Kyoto", focus: "50% 40%",
    title: "20181110 Fushimi Inari Torii 1", creator: "Balon Greyjoy", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en/", page: "https://commons.wikimedia.org/w/index.php?curid=107789485" },
  { id: "home-arrive", src: "/photos/home-arrive.jpg", alt: "The arrival hall at Narita Airport Terminal 2",
    title: "Narita Airport Terminal 2 Arrival Hall 2018", creator: "Wpcpey", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Narita_Airport_Terminal_2_Arrival_Hall_2018.jpg" },
  { id: "home-shop", src: "/photos/home-shop.jpg", alt: "Japanese gift envelopes for sale at a shop in Hiroshima",
    title: "Stationery at a shop in HiroshimaP1010373", creator: "RF Vila", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Stationery_at_a_shop_in_HiroshimaP1010373.jpg" },
  { id: "shop-pottery", src: "/photos/shop-pottery.jpg", alt: "Plates and bowls stacked in a Japanese pottery shop",
    title: "小松屋 (44705931274)", creator: "Luca Sartoni from Vienna, Austria", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", page: "https://commons.wikimedia.org/wiki/File:%E5%B0%8F%E6%9D%BE%E5%B1%8B_(44705931274).jpg" },
  { id: "learn-kanji", src: "/photos/learn-kanji.jpg", alt: "The kanji 秋 (autumn) written with a brush", focus: "50% 50%",
    title: "Aki no kanji", creator: "Pablo D. Flores", license: "CC BY-SA 2.5", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5", page: "https://commons.wikimedia.org/wiki/File:Aki_no_kanji.jpg" },
  { id: "travel-kiyomizu", src: "/photos/travel-kiyomizu.jpg", alt: "Kiyomizu-dera temple in Kyoto among autumn leaves",
    title: "Kiyomizu-dera, Kyoto, November 2016 -01", creator: "Martin Falbisoner", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-01.jpg" },
  { id: "travel-yukata", src: "/photos/travel-yukata.jpg", alt: "Four visitors in yukata at the north gate of Kiyomizu-dera, Kyoto", focus: "50% 55%",
    title: "Four ladies wearing a yukata in front of the North Gate of Kiyomizu-dera temple Kyoto Japan", creator: "Basile Morin", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", page: "https://commons.wikimedia.org/wiki/File:Four_ladies_wearing_a_yukata_in_front_of_the_North_Gate_of_Kiyomizu-dera_temple_Kyoto_Japan.jpg" },
  { id: "live-supermarket", src: "/photos/live-supermarket.jpg", alt: "Shoppers in a Japanese supermarket",
    title: "Japanese Supermarket", creator: "Yuya Tamai", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", page: "https://commons.wikimedia.org/wiki/File:Japanese_Supermarket.jpg" },
  { id: "live-shibuya", src: "/photos/live-shibuya.jpg", alt: "People crossing the Shibuya scramble crossing in Tokyo at night",
    title: "Tokyo Shibuya Scramble Crossing 2018-10-09", creator: "Benh LIEU SONG ( Flickr )", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", page: "https://commons.wikimedia.org/wiki/File:Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg" },
];

export const photo = (id: PhotoId) => PHOTOS.find((p) => p.id === id)!;
