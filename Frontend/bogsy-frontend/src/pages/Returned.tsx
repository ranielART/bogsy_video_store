import React, { useEffect, useState } from "react";
import axios from "axios";

type Rental = {
  rental_id: string;
  rent_date: string;
  date_returned: string;
  return_date: string;
  rent_quantity: number;
  overdue_days: number;
  total_price: number;
  overdue_price: number;
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

const Returned = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  //   const [returnModalOpen, setReturnModalOpen] = useState(false);
  //   const [selectedRental, setSelectedRental] = useState<Rental | null>(null);
  const [returnLoading, setReturnLoading] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7063/api/Rent/returned-rentals"
        );
        setRentals((res.data.data || []).filter((r: Rental) => r.is_returned));
      } catch (error) {
        setRentals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, [loading]);

  //   const openReturnModal = (rental: Rental) => {
  //     setSelectedRental(rental);
  //     setReturnModalOpen(true);
  //   };

  //   const closeReturnModal = () => {
  //     setReturnModalOpen(false);
  //     setSelectedRental(null);
  //   };

  //   const handleReturn = async () => {
  //     if (!selectedRental) return;
  //     setReturnLoading(true);
  //     try {
  //       await axios.put(
  //         `https://localhost:7063/api/Rent/return/${selectedRental.rental_id}`
  //       );
  //       closeReturnModal();
  //     } catch (error) {
  //       alert("Failed to return video.");
  //     } finally {
  //       setReturnLoading(false);
  //     }
  //   };

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
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Date Returned</th>
            <th className="py-2 px-4 border-b text-left">Overdue Days</th>
            <th className="py-2 px-4 border-b text-left">Overdue Price</th>
            
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
                {new Date(rental.date_returned).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b">{rental.overdue_days}</td>
              <td className="py-2 px-4 border-b">{rental.overdue_price}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {rentals.length === 0 && (
        <div className="text-gray-500 mt-4">No unreturned rentals found.</div>
      )}
    </div>
  );
};

export default Returned;
