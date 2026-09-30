import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import localFont from "next/font/local"
import "styles/globals.css"

const geraldine = localFont({
  src: "../../public/fonts/Geraldine.ttf",
  variable: "--font-geraldine",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={geraldine.variable}>
      <body className={geraldine.variable}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
