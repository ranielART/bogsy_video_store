import React, { useEffect, useState } from "react";
import axios from "axios";

type VideoInventory = {
  id: string;
  video_name: string;
  quantity: number;
  rented_quantity: number;
};

const Report = () => {
  const [inventory, setInventory] = useState<VideoInventory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7063/api/ReportInventory/video-inventory"
        );
        setInventory(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch video inventory", error);
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 w-full h-full mt-20">
      <h2 className="text-2xl font-bold mb-4">Video Inventory Report</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Video Name</th>
            <th className="py-2 px-4 border-b text-left">In</th>
            <th className="py-2 px-4 border-b text-left">Out</th>
            <th className="py-2 px-4 border-b text-left">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {[...inventory]
            .sort((a, b) => a.video_name.localeCompare(b.video_name))
            .map((video) => {
              const totalQuantity = video.quantity + video.rented_quantity;
              return (
                <tr key={video.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{video.video_name}</td>
                  <td className="py-2 px-4 border-b">{video.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    {video.rented_quantity}
                  </td>
                  <td className="py-2 px-4 border-b">{totalQuantity}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {inventory.length === 0 && (
        <div className="text-gray-500 mt-4">No inventory data found.</div>
      )}
    </div>
  );
};

export default Report;
