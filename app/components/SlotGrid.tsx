"use client";

interface Slot {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
}

interface Props {
  slots: Slot[];
  selectedSlot: string | null;
  setSelectedSlot: (id: string) => void;
}

export default function SlotGrid({
  slots,
  selectedSlot,
  setSelectedSlot,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {slots.map((slot) => {
        const isSelected =
          selectedSlot === slot.id;

        let bg =
          "bg-green-100 border-green-500";

        if (
          slot.status.toUpperCase() ===
          "BOOKED"
        ) {
          bg =
            "bg-red-100 border-red-500";
        }

        if (
          slot.status.toUpperCase() ===
          "RESERVED"
        ) {
          bg =
            "bg-yellow-100 border-yellow-500";
        }

        return (
          <button
            key={slot.id}
            disabled={
              slot.status.toUpperCase() !==
              "AVAILABLE"
            }
            onClick={() =>
              setSelectedSlot(slot.id)
            }
            className={`
              border rounded-lg p-4
              ${bg}
              ${
                isSelected
                  ? "ring-4 ring-green-500"
                  : ""
              }
            `}
          >
            <div className="font-semibold">
              {slot.start_time}
            </div>

            <div>
              {slot.end_time}
            </div>

            <div className="mt-2 text-sm capitalize">
              {slot.status}
            </div>
          </button>
        );
      })}
    </div>
  );
}