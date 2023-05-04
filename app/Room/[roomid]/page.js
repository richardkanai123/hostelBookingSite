import React, { Suspense } from 'react'
import { db } from '@/app/utils/Firebase/Firebase'
import { doc, getDoc } from 'firebase/firestore'

async function getRoomsData(roomid) {
    // get room data with id = roomid from firestore
    const docRef = doc(db, 'rooms', roomid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }

}

// getusers from firestore
async function getUsersData(userid) {
    // get user data with id = userid from firestore
    const docRef = doc(db, 'users', userid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }

}

// room details page
const RoomDetails = async ({ params: { roomid } }) => {
    // room data
    const roomData = await getRoomsData(roomid)
    // user data of occupant gotten only if room is occupied
    const userData = roomData.Occupancy === "occupied" ? await getUsersData(roomData.Occupant[0]?.id) : null

    // Wait for the promises to resolve
    await Promise.all([roomData, userData])
    return (

        <>
            {/* suspense */}
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100 bg-opacity-50 p-1">
                        <h1 className='font-bold text-xl' >
                            Loading...
                        </h1>
                        <hr className='w-full mt-2 h-[3px]  bg-red-900' />
                    </div>
                }>

                <div className="flex flex-col items-center justify-around align-middle w-full h-full bg-gray-100 bg-opacity-50 p-2">
                    {/* header */}
                    <div className="flex flex-col items-center justify-center w-full h-1/6">
                        <h1 className='font-bold text-xl' >
                            Room Details :
                            <span className='text-sky-800'> {roomid}</span>
                        </h1>
                        <hr className='w-full mt-2 h-[3px]  bg-red-900' />
                    </div>

                    {/* body */}
                    <div className="flex flex-wrap items-center justify-around align-middle w-full h-fit p-2 gap-2">

                        <div className="flex flex-col gap-1 bg-lime-200 bg-opacity-95 p-2 rounded-lg w-full md:w-[45%] lg:w-[40%]">
                            <h4 className='w-full text-left text-xl font-semibold'>Main Details</h4>
                            <hr className='w-full h-[3px]  bg-red-900' />
                            <p className='text-lg'>Room Type :
                                <span className='text-green-600 font-bold'> {roomData.Type}</span>
                            </p>
                            <p className='text-lg'>Room Occupancy : {
                                // change color depending on occupancy: either vacant or occupied
                                roomData.Occupancy === 'vacant' ? (
                                    <span className='text-green-600 font-bold'>{roomData.Occupancy}</span>
                                ) : (
                                    <span className='text-red-600 font-bold'>{roomData.Occupancy}</span>
                                )
                            }</p>

                            <p className='text-lg'>
                                Booked: {roomData.Booked ? (
                                    <span className='text-yellow-600 font-bold'>Yes</span>
                                ) : (
                                    <span className='text-green-600 font-bold'>No</span>
                                )
                                }
                            </p>

                            <p className='text-lg'>Room Price : {
                                // format price into kenyan currency
                                new Intl.NumberFormat('en-KE', {
                                    style: 'currency',
                                    currency: 'KES'
                                }).format(roomData.Price) + ' / sem'
                            }</p>
                        </div>

                        <div className="flex flex-col gap-1 bg-lime-200 bg-opacity-95 p-2 rounded-lg w-full md:w-[45%] lg:w-[40%]">
                            <h4 className='w-full text-left text-xl font-semibold'>Other Details</h4>
                            <hr className='w-full h-[3px]  bg-red-900' />
                            <p className='text-lg'>Occupier ID:
                                <span className='text-green-600 font-bold'> {
                                    // if room is occupied, show occupier id, else show 'none'
                                    roomData.Occupancy === 'occupied' ? (
                                        roomData.Occupant[0]?.id
                                    ) : (
                                        'none'
                                    )

                                }
                                </span>
                            </p>

                            <p className='text-lg'>Occupier Name:
                                <span className='text-green-600 font-bold'> {
                                    // if room is occupied, show occupier name, else show 'none'
                                    userData ? (
                                        userData?.username
                                    ) : (
                                        'none'
                                    )
                                }</span>
                            </p>

                            <p className='text-lg'>Occupier Email:
                                <span className='text-green-600 font-bold'> {
                                    // if userdata exists, show occupier email, else show 'none'
                                    userData ? (
                                        userData?.email
                                    ) : (
                                        'none'
                                    )
                                }</span>
                            </p>

                            <p className='text-lg'>Occupier Phone:
                                <span className='text-green-600 font-bold'>
                                    {
                                        // if userdata exists, show occupier phone, else show 'none'
                                        userData ? (
                                            // format phone number to look like 0700-000-000
                                            userData.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3")
                                        ) : (
                                            'none'
                                        )
                                    }</span>
                            </p>


                            <p className='text-lg'>Date Occupied:
                                <span className='text-green-600 font-bold'>
                                    {
                                        // if room is occupied, show date occupied, else show 'none'
                                        roomData.Occupancy === 'occupied' ? (
                                            roomData.Occupant[0]?.ApprovalDate
                                        ) : (
                                            'none'
                                        )
                                    }
                                </span>
                            </p>

                            <p className='text-lg'>Booked Duration:
                                <span className='text-green-600 font-bold'>
                                    {
                                        // if Occupancy is occupied, show booked duration, else show 'none'
                                        roomData.Occupancy === 'occupied' ? (
                                            roomData.Occupant[0]?.Duration
                                        ) : (
                                            'none'
                                        )
                                    }
                                </span>
                            </p>
                        </div>

                    </div>

                </div>
            </Suspense>
        </>

    )
}

export default RoomDetails