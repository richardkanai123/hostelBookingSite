import { db } from "@/app/utils/Firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import {AiFillDelete} from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAllBookingsLister = ({ BookingsList }) => {

    const handleDeleteBooking = async (BookingId) => { 
        // delete the booking doc from firestore
        const bookingRef = doc(db, "bookings", BookingId);
        await deleteDoc(bookingRef)
            .then(() => {
              toast.success("Past Booking Deleted"), {

                position: "top-center",
                autoClose: 2000,
                };
            }
        )
            .catch((error) => {
                toast.error(error.message);
            }
        );
    }


  if (!BookingsList || BookingsList.length === 0)
    return (
      <p className="text-center font-bold text-xl">
        There are no past bookings!
      </p>
    );

  if (BookingsList.length > 0)
    return (
      <div className="flex flex-col justify-around ">


        {BookingsList.map((booking) => (
          <div
                key={booking.id}
                // give classname based on status
                className={`flex justify-around border-2 border-gray-300 rounded-md p-2 m-2 ${
                    booking.Status === "cancelled" ? "bg-red-100" : "bg-green-100"
                }`}
          >
            <p className="text-sm">{booking.RoomNumber}</p>
                <p className="text-sm">{booking.studentID}</p>
                {
                    booking.Status === "cancelled" ? (
                        <p className="text-sm text-red-500">{booking.Status}</p>
                    ) : (
                        <p className="text-sm">{booking.Status}</p>
                    )

                }
                <p className="text-sm">{booking.Duration}</p>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                        handleDeleteBooking(booking.id);
                    }}
                >
                    <AiFillDelete />
                </button>

          </div>
        ))}
      </div>
    );
};

export default AdminAllBookingsLister;
