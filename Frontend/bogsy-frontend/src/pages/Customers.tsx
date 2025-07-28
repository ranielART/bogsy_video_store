import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
type Customer = {
  id: string;
  first_name: string;
  last_name: string;
};

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFirstName, setAddFirstName] = useState("");
  const [addLastName, setAddLastName] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const openAddModal = () => {
    setAddFirstName("");
    setAddLastName("");
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddSave = async () => {
    if (!addFirstName.trim() || !addLastName.trim()) {
      alert("Please enter both first and last name.");
      return;
    }
    setAddLoading(true);
    try {
      const res = await axios.post("https://localhost:7063/api/Customer", {
        first_name: addFirstName,
        last_name: addLastName,
      });
      
      setCustomers((prev) => [...prev, res.data.data]);
      closeAddModal();
    } catch (error) {
      alert("Failed to add customer.");
    } finally {
      setAddLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching customers...");

    const fetchCustomers = async () => {
      try {
        const res = await axios.get("https://localhost:7063/api/Customer");
        console.log("Fetched Customers:", res.data.data);
        setCustomers(res.data.data || []);
      } catch (error) {
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [location.pathname]);

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setEditFirstName(customer.first_name);
    setEditLastName(customer.last_name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCustomer(null);
  };

  const handleEditSave = async () => {
    if (!editingCustomer) return;
    try {
      await axios.put(
        `https://localhost:7063/api/Customer/${editingCustomer.id}`,
        {
          first_name: editFirstName,
          last_name: editLastName,
        }
      );
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id
            ? { ...c, first_name: editFirstName, last_name: editLastName }
            : c
        )
      );
      closeModal();
    } catch (error) {
      alert("Failed to update customer.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 w-full h-full mt-20">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Customers</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={openAddModal}
        >
          Add Customer
        </button>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">First Name</th>
            <th className="py-2 px-4 border-b text-left">Last Name</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.first_name}</td>
              <td className="py-2 px-4 border-b">{customer.last_name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => openEditModal(customer)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {customers.length === 0 && (
        <div className="text-gray-500 mt-4">No customers found.</div>
      )}

      {modalOpen && editingCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h3 className="text-xl font-bold mb-4">Edit Customer</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                className="border px-2 py-1 w-full rounded"
                value={editFirstName}
                onChange={(e) => setEditFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                className="border px-2 py-1 w-full rounded"
                value={editLastName}
                onChange={(e) => setEditLastName(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h3 className="text-xl font-bold mb-4">Add Customer</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                className="border px-2 py-1 w-full rounded"
                value={addFirstName}
                onChange={(e) => setAddFirstName(e.target.value)}
                disabled={addLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                className="border px-2 py-1 w-full rounded"
                value={addLastName}
                onChange={(e) => setAddLastName(e.target.value)}
                disabled={addLoading}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={closeAddModal}
                disabled={addLoading}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleAddSave}
                disabled={addLoading}
              >
                {addLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Customers;
