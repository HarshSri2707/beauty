import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Lazy load all page components
const Main = lazy(() => import('../../Partials/Mainpage'))
const Home = lazy(() => import('../../Pages/Home'))
const Blogs_all = lazy(() => import('../../Pages/Blogs_all'))
const NotFound = lazy(() => import('../../Pages/NotFound'))
const Blog_single = lazy(() => import('../../Pages/Blog_single'))
const Product = lazy(() => import('../../Pages/Product'))
const AboutUs = lazy(() => import('../../Pages/About'))
const Product_Single = lazy(() => import('../../Pages/Product_single'))
const Loading = lazy(() => import('../../Pages/Loading'))

const Auth = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Home />} />
            <Route path="/Products" element={<Product />} />
            <Route path="/Product/:id" element={<Product_Single />} />
            <Route path="/Blog" element={<Blogs_all />} />
            <Route path="/Blog/:id" element={<Blog_single />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  ) 
}

export default Auth