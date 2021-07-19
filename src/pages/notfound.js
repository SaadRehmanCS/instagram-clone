import Header from "../components/Header";
import { useEffect } from "react";

export default function Notfound() {

    useEffect(() => document.title = "Page Not Found");
    return (
        <div>
            <Header />
            <div className="text-center py-10">
                <h1 className="text-2xl font-medium">Sorry, this page isn't available.</h1>
                <h2 className="py-10">The link you followed may be broken, or the page may have been removed. </h2>
            </div>
        </div>
    );
}