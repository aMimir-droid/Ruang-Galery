import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [captions, setCaptions] = useState("");
    const [secret, setSecret] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addPhoto = (e) => {
        e.preventDefault();

        fetch("https://gallery-app-server.vercel.app/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                imageUrl,
                captions,
                createdAt: new Date(),
                updatedAt: new Date(),
                secret,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    navigate("/photos");
                }
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <>
            <div className="container">
                {error && <div className="error-msg">{error}</div>}
                <form className="add-form" onSubmit={addPhoto}>
                    <label>
                        Image Url:
                        <input
                            className="add-input"
                            type="text"
                            data-testid="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </label>
                    <label>
                        Captions:
                        <input
                            className="add-input"
                            type="text"
                            data-testid="captions"
                            value={captions}
                            onChange={(e) => setCaptions(e.target.value)}
                        />
                    </label>
                    <label>
                        Secret:
                        <input
                            className="add-input"
                            type="text"
                            value={secret}
                            data-testid="secret"
                            onChange={(e) => setSecret(e.target.value)}
                        />
                    </label>
                    <input
                        className="submit-btn"
                        type="submit"
                        value="Submit"
                        data-testid="submit"
                    />
                </form>
            </div>
        </>
    );
};

export default AddPhoto;
