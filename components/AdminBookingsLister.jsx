import { db } from "@/app/utils/Firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { FcApproval, FcCancel } from "react-icons/fc";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminBookingsLister = ({ BookingsList }) => {
  // approve or reject booking
  const handleBookingAction = async (
    BookingId,
    RoomNumber,
    StudentID,
    Duration,
    BookDate,
    task
  ) => {
    // booking doc ref
    const bookingRef = doc(db, "bookings", BookingId);
    // booked room doc ref
    const roomRef = doc(db, "rooms", RoomNumber);

    // take action depending on task
    if (task === "approve") {
      // update booking status
        try {
                  await updateDoc(bookingRef, {
        ApprovalDate: new Date().toLocaleDateString(),
        Status: "approved",
      })
        .then(() => {
          // update room status
          updateDoc(roomRef, {
            Booked: false,
            Occupancy: "occupied",
            Occupant: [
              {
                id: StudentID,
                ApprovalDate: new Date().toLocaleString(),
                BookedOn: BookDate,
                Duration: Duration,
              },
            ],
          }).then(() => {
            toast.success("Booking Approved");
          });
        })
        }
        catch(error)  {
          toast.error(error.message);
        }
    } else if (task === "cancel") {
      // update booking status to cancelled then update room Booked to false
      await updateDoc(
        bookingRef,
        {
          CancellationDate: new Date().toLocaleDateString(),
          Status: "cancelled",
        },
        { merge: true }
      )
        .then(() => {
          // update room status
          updateDoc(
            roomRef,
            {
              Booked: false,
            },
            { merge: true }
          ).then(() => {
            toast.success("Booking Cancelled");
          });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  if (!BookingsList || BookingsList.length === 0)
    return (
      <p className="text-center font-bold text-xl">
        There are no pending bookings
      </p>
    );

  if (BookingsList.length > 0)
    return (
      <div className="flex flex-col justify-around">
        {/* header */}
        <div className="flex flex-row justify-around align-middle items-center p-1 border-b-2 border-gray-300 scrollbar-hide ">
          <p className="text-sm font-semibold mx-auto">Room</p>
          <p className="text-sm font-semibold mx-auto">Student</p>
          <p className="text-sm font-semibold mx-auto">Date Booked</p>
          <p className="text-sm font-semibold mx-auto">Duration</p>
          <p className="text-sm font-semibold mx-auto">Action</p>
        </div>

        {BookingsList.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-row justify-around align-middle items-center p-1 border-b-2 border-gray-300   hover:bg-gray-100 scrollbar-hide "
          >
            <p className="text-sm">{booking.RoomNumber}</p>
            <p className="text-sm">{booking.studentID}</p>
            <p className="text-sm">{booking.BookedOn}</p>
            <p className="text-sm">{booking.Duration}</p>
            {/* approve or cancel */}
            <div className="flex flex-row justify-around gap-1 align-middle items-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  handleBookingAction(
                    booking.id,
                    booking.RoomNumber,
                    booking.studentID,
                    booking.Duration,
                    booking.BookedOn,
                    "approve"
                  );
                }}
              >
                <FcApproval />
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => {
                  handleBookingAction(
                    booking.id,
                    booking.RoomNumber,
                    booking.studentID,
                    booking.Duration,
                    booking.BookedOn,
                    "cancel"
                  );
                }}
              >
                <FcCancel />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
};

export default AdminBookingsLister;
