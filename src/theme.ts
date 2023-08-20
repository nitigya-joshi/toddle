import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { light } from "@mui/material/styles/createPalette";

export const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
});

declare module '@mui/material/styles' {
    interface TypographyVariants {
        body3: React.CSSProperties;
        body4: React.CSSProperties;
        body5: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        body3?: React.CSSProperties;
        body4?: React.CSSProperties;
        body5?: React.CSSProperties;
    }
    interface Palette {
        neutral: { black: string, gray: string };
    }
    interface PaletteOptions {
        neutral: { black: string, gray: string };
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body3: true;
        body4: true;
        body5: true;
    }
}


// Create a theme instance.
const theme = createTheme({
    spacing: [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 22, 24, 28, 32, 34, 40, 48, 56, 60, 100],
    palette: {
        primary: {
            main: '#FFFFFF',
            dark: '#222222',
            light: '#222222',
            contrastText: '#222222',
        },
        grey: {
            "100": "#F4F4F4",
            "200": "#D9D9D9",
        },
        info: {
            main: "#0288D1"
        },
        warning: {
            main: "#FFC107"
        },
        text: {
            primary: '#000000',
            secondary: '#B0B0B0',
            disabled: '#000000CC',
        },
        background: {
            default: '#FFFFFF',
            paper: '#D9D9D9',
        },
        success: {
            main: "#2E7D32"
        },
        error: {
            main: "#D33852",
        },
        neutral: {
            black: "#1E1B39",
            gray: "#615E83",
        },
    },
    typography: {
        fontFamily: [roboto.style.fontFamily].join(','),
        h1: {
            fontSize: '48px',
            fontWeight: '700',
            letterSpacing: '0.01em'
        },
        h2: {
            fontSize: '32pxpx',
            fontWeight: "700",
            lineHeight: "44px"
        },
        h3: {
            fontSize: '34px',
            fontWeight: '300',
            letterSpacing: '0.01em'
        },
        h4: {
            fontSize: '20px',
            fontWeight: '700',
            letterSpacing: '0.01em',
            lineHeight: "28px",
        },
        h5: {
            fontSize: '18px',
            fontWeight: '700',
            letterSpacing: '0.01em',
            lineHeight: "24px",
        },
        body1: {
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '0.01em'
        },
        body2: {
            fontSize: '14px',
            fontWeight: "500",
            lineHeight: '20px',
            letterSpacing: '0.01em'
        },
        body3: {
            fontFamily: roboto.style.fontFamily,
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "16px",
            letterSpacing: "0.01em",
        },
        body4: {
            fontSize: '12px',
            fontWeight: '500',
            lineHeight: '18px',
            letterSpacing: '0.01em',
        },
        body5: {
            fontSize: "10px",
            fontWeight: "400",
            lineHeight: "15px",
            letterSpacing: "0.01em",
        }
    },
});

export default theme;
