function CreateImage (product)  {
    // console.log(product,  );

    if(product.image === undefined){
		return ""
	}

	const imgData = product.image.data.data;
	const base64ImageString = Buffer.from(imgData, 'binary').toString('base64')
	// console.log(base64ImageString);
	const imgSrc = `data:${product.image.contentType};base64,${base64ImageString}`;
	return imgSrc;
	

    // const imgWidth = {
    //   // width: "20rem",
    // }
      
    // return <img src={imgSrc} alt="product" className="img-fluid" width="200rem"  />
  }

export default CreateImage;