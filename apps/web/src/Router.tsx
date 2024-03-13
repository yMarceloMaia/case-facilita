import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"

export function Router() {

    return (
        <BrowserRouter>
        < Header />
            <Routes location={location} key={location.pathname}>
                <Route index element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}