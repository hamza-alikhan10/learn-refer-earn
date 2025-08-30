import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom';
import { getNavigationButtons } from './Navigation';
import { useAppDispatch, useAppSelector} from '../ReduxStore/hooks';

const RenderRoutes = () => {
  const loading = false;
  const {isAuthenticated} = useAppSelector((state) => state.auth);
  

  // Get navigation buttons using the computed encodedLink.
  const navigation_button = getNavigationButtons();
  
  return (
    <div className="h-full w-full flex items-center justify-center">

        {/*Loading*/}
        {loading ? <div className="h-full bg-[#C6ECCF] font-semibold w-full flex items-center justify-center"><div className='text-[#266E73 text-3xl'>Loading....</div></div> 
        :    
        <Routes>
        <>
            {
                navigation_button.map((route, i) => {
                   if (route.isPrivate && isAuthenticated === "authenticated" ) {
                    {/*user.isAuthenticate */}
                       return <Route key={i} path={route.path} element={route.element} />
                    } else if (!route.isPrivate) {
                       return <Route key={i} path={route.path} element={route.element} />
                    }
                    return null; 
                })
            }
        </>
        </Routes>
        }
    </div>   
  )
}

export default RenderRoutes