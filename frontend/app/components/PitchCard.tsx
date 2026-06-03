import Link from "next/link";
import { Pitch } from "../types/pitch";

interface Props {
  pitch: Pitch;
}

export default function PitchCard({ pitch }: Props) {
  return (
    <Link href={`/book-pitch/${pitch.id}`}>
      <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition cursor-pointer">
        <h2 className="font-bold text-xl">
          {pitch.name}
        </h2>

        <p>{pitch.location}</p>

        <p className="mt-2 text-green-600">
          ₹{pitch.price_per_hour}/hour
        </p>
      </div>
    </Link>
  );
}