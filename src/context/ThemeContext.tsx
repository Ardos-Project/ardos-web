import {createContext} from "react";
import {Theme} from "@hooks/ThemeHook";

const ThemeContext = createContext({theme: "light", setTheme: (_: Theme) => {}});

ThemeContext.displayName = "Theme";

export default ThemeContext;
