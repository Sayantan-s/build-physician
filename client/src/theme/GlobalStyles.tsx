import { createGlobalStyle } from "styled-components";
import { units } from "./units";

export const GlobalStyles = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.font.type.prompt.join(",")};
    }
    html{
        font-size: 62.5%;
        body{
            font-size: ${({ theme }) => units(theme.font.size.base)};
            background-color: ${({ theme }) => theme.colors.bg.light};
        }
    }
`;
