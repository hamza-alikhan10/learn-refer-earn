import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";
import ReferralModal from "@/components/ReferralModal";
import Homepage from "@/pages/Homepage";
import CoursesPage from "@/pages/CoursesPage";
import CourseDetailsPage from "@/pages/CourseDetailsPage";
import Dashboard from "@/pages/Dashboard";
import HowItWorks from "@/pages/HowItWorks";
import ReferralProgram from "@/pages/ReferralProgram";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import Contact from "@/pages/Contact";
import ResetPasswordPage from "@/pages/auth/reset-password";
import EarnLabsPromo from "@/pages/EarnLabsPromo";

function DefaultLayout_00 ({children}) {
    // const {isClicked, BlurDiv ,} = useAuth();

    return (
    <div className="min-h-screen w-full bg-white">
      <Header/>
        {children}
        <Footer/>
        <AuthModal/>
      <ReferralModal/>
    </div>
    )
}

export const getNavigationButtons = ( ) => {

    return [
      { path: "/",                               name: 'Home',                         element: <DefaultLayout_00><Homepage/></DefaultLayout_00>,                                                  isPrivate: false },
      { path: "/course-page",                    name: 'Courses',                      element: <DefaultLayout_00><CoursesPage/></DefaultLayout_00>,                                               isPrivate: false },
       { path: "/Earnlabs-promo",                name: 'Promotion',                    element: <DefaultLayout_00><EarnLabsPromo/></DefaultLayout_00>,                                               isPrivate: false },
      { path: "/courses/:id",                    name: 'Courses Details',              element: <DefaultLayout_00><CourseDetailsPage/></DefaultLayout_00>,                                         isPrivate: false },
      { path: "/dashboard",                      name: 'Dashboard',                    element: <DefaultLayout_00><Dashboard/></DefaultLayout_00>,                                                 isPrivate: true },
      { path: "/about",                          name: 'About',                        element: <DefaultLayout_00><About/></DefaultLayout_00>,                                                     isPrivate: false },
      { path: "/how-it-works",                   name: 'How It Works',                 element: <DefaultLayout_00><HowItWorks/></DefaultLayout_00>,                                                isPrivate: false },
      { path: "/referral-program",               name: 'Referral Program',             element: <DefaultLayout_00><ReferralProgram/></DefaultLayout_00>,                                           isPrivate: false },
      { path: "/contact-us",                     name: 'Contact',                      element: <DefaultLayout_00><Contact/></DefaultLayout_00>,                                                   isPrivate: false },
      { path: "/auth/reset-password",            name: 'ResetPassword',                element: <ResetPasswordPage/>,                                                                              isPrivate: false },
      { path: "*",                               name: 'Not Found',                    element: <NotFound/>,                                                                                       isPrivate: false },

    ];
  };