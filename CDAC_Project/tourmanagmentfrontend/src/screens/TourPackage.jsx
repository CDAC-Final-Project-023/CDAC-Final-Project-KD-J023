import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";
import React from "react";
import { Link } from "react-router-dom";

 import "./Tourpackage.css";

const packages = {
  south: [
    {
      id: 1,
      title: "Explore South India",
      description:
        "Discover the beaches, temples, and hill stations of South India.",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      description: "Experience the serene beauty of Kerala’s backwaters.",
      image:
        "https://plus.unsplash.com/premium_photo-1697729432049-caca66a1dab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Ooty Hill Station",
      description: "Visit the picturesque hill station of Ooty.",
      image:
        "https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.jpg?s=2048x2048&w=is&k=20&c=1B7hXej4O-K15rBFEB4A-DP0z_1yFr8OaDW8Vwu8ZVk=",
    },
    {
      id: 4,
      title: "Hampi Heritage",
      description: "Explore the ancient ruins of Hampi.",
      image:
        "https://media.istockphoto.com/id/1296588342/photo/chariot-and-gopuram-at-vijaya-vitthala-temple-hampi-karnataka-india.jpg?s=2048x2048&w=is&k=20&c=veZcubo06RZDBXH-MFId3zIWNsiB-BuebJut4-4cGVU=",
    },
  ],
  east: [
    {
      id: 5,
      title: "Bengal Tiger Safari",
      description: "Experience wildlife at Sundarbans National Park.",
      image:
        "https://media.istockphoto.com/id/1299825142/photo/tiger-walking-early-morning-hunting-time-the-image-was-taken-in-nagarahole-forest-karnataka.jpg?s=1024x1024&w=is&k=20&c=KwDb4K9tD6Jc2P5BrN_Y3gGYEGxg8dvhxoltf7tgEQs=",
    },
    {
      id: 6,
      title: "Darjeeling Tea Gardens",
      description: "Visit the beautiful tea gardens of Darjeeling.",
      image:
        "https://plus.unsplash.com/premium_photo-1692049123825-8d43174c9c5c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      title: "Shillong Waterfalls",
      description: "Explore the natural beauty of Shillong.",
      image:
        "https://static.wanderon.in/wp-content/uploads/2024/05/bishop-falls.jpg",
    },
    {
      id: 8,
      title: "Sikkim Adventure",
      description: "Experience trekking and stunning views in Sikkim.",
      image:
        "https://www.esikkimtourism.in/wp-content/uploads/2019/05/adventure-tourism-sikkim-tts.jpg",
    },
  ],
  west: [
    {
      id: 9,
      title: "Goa Beaches",
      description: "Relax on the pristine beaches of Goa.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiCPeLHNfZ3okrQp1GuCMoJXoe1rKVDWR6A&s",
    },
    {
      id: 10,
      title: "Rajasthan Royal Tour",
      description: "Explore the forts, palaces, and deserts of Rajasthan.",
      image:
        "https://rajasthanyatra.com/images/uploads/royal-rajasthan-tour.jpg",
    },
    {
      id: 11,
      title: "Gir National Park",
      description: "Visit the home of Asiatic lions in Gujarat.",
      image:
        "https://www.girlion.in/assets/img/attraction/DevaliaSafariPark.webp",
    },
    {
      id: 12,
      title: "Rann of Kutch",
      description: "Witness the white desert festival of Gujarat.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTSqrq3lZMW9cYTiGvpTycImjEintrlBynQ&s",
    },
  ],
  north: [
    {
      id: 13,
      title: "Golden Temple",
      description: "Visit the iconic Golden Temple in Amritsar.",
      image:
        "https://www.tallengestore.com/cdn/shop/files/GoldenTemple_SriHarmandirSahib_Amritsar-SikhHoliestShrine_d521ac95-49f8-4c34-8380-50af14b6e562.jpg?v=1729751147",
    },
    {
      id: 14,
      title: "Shimla Hill Station",
      description: "Enjoy the picturesque views in Shimla.",
      image:
        "https://devbhumidarshanhp.in/wp-content/uploads/Shimla-Himachal-Pradesh.jpg",
    },
    {
      id: 15,
      title: "Kashmir Paradise",
      description: "Experience the natural beauty of Kashmir.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPS1brsBcSV31ELI8Y1Cb8dix1vhy3IcdOw&s",
    },
    {
      id: 16,
      title: "Rishikesh Adventure",
      description: "Go rafting and trekking in Rishikesh.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuxHDILzM6PPmp4Gtgygc84fLgrCVAM56CMUPNW3fyPb-TxZRtEVeYoBycNu58Humdx8o&usqp=CAU",
    },
  ],
};

function Tourpackage() {
  return (
    
    <div className="tourpackage-container">
      <Navbar />
      <h1>Tour Packages by Region</h1>
      <div className="categories">
        {Object.entries(packages).map(([region, packageList]) => (
          <Category key={region} name={region} packages={packageList} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

function Category({ name, packages }) {
  return (
    <div className="category">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Region</h2>
      <div className="package-list">
        {packages.map((pkg, index) => (
          <PackageCard key={index} package={pkg} />
        ))}
      </div>
    </div>
  );
}

function PackageCard({ package: { id,title, description, image } }) {
  return (
    <div className="package-card">
       <Link to={`/tour-details/${id}`}>
        <img src={image} alt={title} className="package-image" />
      </Link>
      <div className="package-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Tourpackage;
