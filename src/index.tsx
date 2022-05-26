import "./index.css";
import "@telefonica/mistica/css/reset.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { getTelefonicaSkin, ThemeContextProvider } from "@telefonica/mistica";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <ThemeContextProvider
        theme={{
            skin: getTelefonicaSkin(),
            i18n: {
                locale: "es-ES",
                phoneNumberFormattingRegionCode: "ES",
            },
            enableTabFocus: true,
        }}
    >
        <App />
    </ThemeContextProvider>
);
