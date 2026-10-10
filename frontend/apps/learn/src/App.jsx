import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../src/lib/auth.jsx";
import { accessGrant } from "../../../src/lib/api.js";
import { AppShell } from "../../../src/components/layout/AppShell.jsx";

const Login = lazy(() => import("../../../src/pages/Login.jsx"));
const Register = lazy(() => import("../../../src/pages/Register.jsx"));
const ForgotPassword = lazy(() => import("../../../src/pages/ForgotPassword.jsx"));
const Landing = lazy(() => import("../../../src/pages/StandaloneProductLanding.jsx"));
const About = lazy(() => import("../../../src/pages/About.jsx"));
const AccessGate = lazy(() => import("../../../src/pages/AccessGate.jsx"));
const Dashboard = lazy(() => import("../../../src/pages/Dashboard.jsx"));
const StudentHome = lazy(() => import("../../../src/pages/StudentHome.jsx"));
const MyLearning = lazy(() => import("../../../src/pages/MyLearning.jsx"));
const Assessments = lazy(() => import("../../../src/pages/Assessments.jsx"));
const SkillMap = lazy(() => import("../../../src/pages/SkillMap.jsx"));
const CodingPractice = lazy(() => import("../../../src/pages/CodingPractice.jsx"));
const CareerReadiness = lazy(() => import("../../../src/pages/CareerReadiness.jsx"));
const KeepSharp = lazy(() => import("../../../src/pages/KeepSharp.jsx"));
const Wallet = lazy(() => import("../../../src/pages/Wallet.jsx"));
const AdaptiveDrill = lazy(() => import("../../../src/pages/AdaptiveDrill.jsx"));
const PeerMesh = lazy(() => import("../../../src/pages/PeerMesh.jsx"));
const Lessons = lazy(() => import("../../../src/pages/Lessons.jsx"));
const LessonViewer = lazy(() => import("../../../src/pages/LessonViewer.jsx"));
const PracticeWorlds = lazy(() => import("../../../src/pages/PracticeWorlds.jsx"));
const Achievements = lazy(() => import("../../../src/pages/Achievements.jsx"));
const Tutor = lazy(() => import("../../../src/pages/Tutor.jsx"));
const Certificates = lazy(() => import("../../../src/pages/Certificates.jsx"));
const AdminConsole = lazy(() => import("../../../src/pages/admin/AdminConsole.jsx"));
const TrainingCenterStudio = lazy(() => import("../../../src/pages/admin/TrainingCenterStudio.jsx"));
const CurriculumStudio = lazy(() => import("../../../src/pages/admin/CurriculumStudio.jsx"));
const TrainerConsole = lazy(() => import("../../../src/pages/admin/TrainerConsole.jsx"));
const AccessCodes = lazy(() => import("../../../src/pages/admin/AccessCodes.jsx"));
const RolesPermissions = lazy(() => import("../../../src/pages/admin/RolesPermissions.jsx"));
const UserManagement = lazy(() => import("../../../src/pages/admin/UserManagement.jsx"));
const AnalyticsExplorer = lazy(() => import("../../../src/pages/admin/AnalyticsExplorer.jsx"));
const AuditLog = lazy(() => import("../../../src/pages/admin/AuditLog.jsx"));
const ContentStudio = lazy(() => import("../../../src/pages/admin/ContentStudio.jsx"));
const CourseBuilder = lazy(() => import("../../../src/pages/admin/CourseBuilder.jsx"));
const PlacementAnalytics = lazy(() => import("../../../src/pages/admin/PlacementAnalytics.jsx"));
const Notifications = lazy(() => import("../../../src/pages/Notifications.jsx"));
const LearnProfile = lazy(() => import("../../../src/pages/LearnProfile.jsx"));
const Settings = lazy(() => import("../../../src/pages/Settings.jsx"));
const WalletVerify = lazy(() => import("../../../src/pages/WalletVerify.jsx"));
const CertificateVerify = lazy(() => import("../../../src/pages/CertificateVerify.jsx"));

const STAFF = ["super_admin", "company_admin", "college_admin", "trainer", "content_manager"];
const PLATFORM_ADMIN = ["super_admin", "company_admin"];
const ANALYTICS = ["super_admin", "company_admin", "college_admin", "principal", "dean", "hod", "tpo", "faculty", "trainer"];
const AUTHORS = ["super_admin", "company_admin", "college_admin", "trainer", "faculty", "hod"];
const TRAINING = ["super_admin", "company_admin", "college_admin", "principal", "dean", "hod", "trainer", "faculty"];

function Protected({ children, bare = false, skipGate = false, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-400">Loading…</div>;
  if (!user) return <Navigate to="/learn/login" replace />;
  if (roles && !roles.some((role) => (user.roles || []).includes(role))) return <Navigate to="/lms" replace />;
  if (!skipGate && (user.roles || []).includes("student") && !STAFF.some((role) => (user.roles || []).includes(role)) && !accessGrant.value)
    return <Navigate to="/lms/access-gate" replace />;
  if (bare) return children;
  return <AppShell product="lms">{children}</AppShell>;
}

const learn = (node) => <Protected>{node}</Protected>;
const staff = (node) => <Protected roles={STAFF}>{node}</Protected>;
const platformAdmin = (node) => <Protected roles={PLATFORM_ADMIN}>{node}</Protected>;
const analytics = (node) => <Protected roles={ANALYTICS}>{node}</Protected>;
const authors = (node) => <Protected roles={AUTHORS}>{node}</Protected>;
const training = (node) => <Protected roles={TRAINING}>{node}</Protected>;

export default function LearnApp() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center text-slate-500">Loading Lityra Learn…</div>}>
    <Routes>
      <Route path="/" element={<Landing isHire={false} />} />
      <Route path="/about" element={<About isHire={false} />} />
      <Route path="/login" element={<Login product="learn" />} />
      <Route path="/register" element={<Register product="learn" />} />
      <Route path="/learn/login" element={<Login product="learn" />} />
      <Route path="/learn/register" element={<Register product="learn" />} />
      <Route path="/trainer/login" element={<Login product="learn" audience="trainer" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify/wallet/:verifyId" element={<WalletVerify />} />
      <Route path="/verify/:verifyId" element={<CertificateVerify />} />
      <Route path="/lms/access-gate" element={<Protected bare skipGate><AccessGate /></Protected>} />
      <Route path="/lms" element={learn(<Dashboard />)} />
      <Route path="/lms/roadmap" element={learn(<StudentHome />)} />
      <Route path="/lms/learning" element={learn(<MyLearning />)} />
      <Route path="/lms/assessments" element={learn(<Assessments />)} />
      <Route path="/lms/skill-map" element={learn(<SkillMap />)} />
      <Route path="/lms/practice" element={learn(<CodingPractice />)} />
      <Route path="/lms/careers" element={learn(<CareerReadiness />)} />
      <Route path="/lms/keep-sharp" element={learn(<KeepSharp />)} />
      <Route path="/lms/wallet" element={learn(<Wallet />)} />
      <Route path="/lms/drill" element={learn(<AdaptiveDrill />)} />
      <Route path="/lms/mesh" element={learn(<PeerMesh />)} />
      <Route path="/lms/lessons" element={learn(<Lessons />)} />
      <Route path="/lms/lesson/:lid" element={learn(<LessonViewer />)} />
      <Route path="/lms/worlds" element={learn(<PracticeWorlds />)} />
      <Route path="/lms/achievements" element={learn(<Achievements />)} />
      <Route path="/lms/tutor" element={learn(<Tutor />)} />
      <Route path="/lms/certificates" element={learn(<Certificates />)} />
      <Route path="/lms/admin" element={staff(<AdminConsole />)} />
      <Route path="/lms/training-centers" element={training(<TrainingCenterStudio />)} />
      <Route path="/lms/curriculum" element={staff(<CurriculumStudio />)} />
      <Route path="/lms/trainer" element={staff(<TrainerConsole />)} />
      <Route path="/lms/access-codes" element={staff(<AccessCodes />)} />
      <Route path="/lms/roles" element={platformAdmin(<RolesPermissions />)} />
      <Route path="/lms/users" element={platformAdmin(<UserManagement />)} />
      <Route path="/lms/institution-analytics" element={analytics(<AnalyticsExplorer />)} />
      <Route path="/lms/placement" element={analytics(<PlacementAnalytics />)} />
      <Route path="/lms/audit" element={platformAdmin(<AuditLog />)} />
      <Route path="/lms/course-builder" element={authors(<CourseBuilder />)} />
      <Route path="/lms/content-studio" element={authors(<ContentStudio />)} />
      <Route path="/lms/notifications" element={learn(<Notifications />)} />
      <Route path="/lms/profile" element={learn(<LearnProfile />)} />
      <Route path="/lms/settings" element={learn(<Settings />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>;
}
