import React from 'react'
import{BsFillBookmarkPlusFill} from 'react-icons/bs'


const BookingInfoCard = ({BookingInfo}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full md:w-[40%]  h-fit  border-b-2 border-black  bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg bg-clip-padding rounded-xl shadow-2xl p-2'>
                    <div className='w-full flex flex-col gap-2 items-start align-middle  p-2'>

                        <div
                            className='w-full flex items-center align-middle p-1 mb-2 gap-2 border-b-2 border-black '>

                            <BsFillBookmarkPlusFill className='text-3xl text-sky-900' />

                            <h1 className='text-lxl font-extrabold text-slate-900 text-center'>Booking Information</h1>
                        </div>

                        <p
                            className='flex items-center gap-2 font-semibold text-slate-900  text-center'
                        >
                            Room:
                            <span>
                      { // check if user has any existing bookings
                          BookingInfo.RoomNumber
                                }
                            </span>
                        </p>

                        <p
                            className='flex items-center gap-2 font-semibold text-slate-900  text-center'
                        >
                            Booking Duration:
                            <span>
                                {
                                    BookingInfo.Duration
                                }
                            </span>
                        </p>

              <p className='flex items-center gap-2 font-semibold text-slate-900  text-center'>
                  Booking Status: {
                    // check if Booking.Status is "pending" or "approved" or "cancelled" and display accordingly
                      
                      BookingInfo.Status === 'pending' ? (
                          <span className='text-xl text-yellow-500'>{BookingInfo.Status}</span>
                      ) : BookingInfo.Status === 'approved' ? (
                          <span className='text-xl text-green-500'>{BookingInfo.Status}</span>
                      ) : (
                          <span className='text-xl text-red-500'>{BookingInfo.Status}</span>
                      )
                        
                  }
              </p>
              
              <p className='flex items-center gap-2 font-semibold text-slate-900  text-center'>
                  Booking Date: <span>{BookingInfo.BookedOn}</span>
              </p>

              {/* if booking status is approves then display approval date */}
              {BookingInfo.Status === 'approved' &&
                  <p className='flex items-center gap-2 font-semibold text-slate-900  text-center'>
                      Approved On: <span>{BookingInfo.ApprovalDate}</span>
                  </p>
              }

              {/* if booking status is cancelled then display cancellation date */}
              {BookingInfo.Status === 'cancelled' &&
                  <p className='flex items-center gap-2 font-semibold text-slate-900  text-center'>
                      Cancelled On: <span>{BookingInfo.CancellationDate}</span>
                  </p>
                }
              
                    </div>
                </div>
  )
}

export default BookingInfoCard