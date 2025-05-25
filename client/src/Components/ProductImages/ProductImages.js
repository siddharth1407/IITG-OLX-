import React, {useState, useEffect} from "react"


export default function ProductImages() {
    const [products, setProducts] = useState(null);

    useEffect( async () => {
      const res =  await fetch("/api/get/images")
      const data = await res.json();
      setProducts(data.products);
      // console.log(data.products);
      // console.log(data.products[0]._id, typeof(data.products[0]._id,  data.products[0]._id.toString()));
      console.log(data.message);    
    }, []);

    const createImage = (product) => {
      // console.log(product);
      const imgData = product.image.data.data;
      const base64ImageString = Buffer.from(imgData, 'binary').toString('base64')
      // console.log(base64ImageString);
      const imgSrc = `data:${product.image.contentType};base64,${base64ImageString}`;

      // const imgWidth = {
      //   // width: "20rem",
      // }

      return <img src={imgSrc} alt="product" className="img-fluid" width="200rem"  />
    }
  
    return (

      <div className="ProductImages">
        <h1>ProductImages</h1>
        {
          products && products.map((product, index) => {
            return (
              <div key={index}>
                <p>Name: {product.name}</p>  
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                
                
                {createImage(product)}
                
              </div>
            )
          })
        }
      </div>
    );
    // const [images, setImages] = useState(null);

    // // fetch images from server on reloading\
    // useEffect(() => {
    //     fetch("/api/get/images")
    //     .then((res) => res.json())
    //     .then((data) => setImages(data));
    //     console.log(images);
    // }, []);

  
}
