import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import "./BasicSiteSettings.css"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BasicSiteSettings = () => {
        const [logoPreview, setLogoPreview] = useState(null);
        const [savedSettings, setSavedSettings] = useState({
                siteName: '',
                siteLogo: null,
                primaryEmailId: '',
                facebookUrl: '',
                instagramUrl: ''
        });

        // Pass defaultValues to useForm
        const { register, handleSubmit, formState: { errors }, reset } = useForm({
                defaultValues: savedSettings
        });
        // Handle file input change for preview
        const handleLogoChange = (e) => {
                const file = e.target.files[0];
                if (file) {
                        setLogoPreview(URL.createObjectURL(file))
                } else {
                        setLogoPreview(null)
                }
        };

        useEffect(() => {
                // Fetch existing settings if needed
                const fetchSettings = async () => {
                        try {
                                const response = await axios.get('http://localhost:5000/api/getSettings?siteKey=VisitCopenhagen');
                                if (response.data != null) {
                                        let settingData = response.data.data;
                                        setSavedSettings({
                                                siteName: settingData.siteName || '',
                                                siteLogo: settingData.siteLogo || null,
                                                primaryEmailId: settingData.primaryEmailId || '',
                                                facebookUrl: settingData.facebookUrl || '',
                                                instagramUrl: settingData.instagramUrl || ''
                                        });
                                        setLogoPreview(settingData.siteLogoUrl || null);
                                } else {
                                        setLogoPreview(null);
                                        console.error("Failed to fetch settings: " + response.message);
                                }
                        } catch (error) {
                                console.error("Error fetching settings:", error);
                        }
                };

                fetchSettings();
        }, []);

        useEffect(() => {
                reset(savedSettings);
                if (savedSettings && savedSettings.siteLogo) {
                        setLogoPreview(savedSettings.siteLogo);
                }
       
        }, [savedSettings, reset]);

        const onSubmit = async (data) => {
                // Compare form data with savedSettings (ignore file for now)
                const isUnchanged =
                        data.siteName === savedSettings.siteName &&
                        data.primaryEmailId === savedSettings.primaryEmailId &&
                        data.facebookUrl === savedSettings.facebookUrl &&
                        data.instagramUrl === savedSettings.instagramUrl &&
                        (!data.siteLogo || data.siteLogo.length === 0); // no new file selected

                if (isUnchanged) {
                        toast("You still have these settings!", { icon: 'ℹ️' });
                        return;
                }
                try {
                        const formData = new FormData();
                        formData.append("siteName", data.siteName);
                        formData.append("facebookUrl", data.facebookUrl || "");
                        formData.append("instagramUrl", data.instagramUrl || "");
                        formData.append("primaryEmailId", data.primaryEmailId || "");
                        if (data.siteLogo && data.siteLogo.length > 0) {
                                formData.append("siteLogo", data.siteLogo[0]);
                        } else {
                                formData.append("siteLogo", logoPreview);
                        }
                        let settingsSaveResponse = await axios.put('http://localhost:5000/api/addSettings', formData, {
                                headers: {
                                        "Content-Type": "multipart/form-data",
                                },
                        });
                        if (settingsSaveResponse.data != null) {
                                toast.success("Settings saved successfully!", { icon: '🎉' });
                        } else {
                                toast.error("Failed to save settings.");
                        }
                } catch (error) {
                        toast.error("Error saving settings!");
                        console.error("Error saving settings:", error);
                }
        };



        return (
                <section className="basic-site-settings">
                        <Toaster position="top-right" />
                        <h2>Basic Site Settings</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group">
                                        <label>Site Name</label>
                                        <input
                                                type="text"
                                                {...register("siteName", { required: true })}
                                                placeholder="Enter site name"
                                        />
                                        {errors.siteName && <span className="error">Site name is required</span>}
                                </div>
                                <div className="input-group">
                                        <label>Site Logo</label>
                                        <input
                                                type="file"
                                                accept="image/*"
                                                {...register("siteLogo")}
                                                onChange={handleLogoChange}
                                        />
                                        {logoPreview && (
                                                <div className="image-preview">
                                                        <img src={logoPreview} alt="Site Logo Preview" style={{ maxWidth: "120px", marginTop: "10px", borderRadius: "8px", boxShadow: "0 2px 8px #0001" }} />
                                                </div>
                                        )}
                                </div>
                                <div className="input-group">
                                        <label>Primary Email ID</label>
                                        <input
                                                type="email"
                                                {...register("primaryEmailId", { required: true })}
                                                placeholder="Enter primary email"
                                        />
                                        {errors.primaryEmailId && <span className="error">Primary email is required</span>}
                                </div>
                                <div className="input-group">
                                        <label>Facebook URL</label>
                                        <input
                                                type="text"
                                                {...register("facebookUrl")}
                                                placeholder="Enter Facebook URL"
                                        />
                                </div>
                                <div className="input-group">
                                        <label>Instagram URL</label>
                                        <input
                                                type="text"
                                                {...register("instagramUrl")}
                                                placeholder="Enter Instagram URL"
                                        />
                                </div>
                                <button type="submit" className="btn">Save Settings</button>
                        </form>
                </section>
        )
}

export default BasicSiteSettings