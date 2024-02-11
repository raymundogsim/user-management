import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import UserForm from "./scenes/form/UserForm";
import ContactForm from "./scenes/form/ContactForm";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar/calendar";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "features/auth/authApi";
import ProfileForm from "scenes/form/ProfileForm";


function MainLayout() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user, profile } = useSelector(({ auth }) => auth)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            return
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(getAuthUser())

    }, [])



    useEffect(() => {
        if (!profile) {
            navigate('/dashboard/profile')
        } else {
            navigate('/dashboard')
        }
    }, [profile])

    return (
        <div className="app">
            <main className="content">
                <Topbar>
                    {/* <ResponsiveAppBar/> */}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/invoices" element={<Invoices />} />
                        <Route path="/user-form" element={<UserForm />} />
                        <Route path="/contact-form" element={<ContactForm />} />
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/calendar" element={<Calendar />} />
                    </Routes>
                </Topbar>
            </main>
        </div>
    );
}

export default MainLayout;
