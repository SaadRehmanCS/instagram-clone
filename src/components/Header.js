function Header() {
    return (
        <div className="flex bg-white">
            <div>
                <img src="https://instagramothers.s3.eu-west-2.amazonaws.com/logo.png"
                    alt="Instagram logo"
                    className="w-3/12 py-3 ml-56"
                />
            </div>
            <div className="py-3 object-right">
                <button className="">Log In</button>
            </div>
        </div>
    );
}

export default Header;