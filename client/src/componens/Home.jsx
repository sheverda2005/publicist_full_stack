import NewsDay from "./Posts/NewsDay/NewsDay";
import Posts from "./Posts/Posts";

export default function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col col-12 mt-1">
                    <NewsDay/>
                </div>
                <div className="col col-12">
                    <Posts />
                </div>
            </div>
        </div>
    );
}