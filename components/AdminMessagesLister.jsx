"use client";

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

import { AiFillDelete } from "react-icons/ai";

import { db } from "@/app/utils/Firebase/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminMessagesLister = () => {
  // message list
  const [messages, setMessages] = useState([]);

  // async function to get messages
  const getMessages = async () => {
    const messagesColRef = collection(db, "messages");
    const unsub = onSnapshot(messagesColRef, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
        setMessages(messagesList);
    });

    return unsub;
  };

    useEffect(() => {
    // get messages
    getMessages();
  }, []);

  return (
    <Accordion>
      {
        //   check if there are messages
        messages.length > 0 ? (
          messages.map((item) => (
            <AccordionItem key={item.id}>
              <AccordionItemHeading>
                <AccordionItemButton
                  // change background color depending on status
                  className={`${
                    item.status === "unread"
                      ? "bg-yellow-900 text-green-400 dark:text-white dark:bg-gray-800"
                      : "bg-green-700 text-gray-800 dark:bg-gray-400 dark:text-gray-800"
                  }`}
                >
                  {item.Subject}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="w-full flex flex-col items-center align-middle justify-center gap-1 p-2">
                  <div className="w-full">
                    <div className="w-full mb-2 flex flex-row items-center justify-between">
                      <span className="text-xs font-extralight text-green-300 dark:text-gray-800">
                        Time: {item.time}
                      </span>
                      <span className="text-xs font-extralight text-green-300 dark:text-gray-800">
                        By: {item.IDNo} - {item.name}{" "}
                      </span>

                      {/* mark as read */}
                      {item.status === "unread" ? (
                        <button
                          // onClick update status to read on db
                          onClick={async () => {
                            //   update the doc status to read
                            const docRef = doc(db, "messages", item.id);
                            await updateDoc(docRef, {
                              status: "read",
                            })
                              .then(() => {
                                toast.success("Message marked as read");
                              })
                              .catch((error) => {
                                toast.error(error.message);
                              });
                          }}
                          className="text-sm bg-teal-900 text-green-400 dark:text-white dark:bg-gray-800 px-2 py-1 rounded-md hover:bg-green-400 hover:text-gray-800 dark:hover:bg-gray-400 dark:hover:text-gray-800"
                        >
                          Mark as read
                        </button>
                      ) : (
                        <button
                          // delete message from db
                                              onClick={async () => { 
                            //   delete the doc from db
                                                  const docRef = doc(db, "messages", item.id);
                                                  await deleteDoc(docRef)
                                                      .then(() => {
                                                            toast.info("Message deleted");
                                                      }
                                                  )
                                                      .catch((error) => {
                                                            toast.error(error.message);
                                                      }
                                                    );
                                                
                                                  
                            }}                    
                          className="text-sm bg-red-900 text-green-400 dark:text-white dark:bg-gray-800 px-2 py-1 rounded-md hover:bg-green-400 hover:text-gray-800 dark:hover:bg-gray-400 dark:hover:text-gray-800"
                        >
                          <AiFillDelete className="text-xl" />
                        </button>
                      )}
                    </div>

                    <div className="w-full p-1">
                        <p className="text-sm text-green-400 dark:text-gray-800 w-full text-justify">
                      {item.message}
                    </p>
                   </div>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))
        ) : (
          <div className="text-center">
            <h1 className="text-2xl">No Messages</h1>
          </div>
        )
      }
    </Accordion>
  );
};

export default AdminMessagesLister;
