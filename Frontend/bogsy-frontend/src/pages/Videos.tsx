import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type Video = {
  id: string;
  video_name: string;
  video_type: string;
  rent_days?: number | null;
  video_price: number;
  isActive: boolean;
  quantity: number;
  rentals?: any;
};

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");

  const [editLoading, setEditLoading] = useState(false);
  const [editQuantity, setEditQuantity] = useState<number | "">("");


  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addType, setAddType] = useState("");
  const [addQuantity, setAddQuantity] = useState<number | "">("");
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("https://localhost:7063/api/Video");
        setVideos(res.data.data || []);
      } catch (error) {
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [addLoading, editLoading]);

  const openEditModal = (video: Video) => {
    setEditingVideo(video);
    setEditName(video.video_name);
    setEditType(video.video_type);
    setEditQuantity(video.quantity);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingVideo(null);
  };

  const handleEditSave = async () => {
    if (!editingVideo) return;
    setEditLoading(true); 
    try {
      await axios.put(`https://localhost:7063/api/Video/${editingVideo.id}`, {
        video_name: editName,
        video_type: editType,
        rent_days: 3,
        quantity: Number(editQuantity),
        isActive: true,
      });
      setVideos((prev) =>
        prev.map((v) =>
          v.id === editingVideo.id
            ? {
                ...v,
                video_name: editName,
                video_type: editType,
                rent_days: 3,
                quantity: Number(editQuantity),
              }
            : v
        )
      );
      closeEditModal();
    } catch (error) {
      alert("Failed to update video.");
    } finally {
      setEditLoading(false);
    }
  };

  const openAddModal = () => {
    setAddName("");
    setAddType("");
    setAddQuantity("");
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddSave = async () => {
    if (
      !addName.trim() ||
      !addType.trim() ||
      addQuantity === ""
    ) {
      alert("Please fill all required fields.");
      return;
    }
    setAddLoading(true);
    try {
      const res = await axios.post("https://localhost:7063/api/Video", {
        video_name: addName,
        video_type: addType,
        rent_days: 3,
        quantity: Number(addQuantity),
        isActive: true,
      });
      setVideos((prev) => [...prev, res.data.data]);
      closeAddModal();
    } catch (error) {
      alert("Failed to add video.");
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-8 w-full h-full mt-20">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={openAddModal}
        >
          Add Video
        </button>
      </div>
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Type</th>

            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Quantity</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{video.video_name}</td>
              <td className="py-2 px-4 border-b">{video.video_type}</td>

              <td className="py-2 px-4 border-b">{video.video_price}</td>
              <td className="py-2 px-4 border-b">{video.quantity}</td>
              <td className="py-2 px-4 border-b ">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-3"
                  onClick={() => openEditModal(video)}
                >
                  Edit
                </button>
                <Link
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  to={`/rent/${video.id}`}
                >
                  Rent
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {videos.length === 0 && (
        <div className="text-gray-500 mt-4">No videos found.</div>
      )}

      {editModalOpen && editingVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h3 className="text-xl font-bold mb-4">Edit Video</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                className="border px-2 py-1 w-full rounded"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                className="border px-2 py-1 w-full rounded"
                value={editQuantity}
                onChange={(e) =>
                  setEditQuantity(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                min={0}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Type</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="editType"
                    value="DVD"
                    checked={editType === "DVD"}
                    onChange={() => setEditType("DVD")}
                  />{" "}
                  DVD
                </label>
                <label>
                  <input
                    type="radio"
                    name="editType"
                    value="VCD"
                    checked={editType === "VCD"}
                    onChange={() => setEditType("VCD")}
                  />{" "}
                  VCD
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={closeEditModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={handleEditSave}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

   
      {addModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg min-w-[300px]">
            <h3 className="text-xl font-bold mb-4">Add Video</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                className="border px-2 py-1 w-full rounded"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                disabled={addLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                className="border px-2 py-1 w-full rounded"
                value={addQuantity}
                onChange={(e) =>
                  setAddQuantity(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                min={0}
                disabled={addLoading}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Type</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    name="addType"
                    value="DVD"
                    checked={addType === "DVD"}
                    onChange={() => setAddType("DVD")}
                    disabled={addLoading}
                  />{" "}
                  DVD
                </label>
                <label>
                  <input
                    type="radio"
                    name="addType"
                    value="VCD"
                    checked={addType === "VCD"}
                    onChange={() => setAddType("VCD")}
                    disabled={addLoading}
                  />{" "}
                  VCD
                </label>
              </div>
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

export default Videos;
