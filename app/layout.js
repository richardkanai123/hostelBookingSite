import Navbar from '@/components/Navbar'
import './globals.css'
// context provid3r
import { RoomsProvider } from '@/context/RoomsContext'
import { UsersProvider } from '@/context/UsersContext'
import { BookingsProvider } from '@/context/BookingsContext'

// fonts
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin']
})

export const metadata = {
  title: 'Hostel Booking Site',
  description: 'A site for booking hostels',

}

export default function RootLayout({ children }) {
  return (

    <html className={openSans.className} lang="en">
      <body className='w-full flex items-center align-middle flex-col justify-center max-h-fit bg-slate-200'>
        <UsersProvider>
          <Navbar />
          <div className='w-full'>
            <RoomsProvider>
              <BookingsProvider>
                {children}
              </BookingsProvider>
            </RoomsProvider>
          </div>
        </UsersProvider>
      </body>
    </html>

  )
}
