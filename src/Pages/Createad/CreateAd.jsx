import React, { useEffect, useState } from "react";

function CreateAd({ userId }) {
    let [productDetails, setProductDetails] = useState({});
    let [allCategoties, setAllCategories] = useState(null);

    let getAllCategories = async () => {


        let response = await fetch(`http://localhost:8000/category/all`);
        let data = await response.json();
        setAllCategories(data);

        console.log(data);
        console.log(allCategoties);
    };

    useEffect(() => {
        productDetails.seller = localStorage.getItem("userId");
        console.log(productDetails);
        console.log(userId);
        getAllCategories();
        console.log(allCategoties);

        // .then((data) => {
        //     setAllCategories(data);
        //     console.log(allCategoties);
        // }).catch((err) => {
        //     console.log(err);


        // })

        // setAllCategories(getAllCategories());
    }, []);

    if (!allCategoties) {
        return <div>Loading...</div>;
    }

    return (
        <div className="create-container">
            <h1>Sell a Product</h1>

            <div className="card">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setProductDetails({ ...productDetails, title: e.target.value });
                    }}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setProductDetails({
                            ...productDetails,
                            description: e.target.value,
                        });
                    }}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setProductDetails({ ...productDetails, price: e.target.value });
                    }}
                />
                <label htmlFor="category">Category</label>
                <select

                    name="category"
                    onChange={(e) => {
                        setProductDetails({ ...productDetails, category: e.target.value });
                    }}
                >
                    <option value={null} defaultValue></option>
                    <option value={allCategoties[0]._id} defaultValue>{allCategoties[0].title}</option>
                    <option value={allCategoties[1]._id}> {allCategoties[1].title}</option>
                    <option value={allCategoties[2]._id}>{allCategoties[2].title}</option>
                    <option value={allCategoties[3]._id}>{allCategoties[3].title}</option>
                    <option value={allCategoties[4]._id}>{allCategoties[4].title}</option>
                    <option value={allCategoties[5]._id}>{allCategoties[5].title}</option>
                    <option value={allCategoties[6]._id}>{allCategoties[6].title}</option>
                    <option value={allCategoties[7]._id}>{allCategoties[7].title}</option>
                    <option value={allCategoties[8]._id}>{allCategoties[8].title}</option>
                    <option value={allCategoties[9]._id}>{allCategoties[9].title}</option>
                    <option value={allCategoties[10]._id}>{allCategoties[10].title}</option>
                    <option value={allCategoties[11]._id}>{allCategoties[11].title}</option>
                </select>
                <button onClick={() => {
                    console.log(productDetails);
                    fetch(`http://localhost:8000/post`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(productDetails),
                    }).then((res) => {
                        console.log(res);
                    }





                    )


                }}>Submit</button>
            </div>
        </div >
    );
}

export default CreateAd;
