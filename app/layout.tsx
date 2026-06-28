HEAD
import "./globals.css"; export const metadata={title:"DesignPro Mega",description:"Multilingual Next.js Project"}; export default function RootLayout({children}){return(<html lang="en"><body style={{margin:0,fontFamily:"sans-serif"}}>{children}</body></html>);}

﻿import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
0be64c92fa64ac9fa69c021b8c4f4d1722de3b74
