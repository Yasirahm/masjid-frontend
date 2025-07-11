import { useState } from "react";

const ZakatCalculator = () => {
  const [assets, setAssets] = useState({
    gold: "",
    silver: "",
    cash: "",
    business: "",
    receivables: "",
    investments: "",
    agriculture: "",
  });

  const handleChange = (e) => {
    setAssets({ ...assets, [e.target.name]: e.target.value });
  };

  const totalAssets = Object.values(assets).reduce((acc, val) => acc + Number(val), 0);
  const zakat = totalAssets * 0.025;
  const nisab = 5950; // ₹5950 for silver nisab (can be updated)

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">🧮 Zakat Calculator</h1>

        <p className="text-center text-gray-600 italic">
          "Take from their wealth a charity by which you purify them and cause them increase…" <br />
          <span className="text-sm text-gray-500">[Qur’an 9:103]</span>
        </p>

        <p className="urdu text-lg text-gray-700 bg-gray-100 p-2 rounded">
          زکوٰۃ ان اموال پر فرض ہے جو ایک سال تک نصاب سے زیادہ ہوں
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Gold Value (سونے کی قیمت)", name: "gold" },
            { label: "Silver Value (چاندی کی قیمت)", name: "silver" },
            { label: "Cash (نقد رقم)", name: "cash" },
            { label: "Business Goods (تجارتی مال)", name: "business" },
            { label: "Receivables (ادھار دی گئی رقم)", name: "receivables" },
            { label: "Investments (سرمایہ کاری)", name: "investments" },
            { label: "Agriculture Produce (زرعی پیداوار)", name: "agriculture" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700">
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                value={assets[field.name]}
                onChange={handleChange}
                placeholder="Enter amount"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center text-xl font-semibold text-green-700">
          Total Assets: ₹{totalAssets.toLocaleString()}
        </div>
        <div className="text-center text-2xl font-bold text-blue-700">
          💰 Zakat Due (2.5%): ₹{zakat.toFixed(2)}
        </div>

        {totalAssets < nisab && (
          <p className="text-center text-red-500 text-sm">
            ⚠️ Your total wealth is below the Nisab (₹{nisab}), Zakat may not be obligatory.
          </p>
        )}

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md text-sm text-gray-700 mt-4">
          <p>
            <strong>Hadith:</strong> "Charity does not decrease wealth..." <br />
            <span className="italic text-gray-600">[Sahih Muslim 2588]</span>
          </p>
        </div>

        <div className="bg-gray-100 p-3 rounded text-gray-700 text-sm text-center urdu">
          نیت خالص ہو، اور مکمل سال گزرنے پر زکوٰۃ دی جائے
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
