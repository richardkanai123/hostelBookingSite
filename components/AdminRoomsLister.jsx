"use client";

import Link from "next/link";
// use context to get the rooms
import { TiTick } from "react-icons/ti";

import React, { Suspense } from "react";
import { MdDoNotDisturbOn } from "react-icons/md";
import { BsHouseCheck, BsHouseLockFill } from "react-icons/bs";
// toastify
import { toast } from "react-toastify";
// toastify css
import "react-toastify/dist/ReactToastify.css";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/utils/Firebase/Firebase";

const AdminRoomsLister = ({ RoomsList }) => {
    // handle vacate room
    const handleVacate = async (id) => {
        // roomRef
        const roomRef = doc(db, "rooms", id);
        // get the doc and see if it's vacant
        const docSnap = await getDoc(roomRef);
            if (docSnap.data().Occupancy === "vacant") {
                toast.error("Room is already vacant"),
                {
                    position: "top-center",
                    autoClose: 1000,
                };
                return false;
            }
        else {
            // update the room
            updateDoc(roomRef, {
                Occupancy: "vacant",
                Booked: false,
                Occupant: [],
                lastVacated: new Date().toLocaleDateString()
            })
                .then(() => {
                    toast.loading("Vacating room...", {
                        position: "top-center",
                        autoClose: 1000,

                    });
                })
                .then(() => {
                    // close the toast
                    toast.dismiss();
                    toast.success(`Room ${id} has been vacated`),
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                    };
                })

                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    if (!RoomsList)
        return <p className="text-center font-bold text-xl">There are no rooms</p>;

    if (RoomsList.length > 0)
        return (
            // div with a hidden scrollbar for the rooms list
            <div
                className="w-full flex flex-col justify-between max-h-[200px] overflow-y-auto
            scrollbar-hide"
            >
                {/* table of rooms */}
                <table className="relative w-full table-auto border border-collapse rounded-md p-1 text-center">
                    <thead className="w-full  text-gray-600 uppercase text-sm p-4 border-b-2 border-separate ">
                        <tr>
                            <th className="p-1">Room</th>
                            <th className="p-1">Type</th>
                            <th className="p-1">Price</th>
                            <th className="p-1">Status</th>
                            <th className="p-1">Booked</th>
                            <th className="p-1">Prev Vacate</th>
                            {/* vacate room */}
                            <th className="p-1">Vacate</th>
                        </tr>
                    </thead>
                    <tbody className="text-center items-center">
                        <Suspense fallback={<div>Loading...</div>}>
                            {RoomsList.map((room) => (
                                <tr key={room.id} className="p-2 border-b border-zinc-600">
                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        <Link
                                            className="w-full p-1 hover:text-rose-600"
                                            href={`/Room/${room.id}`}
                                        >
                                            {room.id}
                                        </Link>
                                    </td>
                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        {room.Type}
                                    </td>
                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        {room.Price}
                                    </td>
                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        {room.Occupancy === "vacant" ? (
                                            <p className=" text-green-500 mx-auto">
                                                <BsHouseCheck />
                                            </p>
                                        ) : (
                                            <p className=" text-red-800 mx-auto">
                                                <BsHouseLockFill />
                                            </p>
                                        )}
                                    </td>
                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        {room.Booked === true ? (
                                            <p className=" text-lg  text-green-500 mx-auto">
                                                <TiTick />
                                            </p>
                                        ) : (
                                            <p className=" text-lg  text-yellow-500 mx-auto">
                                                <MdDoNotDisturbOn />
                                            </p>
                                        )}
                                    </td>

                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        {
                                            room.lastVacated ? (
                                                room.lastVacated
                                            ) : (
                                                "N/A"
                                            )
                                        }
                                    </td>

                                    <td className="p-1 font-semibold text-base border-r border-zinc-600">
                                        <button
                                            className="w-full p-1 hover:text-rose-600"
                                            onClick={() => {
                                                toast(
                                                    <div className="flex flex-col justify-center items-center">
                                                        <p className="text-lg font-semibold">Vacate Room</p>
                                                        <p className="text-sm">
                                                            Are you sure you want to vacate room {room.id}?
                                                        </p>
                                                        <div className="flex justify-center items-center">
                                                            <button
                                                                className="bg-green-500 hover:bg-green-600 text-white font-semibold p-1 m-1 rounded-md"
                                                                onClick={() => {
                                                                    toast.dismiss();
                                                                    handleVacate(room.id);
                                                                }}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold p-1 m-1 rounded-md"
                                                                onClick={() => {
                                                                    toast.dismiss();
                                                                    toast.info(
                                                                        `Room ${room.id} has not been vacated`
                                                                    );
                                                                }}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                ),
                                                {
                                                    position: "top-center",
                                                    //    no auto close
                                                    autoClose: 3000,
                                                    hideProgressBar: true,
                                                };
                                            }}
                                        >
                                            Vacate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </Suspense>
                    </tbody>
                </table>
            </div>
        );
};

export default AdminRoomsLister;
