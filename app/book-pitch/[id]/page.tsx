"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { socket } from "@/app/lib/socket";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Navbar from "@/app/components/Navbar";
import SlotGrid from "@/app/components/SlotGrid";
import ReservationTimer from "@/app/components/ReservationTimer";
import BookingSummary from "@/app/components/BookingSummary";
import BookingModal from "@/app/components/BookingModal";

import api from "@/app/lib/api";

export default function BookPitchPage() {
  const params = useParams();

  const [date, setDate] = useState(new Date());

  const [pitch, setPitch] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);

  const [selectedSlot, setSelectedSlot] =
    useState<string | null>(null);

  const [reservationActive, setReservationActive] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
  fetchPitchData();

  const pitchId =
    params.id as string;

  socket.emit(
    "join-pitch",
    pitchId
  );

  socket.on(
    "slot-updated",
    () => {
      fetchPitchData();

      toast.success(
        "Slot availability updated"
      );
    }
  );

  return () => {
    socket.off(
      "slot-updated"
    );
  };
}, []);

  const fetchPitchData = async () => {
    try {
      const pitchId = params.id;

      const slotRes = await api.get(
        `/pitches/${pitchId}/slots`
      );

      setSlots(slotRes.data);

      const pitchRes = await api.get(
        "/pitches"
      );

      const selectedPitch =
        pitchRes.data.find(
          (p: any) => p.id === pitchId
        );

      setPitch(selectedPitch);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load pitch data"
      );
    }
  };

  const handleReserve = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const userId =
        JSON.parse(
          atob(
            token!.split(".")[1]
          )
        ).id;

      await api.post(
        "/bookings/reserve",
        {
          userId,
          slotId: selectedSlot,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setReservationActive(true);

      toast.success(
        "Slot reserved for 2 minutes"
      );

      fetchPitchData();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Reservation failed"
      );
    }
  };

  const handleConfirmBooking =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const userId =
          JSON.parse(
            atob(
              token!.split(".")[1]
            )
          ).id;

        await api.post(
  "/bookings/confirm",
  {
    userId,
    pitchId: pitch.id,
    slotId: selectedSlot,
    bookingDate:
      date.toISOString().split("T")[0],
  },
  {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  }
);

        toast.success(
          "Booking Confirmed"
        );

        setReservationActive(false);
        setSelectedSlot(null);
        setShowModal(false);

        fetchPitchData();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Booking failed"
        );
      }
    };

  const selectedSlotData =
    slots.find(
      (slot) =>
        slot.id === selectedSlot
    );

  return (
    <>
      <ProtectedRoute>
        <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-950 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">

                <h1 className="text-4xl font-bold text-white mb-2">
                  {pitch?.name || "Loading..."}
                </h1>

                <p className="text-gray-400 mb-8">
                  Select your preferred date and time slot.
                </p>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-3">
                    Select Date
                  </h2>

                  <DatePicker
                    selected={date}
                    onChange={(d) =>
                      setDate(d!)
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Available Slots
                  </h2>

                  <SlotGrid
                    slots={slots}
                    selectedSlot={
                      selectedSlot
                    }
                    setSelectedSlot={
                      setSelectedSlot
                    }
                  />
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">

                  <button
                    disabled={
                      !selectedSlot ||
                      reservationActive
                    }
                    onClick={
                      handleReserve
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Reserve Slot
                  </button>

                  <button
                    disabled={
                      !reservationActive
                    }
                    onClick={() =>
                      setShowModal(true)
                    }
                    className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Confirm Booking
                  </button>

                </div>
              </div>
            </div>

            <div className="space-y-6">

              {reservationActive && (
                <ReservationTimer
                  onExpire={() => {
                    setReservationActive(
                      false
                    );

                    setSelectedSlot(
                      null
                    );

                    toast.error(
                      "Reservation expired"
                    );
                  }}
                />
              )}

              <BookingSummary
                pitch={
                  pitch?.name || ""
                }
                date={date.toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
                slot={
                  selectedSlotData
                    ? `${selectedSlotData.start_time} - ${selectedSlotData.end_time}`
                    : "No Slot Selected"
                }
                price={
                  Number(
                    pitch?.price_per_hour
                  ) || 0
                }
              />

              <BookingModal
                isOpen={showModal}
                onClose={() =>
                  setShowModal(false)
                }
                onConfirm={
                  handleConfirmBooking
                }
                pitch={
                  pitch?.name || ""
                }
                date={date.toLocaleDateString(
                  "en-IN"
                )}
                slot={
                  selectedSlotData
                    ? `${selectedSlotData.start_time} - ${selectedSlotData.end_time}`
                    : "No Slot Selected"
                }
                price={
                  Number(
                    pitch?.price_per_hour
                  ) || 0
                }
              />

            </div>
          </div>
        </div>
      </div>
      </ProtectedRoute>
    </>
  );
}