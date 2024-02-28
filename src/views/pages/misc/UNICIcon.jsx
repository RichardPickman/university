import { useTheme } from "@mui/material/styles";

export const UNICIcon = () => {
    const {
        palette: { mode },
    } = useTheme();

    const fillers = {
        c: mode === "light" ? "#5c5867" : "#fff",
        d: mode === "light" ? "#464749" : "#464749",
        e: mode === "light" ? "#aa0720" : "#aa0720",
        a: "none",
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="166.479"
            height="63.811"
            viewBox="0 0 166.479 63.811"
        >
            <defs>
                <clipPath fill="none">
                    <rect
                        fill={fillers["a"]}
                        clipPath={fillers["a"]}
                        width="166.479"
                        height="63.811"
                    />
                </clipPath>
            </defs>
            <g fill={fillers["b"]}>
                <path
                    fill={fillers["c"]}
                    d="M28.727,63.811C12.887,63.811,0,51.42,0,36.189V0H57.458V36.191c0,15.23-12.888,27.62-28.731,27.62"
                />
                <path
                    fill={fillers["c"]}
                    d="M2.5,2.5V36.712C2.5,50.879,14.476,62.36,29.252,62.36S56,50.879,56.007,36.715V2.5Z"
                    transform="translate(-0.524 -0.524)"
                />
                <path
                    fill={fillers["d"]}
                    d="M22.327,2.5V22.333L2.5,2.5Z"
                    transform="translate(-0.525 -0.524)"
                />
                <path
                    fill={fillers["e"]}
                    d="M2.5,36.712C2.5,50.879,14.476,62.36,29.252,62.36S56,50.879,56.007,36.715V2.5H29.261l0,36.57L2.5,12.31Z"
                    transform="translate(-0.524 -0.524)"
                />
                <path
                    fill={fillers["c"]}
                    d="M114.378,44.807a9.37,9.37,0,0,1-2.066,3.169,9.659,9.659,0,0,1-3.149,2.086,10.638,10.638,0,0,1-7.9,0,9.656,9.656,0,0,1-3.148-2.086,9.367,9.367,0,0,1-2.065-3.169A10.636,10.636,0,0,1,95.3,40.8V23.549h4.051V39.674a16.348,16.348,0,0,0,.181,2.787,5.725,5.725,0,0,0,.662,1.825,5.048,5.048,0,0,0,2.065,2.006,6.347,6.347,0,0,0,5.875,0,5.029,5.029,0,0,0,2.087-2.006,5.744,5.744,0,0,0,.662-1.825,16.431,16.431,0,0,0,.181-2.787V23.549h4.049V40.8a10.666,10.666,0,0,1-.74,4.011"
                    transform="translate(-19.994 -4.94)"
                />
                <path
                    fill={fillers["c"]}
                    d="M134.532,31.092v18.73h-4.051V21.265l19.494,20.376V23.07h4.05v28.4Z"
                    transform="translate(-27.374 -4.461)"
                />
                <rect
                    fill={fillers["c"]}
                    width="4.051"
                    height="26.752"
                    transform="translate(134.674 18.609)"
                />
                <path
                    fill={fillers["c"]}
                    d="M197.9,50.7a13.8,13.8,0,0,1-13.918-13.918,12.986,12.986,0,0,1,1.124-5.334,14.507,14.507,0,0,1,3.008-4.412,14.233,14.233,0,0,1,4.413-2.989,13.306,13.306,0,0,1,5.374-1.1,18.207,18.207,0,0,1,1.987.1,10.724,10.724,0,0,1,1.744.341,12.417,12.417,0,0,1,1.686.622q.842.382,1.764.9v4.772a18.162,18.162,0,0,0-1.844-1.362,9.933,9.933,0,0,0-1.765-.9,9.646,9.646,0,0,0-1.825-.5,12.2,12.2,0,0,0-2.026-.16,8.777,8.777,0,0,0-3.709.8,9.76,9.76,0,0,0-3.049,2.185,10.517,10.517,0,0,0-2.065,3.228,10.568,10.568,0,0,0,0,7.883,9.884,9.884,0,0,0,2.085,3.168,9.493,9.493,0,0,0,3.151,2.107,10.155,10.155,0,0,0,3.949.762,8.734,8.734,0,0,0,3.509-.7,15.114,15.114,0,0,0,3.59-2.348v4.895A14.6,14.6,0,0,1,197.9,50.7"
                    transform="translate(-38.597 -4.812)"
                />
            </g>
        </svg>
    );
};
