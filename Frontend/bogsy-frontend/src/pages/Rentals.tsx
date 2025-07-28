import React, { useEffect, useState } from "react";
import axios from "axios";

type Rental = {
  rental_id: string;
  rent_date: string;
  return_date: string;
  rent_quantity: number;
  total_price: number;

  is_returned: boolean;
  customer: {
    id: string;
    name: string;
  };
  video: {
    id: string;
    name: string;
    quantity: number;
  };
};

const Rentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [returnLoading, setReturnLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7063/api/Rent/unreturned-rentals"
        );
        setRentals((res.data.data || []).filter((r: Rental) => !r.is_returned));
      } catch (error) {
        setRentals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, [returnLoading]);

  const openReturnModal = (rental: Rental) => {
    setSelectedRental(rental);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setReturnModalOpen(true);
  };

  const closeReturnModal = () => {
    setReturnModalOpen(false);
    setSelectedRental(null);
  };

  const handleReturn = async () => {
    if (!selectedRental) return;
    setReturnLoading(true);
    try {
      await axios.put(
        `https://localhost:7063/api/Rent/return/${selectedRental.rental_id}`,
        {
          actual_return_date: new Date(selectedDate).toISOString(), // "YYYY-MM-DDT00:00:00.000Z"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      closeReturnModal();
    } catch (error) {
      alert("Failed to return video.");
    } finally {
      setReturnLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 w-full h-full mt-20">
      <h2 className="text-2xl font-bold mb-4">Unreturned Rentals</h2>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Customer</th>
            <th className="py-2 px-4 border-b text-left">Video</th>
            <th className="py-2 px-4 border-b text-left">Rent Date</th>
            <th className="py-2 px-4 border-b text-left">Return Date</th>
            <th className="py-2 px-4 border-b text-left">Rented Quantity</th>
            <th className="py-2 px-4 border-b text-left">Total Price</th>

            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.rental_id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{rental.customer?.name}</td>
              <td className="py-2 px-4 border-b">{rental.video?.name}</td>
              <td className="py-2 px-4 border-b">
                {new Date(rental.rent_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(rental.return_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{rental.rent_quantity}</td>
              <td className="py-2 px-4 border-b">{rental.total_price}</td>

              <td className="py-2 px-4 border-b">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => openReturnModal(rental)}
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rentals.length === 0 && (
        <div className="text-gray-500 mt-4">No rentals found.</div>
      )}

      {/* Return Modal */}
      {returnModalOpen && selectedRental && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h3 className="text-xl font-bold mb-4">Return Video</h3>

            <div className="mb-4">
              <label
                htmlFor="returnDate"
                className="block text-sm font-medium mb-1"
              >
                Select Return Date:
              </label>
              <input
                id="returnDate"
                type="date"
                className="border p-2 rounded w-full"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={selectedRental.rent_date.split("T")[0]}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={closeReturnModal}
                disabled={returnLoading}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={handleReturn}
                disabled={returnLoading}
              >
                {returnLoading ? "Returning..." : "Return"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rentals;
