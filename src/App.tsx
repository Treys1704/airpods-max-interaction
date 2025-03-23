import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import {ChevronLeft, ChevronRight, Moon, Sun} from 'lucide-react';
import { AirpodsTitle } from './AirpodsTitle';

gsap.registerPlugin(MotionPathPlugin);

const airpodsData = [
    {
        name: "AirPods Max",
        model: "Rose Gold",
        price: "$899",
        color: "Rose",
        image: "/img-3.png",
        icon: "/icon-3.png",
        colorIcon: "/color-3.svg"
    },
    {
        name: "AirPods Max",
        model: "Sky Blue",
        price: "$748",
        color: "Blue sky",
        image: "/img-2.png",
        icon: "/icon-2.png",
        colorIcon: "/color-2.svg"
    },
    {
        name: "AirPods Max",
        model: "Silver Pro",
        price: "$564",
        color: "Silver",
        image: "/img-1.png",
        icon: "/icon-1.png",
        colorIcon: "/color-1.svg"
    }
];

const transformData = [
    {
        width: "700px",
        top: "-20px",
        left: "100px",
        rotate: 0,
    },
    {
        width: "250px",
        top: "500px",
        left: "-80px",
        rotate: 120,
    },
    {
        width: "250px",
        top: "-100px",
        left: "-80px",
        rotate: 28,
    },
];

function App() {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isChanging, setIsChanging] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([null, null, null]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleNext = () => {
        setIsChanging(true);
        const newIndex = (currentIndex + 1) % 3;
        animateImages(newIndex);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsChanging(false), 400);
    };

    const handlePrev = () => {
        setIsChanging(true);
        const newIndex = (currentIndex - 1 + 3) % 3;
        animateImages(newIndex);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsChanging(false), 400);
    };

    const animateImages = (newIndex: number) => {
        const order = [
            [0, 1, 2],
            [2, 0, 1],
            [1, 2, 0],
        ];

        order[newIndex].forEach((position, index) => {
            const img = imagesRef.current[index];
            if (img) {
                gsap.to(img, {
                    ...transformData[position],
                    duration: 0.5,
                });
            }
        });
    };

    useEffect(() => {
        imagesRef.current.forEach((img, index) => {
            if (img) {
                gsap.set(img, transformData[index]);
            }
        });
    }, []);

    return (
        <div className={`flex justify-center items-center h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#1d1d1f]' : 'bg-white'}`}>
            <button
                onClick={toggleDarkMode}
                className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
            >
                {isDarkMode ? (
                    <Sun className="w-6 h-6 text-yellow-500" />
                ) : (
                    <Moon className="w-6 h-6 text-gray-700" />
                )}
            </button>

            <main className="relative bg-gray-100 dark:bg-[#000000] w-[1280px] max-w-full mx-auto flex items-center justify-between p-8 pr-24 rounded-2xl">
                <div className="relative w-full h-[650px]">
                    <div className="absolute left-0 w-full h-full">
                        {airpodsData.map((airpod, index) => (
                            <img
                                key={index}
                                ref={(el) => {
                                    imagesRef.current[index] = el;
                                }}
                                src={airpod.image}
                                alt={airpod.model}
                                className="absolute z-30"
                            />
                        ))}
                    </div>
                </div>

                <div className="w-[400px] flex-shrink-0 z-30 flex flex-col items-start gap-6">
          <span className="text-[#bf4800] dark:text-[#ff6b19] font-medium tracking-tight">
            Free engraving
          </span>

                    <h1 className={`text-4xl font-bold leading-tight tracking-tighter transition-all duration-500 text-gray-900 dark:text-white ${isChanging ? 'translate-y-[-10px] opacity-0' : ''}`}>
                        <span>{airpodsData[currentIndex].name}</span> <br />
                        <span>{airpodsData[currentIndex].model}</span>
                    </h1>

                    <div className="bg-white dark:bg-[#1d1d1f] rounded-lg p-3.5 flex flex-col items-start gap-1.5 w-full">
                        <h2 className={`text-3xl font-semibold leading-tight transition-all duration-500 text-gray-900 dark:text-white ${isChanging ? 'translate-y-[-10px] opacity-0' : ''}`}>
                            {airpodsData[currentIndex].price}
                        </h2>
                        <h4 className="text-sm font-medium leading-4 mt-1 text-gray-900 dark:text-gray-100">
                            AppleCare+ for headphones and earphones
                        </h4>
                        <div className="w-full h-[0.5px] bg-[#d2d2d766] dark:bg-[#d2d2d733] my-1" />
                        <p className="text-xs leading-[14px] text-[#515154] dark:text-gray-400">
                            Get up to two years' warranty covering an unlimited number of
                            accidental damage repairs and additional technical assistance**.
                            Includes tax on insurance premiums at the applicable rate
                        </p>
                    </div>

                    <div className="w-full flex items-center justify-between">
                        {airpodsData.map((airpod, index) => (
                            <div
                                key={index}
                                className={`relative w-[30%] flex flex-col items-center justify-center bg-white dark:bg-[#1d1d1f] rounded-lg p-4 pb-8 cursor-pointer ${
                                    index === currentIndex ? 'active' : ''
                                }`}
                            >
                                <img src={airpod.icon} alt={airpod.color} className="z-20" />
                                <img src={airpod.colorIcon} alt={airpod.color} className="z-20" />
                                <span className="block mt-3 text-sm font-medium leading-4 z-20 text-gray-900 dark:text-white">
                  {airpod.color}
                </span>
                                <div className={`absolute bottom-2.5 rounded-[10px] bg-gray-100 dark:bg-black w-[85%] transition-all duration-500 ${
                                    index === currentIndex ? 'h-[200px]' : 'h-[10px]'
                                }`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 flex items-center gap-4 z-30">
                    <button
                        onClick={handlePrev}
                        className="w-[55px] h-[55px] bg-[#0071e3] rounded-full flex justify-center items-center overflow-hidden transition-transform duration-500 hover:scale-90 group"
                    >
                        <ChevronLeft className="flex-shrink-0 transition-transform duration-500 group-hover:scale-150 transform-gpu" size={32} color="white" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-[55px] h-[55px] bg-[#0071e3] rounded-full flex justify-center items-center overflow-hidden transition-transform duration-500 hover:scale-90 group"
                    >
                        <ChevronRight className="flex-shrink-0 transition-transform duration-500 group-hover:scale-150 transform-gpu" size={32} color="white" />
                    </button>
                </div>

                <div className="absolute w-full top-[100px] left-1/2 -translate-x-1/2 flex justify-center items-center z-20">
                    <AirpodsTitle />
                </div>
            </main>
        </div>
    );
}

export default App;