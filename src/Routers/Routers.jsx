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
import Appointments from "../Pages/Dashboard/UserDashboard/Appointments/appointments";


const Routers = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
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
        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><DashboardLayout></DashboardLayout></PrivetRoute>,
        children: [
            //admin releted routes
            {
                path: '/dashboard',
                element: <AdminHome></AdminHome>
            },
            {
                path: '/dashboard/allUser',
                element: <AllUser></AllUser>
            },
            {
                path: '/dashboard/allTest',
                element: <AllTest></AllTest>
            },
            {
                path: '/dashboard/addTest',
                element: <AddTest></AddTest>
            },
            {
                path: '/dashboard/allBanner',
                element: <AllBanner></AllBanner>
            },
            {
                path: '/dashboard/addBanner',
                element: <AddBanner></AddBanner>
            },
            {
                path: '/dashboard/reservation',
                element: <Reservation></Reservation>
            },
            // user routes
            {
                path: '/dashboard/userHome',
                element: <UserHome></UserHome>
            },
            {
                path: '/dashboard/myProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: '/dashboard/testResult',
                element: <TestReport></TestReport>
            },
            {
                path: '/dashboard/appointment',
                element: <Appointments></Appointments>
            },
        ]
    }
])

export default Routers;