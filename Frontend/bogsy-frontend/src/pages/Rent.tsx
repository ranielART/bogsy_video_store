import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Video = {
  id: string;
  video_name: string;
  video_type: string;
  rent_days?: number | null;
  video_price: number;
  isActive: boolean;
  quantity: number;
};

type Customer = {
  id: string;
  first_name: string;
  last_name: string;
};

const Rent = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [rentQuantity, setRentQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [renting, setRenting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching video and customers...");
    const fetchData = async () => {
      try {
        // Fetch video details
        const videoRes = await axios.get(
          `https://localhost:7063/api/Video/${id}`
        );
        setVideo(videoRes.data.data);

        // Fetch customers
        const customerRes = await axios.get(
          "https://localhost:7063/api/Customer"
        );
        setCustomers(customerRes.data.data || []);
      } catch (error) {
        setVideo(null);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRent = async () => {
    if (!customerId || !rentDate || !returnDate || !video) {
      alert("Please fill all fields.");
      return;
    }
    setRenting(true);
    try {
      await axios.post("https://localhost:7063/api/Rent/rent-video", {
        customer_id: customerId,
        video_id: video.id,
        rent_date: rentDate,
        return_date: returnDate,
        rent_quantity: rentQuantity,
      });
      alert("Video rented successfully!");
      navigate("/rentals");
      // Optionally redirect or reset form here
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to rent video. Please check your input."
      );
    } finally {
      setRenting(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!video) return <div className="p-4 text-red-500">Video not found.</div>;

  return (
    <div className="p-8 w-full h-full mt-20 max-w-lg mx-auto bg-slate-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Rent Video</h2>
      <div className="mb-4 p-4 bg-white rounded flex flex-col gap-y-2">
        <div>
          <strong>Name:</strong> {video.video_name}
        </div>
        <div>
          <strong>Type:</strong> {video.video_type}
        </div>
        <div>
          <strong>Available Quantity:</strong> {video.quantity}
        </div>
        <div>
          <strong>Price per Day:</strong> {video.video_price}
        </div>
        <div>
          <strong>Max Rent Days:</strong> {video.rent_days ?? 3}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Customer</label>
        <select
          className="border px-2 py-2 w-full rounded bg-white"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={renting}
        >
          <option value="">Select customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.first_name} {c.last_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium ">Rent Date</label>
        <input
          type="date"
          className="border px-2 py-2 w-full rounded bg-white"
          value={rentDate}
          onChange={(e) => setRentDate(e.target.value)}
          disabled={renting}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Return Date</label>
        <input
          type="date"
          className="border px-2 py-2 w-full rounded bg-white"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          disabled={renting}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          type="number"
          className="border px-2 py-2 w-full rounded bg-white"
          value={rentQuantity}
          min={1}
          max={video.quantity}
          onChange={(e) => setRentQuantity(Number(e.target.value))}
          disabled={renting}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleRent}
          disabled={renting}
        >
          {renting ? "Renting..." : "Rent"}
        </button>
      </div>
    </div>
  );
};

export default Rent;
