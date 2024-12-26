import "./Tourpackage.css";
import React from "react";
import Footer from "../components/footer/Footer"

const packages = {
  south: [
    { title: "Explore South India", description: "Discover the beaches, temples, and hill stations of South India.", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Kerala Backwaters", description: "Experience the serene beauty of Kerala’s backwaters.", image: "https://plus.unsplash.com/premium_photo-1697729432049-caca66a1dab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Ooty Hill Station", description: "Visit the picturesque hill station of Ooty.", image: "https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.jpg?s=2048x2048&w=is&k=20&c=1B7hXej4O-K15rBFEB4A-DP0z_1yFr8OaDW8Vwu8ZVk=" },
    { title: "Hampi Heritage", description: "Explore the ancient ruins of Hampi.", image: "https://media.istockphoto.com/id/1296588342/photo/chariot-and-gopuram-at-vijaya-vitthala-temple-hampi-karnataka-india.jpg?s=2048x2048&w=is&k=20&c=veZcubo06RZDBXH-MFId3zIWNsiB-BuebJut4-4cGVU=" },
  ],
  east: [
    { title: "Bengal Tiger Safari", description: "Experience wildlife at Sundarbans National Park.", image: "https://media.istockphoto.com/id/1299825142/photo/tiger-walking-early-morning-hunting-time-the-image-was-taken-in-nagarahole-forest-karnataka.jpg?s=1024x1024&w=is&k=20&c=KwDb4K9tD6Jc2P5BrN_Y3gGYEGxg8dvhxoltf7tgEQs=" },
    { title: "Darjeeling Tea Gardens", description: "Visit the beautiful tea gardens of Darjeeling.", image: "https://plus.unsplash.com/premium_photo-1692049123825-8d43174c9c5c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Shillong Waterfalls", description: "Explore the natural beauty of Shillong.", image: "https://static.wanderon.in/wp-content/uploads/2024/05/bishop-falls.jpg" },
    { title: "Sikkim Adventure", description: "Experience trekking and stunning views in Sikkim.", image: "https://www.esikkimtourism.in/wp-content/uploads/2019/05/adventure-tourism-sikkim-tts.jpg"}

  ],
  west: [
    { title: "Goa Beaches", description: "Relax on the pristine beaches of Goa.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRiCPeLHNfZ3okrQp1GuCMoJXoe1rKVDWR6A&s" },
    { title: "Rajasthan Royal Tour", description: "Explore the forts, palaces, and deserts of Rajasthan.", image: "https://rajasthanyatra.com/images/uploads/royal-rajasthan-tour.jpg" },
    { title: "Gir National Park", description: "Visit the home of Asiatic lions in Gujarat.", image: "https://www.girlion.in/assets/img/attraction/DevaliaSafariPark.webp" },
    { title: "Rann of Kutch", description: "Witness the white desert festival of Gujarat.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyTSqrq3lZMW9cYTiGvpTycImjEintrlBynQ&s" },
  ],
  north: [
    { title: "Golden Temple", description: "Visit the iconic Golden Temple in Amritsar.", image: "https://www.tallengestore.com/cdn/shop/files/GoldenTemple_SriHarmandirSahib_Amritsar-SikhHoliestShrine_d521ac95-49f8-4c34-8380-50af14b6e562.jpg?v=1729751147"},
    { title: "Shimla Hill Station", description: "Enjoy the picturesque views in Shimla.", image: "https://devbhumidarshanhp.in/wp-content/uploads/Shimla-Himachal-Pradesh.jpg"},
    { title: "Kashmir Paradise", description: "Experience the natural beauty of Kashmir.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPS1brsBcSV31ELI8Y1Cb8dix1vhy3IcdOw&s"},
    { title: "Rishikesh Adventure", description: "Go rafting and trekking in Rishikesh.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuxHDILzM6PPmp4Gtgygc84fLgrCVAM56CMUPNW3fyPb-TxZRtEVeYoBycNu58Humdx8o&usqp=CAU" },
  ],
};

function Tourpackage() {
  return (
    <div className="tourpackage-container">
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

function PackageCard({ package: { title, description, image } }) {
  return (
    <div className="package-card">
      <img src={image} alt={title} className="package-image" />
      <div className="package-details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Tourpackage;
