import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
// import Font Awesome CSS
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false

const poppins = Poppins({
        weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
        display: 'swap',
        subsets: ['latin'],
})

export const metadata: Metadata = {
        title: 'Weather Next App',
        description: 'data from openweathermap current weather api',
}

export default function RootLayout({
        children,
}: {
        children: React.ReactNode
}) {
        return (
                <html lang="en">
                        <body className={poppins.className}>{children}</body>
                </html>
        )
}
