import "./ManageTours.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const ManageTours = () => {
    const [tours, setTours] = useState([]);
    const [tour, setTour] = useState({
        title: '',
        description: '',
        price: '',
        status: 'ACTIVE',
        regionId: '',
        cityId: '',
        photoPath: '',
    });
    const [editingTourId, setEditingTourId] = useState(null);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchTours();
        fetchRegions();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/tours`);
            setTours(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const fetchRegions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/regions`);
            setRegions(response.data);
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    };

    const fetchCities = async (regionId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cities/admin/by-region/${regionId}`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTour({ ...tour, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleRegionChange = (e) => {
        const regionId = e.target.value;
        setTour({ ...tour, regionId, cityId: '' }); // Reset city when region changes
        fetchCities(regionId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', tour.title);
        formData.append('description', tour.description);
        formData.append('price', tour.price);
        formData.append('status', tour.status);
        formData.append('regionId', tour.regionId);
        formData.append('cityId', tour.cityId);
        if (image) {
            formData.append('file', image);
        }

        try {
            if (editingTourId) {
                await axios.put(`${API_BASE_URL}/admin/tours/update/${editingTourId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Tour updated successfully!');
            } else {
                await axios.post(`${API_BASE_URL}/admin/tours/add`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                alert('Tour added successfully!');
            }
            fetchTours();
            resetForm();
        } catch (error) {
            console.error('Error saving tour:', error);
            alert('Error saving tour');
        }
    };

    const handleUpdateTour = (tour) => {
        setTour({
            title: tour.title,
            description: tour.description,
            price: tour.price,
            status: tour.status,
            regionId: tour.regionId,
            cityId: tour.cityId,
            photoPath: tour.photoPath,
        });
        setEditingTourId(tour.id);
        fetchCities(tour.regionId); // Fetch cities when editing a tour
    };

    const handleChangeStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        try {
            await axios.patch(`${API_BASE_URL}/admin/tours/status/${id}?status=${newStatus}`);
            alert(`Tour status changed to ${newStatus}`);
            fetchTours();
        } catch (error) {
            console.error('Error changing tour status:', error);
        }
    };

    const resetForm = () => {
        setTour({ title: '', description: '', price: '', status: 'ACTIVE', regionId: '', cityId: '', photoPath: '' });
        setImage(null);
        setEditingTourId(null);
    };

    return (
        <div className="manage-tours-container">
            <h1>Manage Tours</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={tour.title} onChange={handleInputChange} required placeholder="Title" />
                <textarea name="description" value={tour.description} onChange={handleInputChange} required placeholder="Description" />
                <input type="number" name="price" value={tour.price} onChange={handleInputChange} required placeholder="Price" />
                
                <select name="status" value={tour.status} onChange={handleInputChange} required>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                </select>

                <select name="regionId" value={tour.regionId} onChange={handleRegionChange} required>
                    <option value="">Select Region</option>
                    {regions.map(region => <option key={region.id} value={region.id}>{region.name}</option>)}
                </select>

                <select name="cityId" value={tour.cityId} onChange={handleInputChange} required>
                    <option value="">Select City</option>
                    {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>

                <input type="file" onChange={handleImageChange} />
                <button type="submit">{editingTourId ? "Update Tour" : "Add Tour"}</button>
                
            </form>

            <h2>Available Active Tours</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Region</th>
                        <th>City</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map(tour => (
                        <tr key={tour.id}>
                            <td>{tour.id}</td>
                            <td>{tour.title}</td>
                            <td>{tour.description}</td>
                            <td>{tour.price}</td>
                            <td>{tour.status}</td>
                            <td>{tour.region}</td>
                            <td>{tour.city}</td>
                            <td>
                                
                                <img src={`${API_BASE_URL}/uploads/${tour.photoPath}`} alt={tour.title} width="100" />
                    

                    
                            </td>
                            <td className="actions">
                                <button onClick={() => handleChangeStatus(tour.id, tour.status)}>
                                    {tour.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => handleUpdateTour(tour)}>Update Tour</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTours;
