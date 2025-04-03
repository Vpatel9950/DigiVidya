import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import MainLayout from './layout/MainLayout'

import Login from './pages/login'
import HeroSection from './pages/student/HeroSection'

import Courses from './pages/student/Courses'

const appRouter=createBrowserRouter([
  {
      path:"/",
      element:<MainLayout/>,
      children:[
          {
            path:"/",
            element:(
            <>
              <HeroSection/>
              <Courses/>
            </>
            ),
          },
          {
            path:"login",
            element:<Login/>
          }
      ],
  },
])

function App() {
 

  return (
    <main>
     <RouterProvider router={appRouter}/>
   </main>
  )
}

export default App
