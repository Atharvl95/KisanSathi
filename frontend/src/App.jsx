import { BrowserRouter, Routes, Route } from "react-router-dom";

// ── Public Pages ──────────────────────────────────────
import Mainpage  from "./Pages/Mainpage/Mainpage";
import Aboutus   from "./Pages/Aboutus/Aboutus";
import Auth      from "./Pages/Auth/Auth";
import Contactus from "./Pages/Contactus/Contactus";
import Solutions from "./Pages/Solutions/Solutions";
import Blogs     from "./Pages/Blogs/Blogs";

// ── Admin Dashboard ───────────────────────────────────
import Admindash          from "./Pages/Admindash/Admindash";
import AdminOverview      from "./Components/Admindashboard/AdminOverview";
import ManageUsers        from "./Components/Admindashboard/ManageUsers";
import ManageExperts      from "./Components/Admindashboard/ManageExperts";
import AdminNotifications from "./Components/Admindashboard/Notificatios";   // typo kept as-is
import AdminSettings      from "./Components/Admindashboard/AdminSetting";   // typo kept as-is

// ── Farmer Dashboard ──────────────────────────────────
import FarmerDashboardLayout from "./Pages/Farmerdash/Farmerdash";
import FarmerOverview        from "./Components/Farmerdashboard/Overview";
import CropRecommendation    from "./Components/Farmerdashboard/CropRecommendation";
import ExpertHelp            from "./Components/Farmerdashboard/ExpertHelp";
import PestDetection         from "./Components/Farmerdashboard/PestDetection";
import Weather               from "./Components/Farmerdashboard/Weather";
import FarmerNotifications   from "./Components/Farmerdashboard/Notifications";
import FarmerSettings        from "./Components/Farmerdashboard/Settings";
import AIAssistant           from "./Components/Farmerdashboard/AIAssistant";

// ── Expert Dashboard ──────────────────────────────────
import ExpertDashboardLayout from "./Pages/Expertdash/Expertdash";
import ExpertOverview        from "./Components/Expertdashboard/Overview";
import CaseHistory           from "./Components/Expertdashboard/CaseHistory";
import PendingQueries        from "./Components/Expertdashboard/PendingQueries";
import RespondtoFarmers      from "./Components/Expertdashboard/RespondtoFarmers";
import ExpertNotification    from "./Components/Expertdashboard/Notification";
import ExpertSetting         from "./Components/Expertdashboard/Setting";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public Routes ─────────────────────────── */}
        <Route path="/"         element={<Mainpage />}  />
        <Route path="/about"    element={<Aboutus />}   />
        <Route path="/auth"     element={<Auth />}      />
        <Route path="/contact"  element={<Contactus />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/blogs"    element={<Blogs />}     />

        {/* ── Admin Routes ──────────────────────────── */}
        <Route path="/admindashboard" element={<Admindash />}>
          <Route index                   element={<AdminOverview />}      />
          <Route path="users"            element={<ManageUsers />}        />
          <Route path="experts"          element={<ManageExperts />}      />
          <Route path="notifications"    element={<AdminNotifications />} />
          <Route path="settings"         element={<AdminSettings />}      />
        </Route>

        {/* ── Farmer Routes ─────────────────────────── */}
        <Route path="/farmerdashboard" element={<FarmerDashboardLayout />}>
          <Route index                     element={<FarmerOverview />}      />
          <Route path="aiassistant"        element={<AIAssistant />}         />
          <Route path="croprecommendation" element={<CropRecommendation />}  />
          <Route path="experthelp"         element={<ExpertHelp />}          />
          <Route path="pestdetection"      element={<PestDetection />}       />
          <Route path="weather"            element={<Weather />}             />
          <Route path="notifications"      element={<FarmerNotifications />} />
          <Route path="settings"           element={<FarmerSettings />}      />
        </Route>

        {/* ── Expert Routes ─────────────────────────── */}
        <Route path="/expertdashboard" element={<ExpertDashboardLayout />}>
          <Route index                    element={<ExpertOverview />}     />
          <Route path="casehistory"       element={<CaseHistory />}        />
          <Route path="pendingqueries"    element={<PendingQueries />}     />
          <Route path="respondtofarmers"  element={<RespondtoFarmers />}   />
          <Route path="notification"      element={<ExpertNotification />} />
          <Route path="setting"           element={<ExpertSetting />}      />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;