import { useNavigate } from "react-router";
import logo from "./asset/logo.png";
import icon from "./asset/icon.png"
const companies = [
  { name: "JACKGOLD", logo: icon },
  { name: "Pelu Sunflower", logo: "https://dummyimage.com/60x60/62c29a/fff&text=P" },
  { name: "SuperMart", logo: "https://dummyimage.com/60x60/62c29a/fff&text=S" },
  { name: "RetailPro", logo: "https://dummyimage.com/60x60/62c29a/fff&text=R" },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col w-full bg-gradient-to-br from-[#eafaf3] to-[#f8fdfb]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-3 animate-fade-in">
          <img src={logo} alt="GrandyPOS Logo" className="h-10 w-10 rounded-full shadow" />
          <span className="font-bold text-2xl text-green-700 font-roboto tracking-tight">GrandyPOS</span>
        </div>
        <nav>
          <ul className="flex space-x-8 text-gray-700 font-roboto text-base">
            <li className="hover:text-green-500 cursor-pointer transition-all duration-200">Features</li>
            <li className="hover:text-green-500 cursor-pointer transition-all duration-200">Pricing</li>
            <li className="hover:text-green-500 cursor-pointer transition-all duration-200">About</li>
          </ul>
        </nav>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200 animate-bounce"
        >
          Sign In
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse sm:flex-row items-center justify-between px-8 sm:px-24 py-16 bg-[#62c29a]/10 animate-fade-in-up">
        <div className="sm:w-2/3">
          <h1 className="font-roboto font-extralight text-5xl sm:text-6xl mb-6 text-gray-900 leading-tight animate-slide-in-left">
            Smart, Simple & Seamless Sales.
          </h1>
          <p className="text-lg sm:w-5/6 font-roboto mb-8 text-gray-700 animate-fade-in">
            Whether you run a retail store, pharmacy, or supermarket, our powerful tools keep your operations smooth and efficient.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-10 rounded-lg shadow-lg text-lg transition-all duration-200 animate-pulse"
          >
            Get Started
          </button>
        </div>
        <div className="sm:w-1/3 flex justify-center mb-10 sm:mb-0 animate-fade-in">
          <img src={logo} alt="GrandyPOS" className="h-48 sm:h-64 drop-shadow-xl animate-spin-slow" />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-10 px-8 sm:px-24 shadow-inner">
        <h2 className="text-2xl font-roboto font-medium text-gray-900 text-center mb-8 animate-fade-in">
          Trusted by Companies & Solo Enterprises
        </h2>
        <div className="flex justify-center items-center space-x-10">
          {companies.map((company, idx) => (
            <div
              key={company.name}
              className={`flex flex-col items-center transition-transform duration-300 hover:scale-110 ${
                idx % 2 === 0 ? "animate-fade-in-up" : "animate-fade-in-down"
              }`}
            >
              <img src={company.logo} alt={company.name} className="h-14 w-14 rounded-full mb-2 shadow" />
              <span className="text-gray-600 font-roboto text-sm">{company.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;