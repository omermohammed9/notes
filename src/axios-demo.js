const axios = require("axios");


async function main(){
    //const response = await axios.get("https://dummyjson.com/products")
    const response = await axios.post("https://dummyjson.com/products/add",{
        title: 'BMW Pencil',

    });

    //Path parameter = such as products/1
    //Body Parameter
    //Query Parameter
    const responseTwo = await axios.get("https://dummyjson.com/products/search",{
        params: {
            q: "iPhone"
        },
        headers:{
            Authentication: ""
        }
    });
    console.log(responseTwo.data);
}
main();