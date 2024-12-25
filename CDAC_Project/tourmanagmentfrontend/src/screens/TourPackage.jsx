import "./Tourpackage.css";
import React from "react";

const packages = {
  south: [
    { title: "Explore South India", description: "Discover the beaches, temples, and hill stations of South India.", image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Kerala Backwaters", description: "Experience the serene beauty of Kerala’s backwaters.", image: "https://plus.unsplash.com/premium_photo-1697729432049-caca66a1dab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Ooty Hill Station", description: "Visit the picturesque hill station of Ooty.", image: "https://images.unsplash.com/photo-1571213247105-02b20e9297e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Hampi Heritage", description: "Explore the ancient ruins of Hampi.", image: "https://images.unsplash.com/photo-1595267378436-04222bd82f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  east: [
    { title: "Bengal Tiger Safari", description: "Experience wildlife at Sundarbans National Park.", image: "https://images.unsplash.com/photo-1580789203215-e27d76861b99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Darjeeling Tea Gardens", description: "Visit the beautiful tea gardens of Darjeeling.", image: "https://images.unsplash.com/photo-1585501226574-7a6ca1cf6da1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Shillong Waterfalls", description: "Explore the natural beauty of Shillong.", image: "https://images.unsplash.com/photo-1571978786659-2bcb4bd09f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Sikkim Adventure", description: "Experience trekking and stunning views in Sikkim.", image: "https://images.unsplash.com/photo-1602741883481-4862b1e0bd9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  west: [
    { title: "Goa Beaches", description: "Relax on the pristine beaches of Goa.", image: "https://images.unsplash.com/photo-1570632880630-983a89eed8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Rajasthan Royal Tour", description: "Explore the forts, palaces, and deserts of Rajasthan.", image: "https://images.unsplash.com/photo-1602086948413-f5d8d217d0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Gir National Park", description: "Visit the home of Asiatic lions in Gujarat.", image: "https://images.unsplash.com/photo-1587496679745-d1d0f313130c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Rann of Kutch", description: "Witness the white desert festival of Gujarat.", image: "https://images.unsplash.com/photo-1598454444892-d06f7fcbf3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
  north: [
    { title: "Golden Temple", description: "Visit the iconic Golden Temple in Amritsar.", image: "https://images.unsplash.com/photo-1554123168-bfced98e1d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Shimla Hill Station", description: "Enjoy the picturesque views in Shimla.", image: "https://images.unsplash.com/photo-1600771052521-1d934f6a2b5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Kashmir Paradise", description: "Experience the natural beauty of Kashmir.", image: "https://images.unsplash.com/photo-1565008577680-6b58aaed9bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
    { title: "Rishikesh Adventure", description: "Go rafting and trekking in Rishikesh.", image: "https://images.unsplash.com/photo-1593685942812-c0391d5ca623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  ],
};

function App() {
  return (
    <div className="App">
      <h1>Tour Packages by Region</h1>
      <div className="categories">
        {Object.entries(packages).map(([region, packageList]) => (
          <Category key={region} name={region} packages={packageList} />
        ))}
      </div>
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

export default App;
