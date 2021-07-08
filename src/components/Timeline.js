import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";

export default function Timeline() {
    const { photos } = usePhotos();
    
    return (
        <div className="container col-span-2">
            <p>Timeline</p>
        </div>
    );
}