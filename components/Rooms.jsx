// rooms table
'use client'
import Link from 'next/link';
import React, { Suspense } from 'react';
import {FaBed} from 'react-icons/fa';
const Rooms = ({RoomsList}) => {


    // set bg depending on the booking status
    const setBg = (bookstatus) => {
        if (bookstatus) {
            return 'bg-red-500'
        } else {
            return 'bg-lime-400'
        }
    }

    return (
            <table className='w-screen text-cyan-800 table-auto border border-collapse rounded-md p-1 mt-2'>
                <thead
                    // tailwindcss style table header
                    className='
                    text-gray-600
                    uppercase
                    text-sm
                    p-4
                    '>
                    <tr
                        className='p-2 border-b-2 border-zinc-700'
                    >
                    <th>Room</th>
                    <th
                        
                        onClick={() => {
                            console.log('clicked');
                            // sort by type and re-render the table
                            RoomsList.sort((a, b) => {
                                if (a.Type < b.Type) {
                                    return -1;
                                }
                                if (a.Type > b.Type) {
                                    return 1;
                                }
                                return 0;
                            }
                            );

                         }}
                    >Type</th>
                    <th
                        onClick={() => {
                            console.log('clicked');
                            // sort by occupancy and re-render the table
                            RoomsList.sort((a, b) => {
                                if (a.Occupancy < b.Occupancy) {
                                    return -1;
                                }
                                if (a.Occupancy > b.Occupancy) {
                                    return 1;
                                }
                                return 0;
                            }
                            );

                         }
                        }
                    >Occupancy</th>
                    <th
                        onClick={() => { 
                            console.log('clicked');
                            // sort by price and re-render the table
                            RoomsList.sort((a, b) => {
                                if (a.Price < b.Price) {
                                    return -1;
                                }
                                if (a.Price > b.Price) {
                                    return 1;
                                }
                                return 0;
                            }
                            );

                         }
                        }
                    >Price</th>
                    <th
                        onClick={() => { 
                            console.log('clicked');
                            // sort by booking status and re-render the table
                            RoomsList.sort((a, b) => {
                                if (a.Booked < b.Booked) {
                                    return -1;
                                }
                                if (a.Booked > b.Booked) {
                                    return 1;
                                }
                                return 0;
                            }
                            );

                         }
                        }
                    >Booked</th>
                    </tr>
                </thead>
            <tbody>
                {/* suspense when the roomlist is loading */}
                <Suspense fallback={<div>Loading...</div>}>
                    {RoomsList.map((room) => (
                        <tr key={room.id} className="p-2 border-b border-zinc-600">
                            <td className='p-1 font-semibold text-base border-r border-zinc-600'>
                                <Link className='w-full p-1 hover:text-rose-600' href={`/Room/${room.id}`} >{room.id}</Link>
                            </td>
                            <td className='p-1 flex align-middle justify-center
                             font-semibold text-base border-r border-zinc-600 gap-1'>{
                                room.Type === "single" ?
                                    <FaBed className='text-xl text-cyan-500' /> :
                                    <span className='text-xl  gap-1  flex items-center align-middle justify-center w-full'>
                                        <FaBed className=' text-cyan-800 ' />
                                        <FaBed className='  text-cyan-800'/>
                                    </span>
                            }</td>
                            <td className='p-1 font-semibold text-base border-r border-zinc-600'>{room.Occupancy}</td>
                            <td className='p-1 font-semibold text-base border-r border-zinc-600'>{`Ksh.${room.Price}`}</td>
                            <td className={`p-1 font-semibold text-base  ${setBg(room.Booked)}`}>{room.Booked ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </Suspense>
                </tbody>
            </table>

    );
}
    
export default Rooms;