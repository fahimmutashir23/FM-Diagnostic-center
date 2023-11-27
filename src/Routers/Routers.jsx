import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/HomePage/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import PrivetRoute from "../Routes/PrivetRoute";
import AllUser from "../Pages/Dashboard/AdminDashboard/AllUser/AllUser";
import AllTest from "../Pages/Dashboard/AdminDashboard/AllTest/AllTest";
import AddTest from "../Pages/Dashboard/AdminDashboard/AddTest/AddTest";
import AddBanner from "../Pages/Dashboard/AdminDashboard/AddBanner/AddBanner";
import AllBanner from "../Pages/Dashboard/AdminDashboard/AllBanner/AllBanner";
import Reservation from "../Pages/Dashboard/AdminDashboard/Reservation/Reservation";
import UserHome from "../Pages/Dashboard/UserDashboard/UserHome/UserHome";
import UserProfile from "../Pages/Dashboard/UserDashboard/UserProfile/UserProfile";
import TestReport from "../Pages/Dashboard/UserDashboard/TestReport/TestReport";
import Appointments from "../Pages/Dashboard/UserDashboard/Appointments/Appointments";
import AdminRouts from "../Routes/Adminrouts";
import ErrorPage from "../Utils/ErrorPage/ErrorPage";
import AllTestPage from "../Pages/AllTestPage/AllTestPage";
import Details from "../Pages/Details/Details";
import Blog from "../Pages/Blog/Blog";
import Contact from "../Pages/Contact/Contact";
import DoctorsMeet from "../Pages/DoctorsMeet/DoctorsMeet";


const Routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/registration",
                element: <Registration></Registration>
            },
            {
                path: '/allTest',
                element: <AllTestPage></AllTestPage>
            },
            {
                path: '/details/:id',
                element: <PrivetRoute><Details></Details></PrivetRoute>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/contact',
                element: <Contact></Contact>
            },
            {
                path: '/doctorsMeet',
                element: <DoctorsMeet></DoctorsMeet>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            //admin releted routes
            {
                path: '/dashboard',
                element: <PrivetRoute><AdminHome></AdminHome></PrivetRoute>
            },
            {
                path: '/dashboard/allUser',
                element: <AdminRouts><AllUser></AllUser></AdminRouts>
            },
            {
                path: '/dashboard/allTest',
                element: <AdminRouts><AllTest></AllTest></AdminRouts>
            },
            {
                path: '/dashboard/addTest',
                element: <AdminRouts><AddTest></AddTest></AdminRouts>
            },
            {
                path: '/dashboard/allBanner',
                element: <AdminRouts><AllBanner></AllBanner></AdminRouts>
            },
            {
                path: '/dashboard/addBanner',
                element: <AdminRouts><AddBanner></AddBanner></AdminRouts>
            },
            {
                path: '/dashboard/reservation',
                element: <AdminRouts><Reservation></Reservation></AdminRouts>
            },
            // user routes
            {
                path: '/dashboard/userHome',
                element: <PrivetRoute><UserHome></UserHome></PrivetRoute>
            },
            {
                path: '/dashboard/myProfile',
                element: <PrivetRoute><UserProfile></UserProfile></PrivetRoute>
            },
            {
                path: '/dashboard/testResult',
                element: <PrivetRoute><TestReport></TestReport></PrivetRoute>
            },
            {
                path: '/dashboard/appointment',
                element: <PrivetRoute><Appointments></Appointments></PrivetRoute>
            },
        ]
    }
])

export default Routers;