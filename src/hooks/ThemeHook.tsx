import {useEffect, useState} from "react";

const THEME_STORE = "theme";

export type Theme = "light" | "dark";

export default function useTheme() {
    const getTheme = () => {
        let theme = localStorage.getItem("theme") as Theme;
        if (!theme) {
            // If we don't have a saved theme, what's the system default?
            theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        return theme;
    };

    const [theme, setTheme] = useState<Theme>(getTheme());
    const currTheme = theme === "dark" ? "light" : "dark";

    const saveTheme = (theme: Theme) => {
        localStorage.setItem(THEME_STORE, theme);
        setTheme(theme);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(currTheme);
        root.classList.add(theme);
    }, [theme, currTheme]);

    return {
        setTheme: saveTheme,
        theme,
    };
}
