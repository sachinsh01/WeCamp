const mongoose = require("mongoose");
const cities = require("./cities");
const axios = require('axios').default;
const { descriptors, places } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/we-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

/* Getting Random Camping Images From UnSplash */
/* async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'AcvTaZXMVxTUcLED4I7xrQ82DqrvI9pMrmsjlQRwZjs',
                collections: 1114848
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
} */

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1 = Math.floor(Math.random() * 400);
        const price = Math.floor(Math.random() * 3000) + 10;
        const camp = new Campground({
            author: "62cc598d30cff1cf93e36ca5",
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1].city}, ${cities[random1].state}`,
            geometry: {
                type: "Point",
                coordinates: [parseInt(cities[random1].lng),parseInt(cities[random1].lat)]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djtkzefmk/image/upload/v1657648877/WeCamp/fyugdea6qnbkisktbs9b.jpg',
                    filename: 'WeCamp/nzdt60zyn76u9hdeqhmm'
                }
            ],
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem eum eius ipsam optio perspiciatis magni obcaecati nulla eos. Iure nesciunt alias nisi impedit eligendi est maxime hic dolor odio sint!",
            price
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})