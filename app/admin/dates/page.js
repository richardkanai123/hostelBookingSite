'use client'

import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth } from "@/app/utils/Firebase/Firebase"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

// toastify
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Page = () => {

    useEffect(() => {
        document.title = "Admin | Booking"

        // get sem and year end date from firestore in settings collection

        const getSemEndDate = async () => {
            const ref = doc(db, "settings", "semester")
            const docSnap = await getDoc(ref)
            if (docSnap.exists()) {
                setCurrentSemEndDate(docSnap.data().date)
            }

        }

        const getYearEndDate = async () => {
            const ref = doc(db, "settings", "year")
            const docSnap = await getDoc(ref)
            if (docSnap.exists()) {
                setCurrentYearEndDate(docSnap.data().date)
            }

        }

        getSemEndDate()
        getYearEndDate()

    }, [])

    const [user] = useAuthState(auth)

    const [semester, setSemester] = useState("")
    const [year, setYear] = useState("")

    const [currentSemEndDate, setCurrentSemEndDate] = useState("Loading...")
    const [currentYearEndDate, setCurrentYearEndDate] = useState("loading...")

    const UpdateNewSemesterDate = async (date) => {
        // update semester end date on firestore

        if (!date || date === null) return {
            toast: toast.error("Please enter a valid date")
        }
        else
            if (date) {
                const ref = collection(db, "settings")
                await setDoc(doc(ref, "semester"), {
                    date: date
                })
                    .then(() => {
                        // update the current semester end date
                        setCurrentSemEndDate(date)
                        toast.success(`Semester end date updated to ${date}`)

                        // clear the input field
                        setSemester("")
                    }
                    )
                    .catch((err) => {
                        toast.error(err.message)
                    }
                    )
            }
    }


    const updateNewYearDate = async (date) => {
        // update year end date on firestore

        if (!date || date === null) return {
            toast: toast.error("Please enter a valid date")
        }
        else
            if (date) {
                const ref = collection(db, "settings")
                await setDoc(doc(ref, "year"), {
                    date: date
                })
                    .then(() => {
                        // update the current year end date
                        setCurrentYearEndDate(date)
                        toast.success(`Year end date updated to ${date}`)
                        // clear the input field
                        setYear("")
                    }
                    )
                    .catch((err) => {
                        toast.error(err.message)
                    }
                    )
            }

    }



    if (!user) return (
        <div className="w-full h-full flex flex-wrap justify-center items-center  gap-4 mix-blend-color-overlay ">
            <h1 className="text-4xl font-bold text-red-500">You are not signed in</h1>
        </div>
    )

    return (
        // here the admin can set or change the semester and the year day and time for vacating the hostel
        <div className="w-full h-full flex flex-wrap justify-center items-center  gap-4 mix-blend-color-overlay ">

            {/* cards showing sem and year end date and form for setting the two */}
            <div className="w-[80%] md:w-[40%] flex flex-col flex-wrap justify-center items-center bg-lime-200 rounded-md shadow-md p-2  ">
                <h4 className="font-bold text-sky-500">
                    Current Semester End Date: <span className="text-red-500">{currentSemEndDate}</span>

                </h4>
                <hr className="w-full bg-zinc-900 h-[2px]" />

                {/* form for setting the semester end date
                 */}

                <form className="w-full flex gap-2 flex-col justify-center items-center">
                    <label className="w-full font-semibold">Set Semester End Date</label>
                    <input
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-[75%] text-white rounded-md shadow-sm bg-green-400 font-semibold p-2 ring-0 outline-none border-0 hover:bg-opacity-80 active:shadow-lg text-center
                     " />
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            UpdateNewSemesterDate(semester)
                        }}
                        type="submit"
                        className="w-[70px] bg-green-600 hover:bg-opacity-75 text-white font-semibold p-2 rounded-md shadow-sm ">Set</button>
                </form>
            </div>

            <div className="w-[80%] md:w-[40%] flex flex-col flex-wrap justify-center items-center bg-lime-200 rounded-md shadow-md p-2 ">
                <h4 className="font-bold text-sky-500">
                    Current Year End Date: <span className="text-red-500">
                        {currentYearEndDate}
                    </span>

                </h4>
                <hr className="w-full bg-zinc-900 h-[2px]" />

                {/* form for setting the semester end date
                 */}

                <form className="w-full flex gap-2 flex-col justify-center items-center">
                    <label className="w-full font-semibold">Set Year End Date</label>
                    <input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        type="date"
                        className="w-[75%] text-white rounded-md shadow-sm bg-green-400 font-semibold p-2 ring-0 outline-none border-0 hover:bg-opacity-80 active:shadow-lg text-center " />
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            updateNewYearDate(year)
                        }}
                        type="submit"
                        className="w-[70px] bg-green-600 hover:bg-opacity-75 text-white font-semibold p-2 rounded-md shadow-sm ">Set</button>
                </form>
            </div>

            <ToastContainer />

        </div>
    )
}
export default Page