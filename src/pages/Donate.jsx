import { useState } from "react";
import axios from "axios";

const Donate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    donationType: "Zakat",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create Razorpay order
      const orderRes = await axios.post("https://masjid-backend-rt9x.onrender.com/api/donations/create-order", {
        amount: Number(form.amount),
      });

      const { order } = orderRes.data;

      // Step 2: Open Razorpay
      const options = {
        key: "rzp_live_c4uFpJDvKhra3y", // ✅ Your Razorpay live key
        amount: Number(form.amount) * 100,
        currency: "INR",
        name: "Masjid Shareef",
        description: `Donation for ${form.donationType}`,
        order_id: order.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        handler: async function (response) {
          try {
            const res = await axios.post("https://masjid-backend-rt9x.onrender.com/api/donations/verify", {
              ...form,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            alert(
              `✅ Donation Successful!\n\n🧾 Name: ${form.name}\n💸 ₹${form.amount} - ${form.donationType}\n📤 Please send this screenshot to: 6005221991`
            );

            setForm({
              name: "",
              email: "",
              phone: "",
              amount: "",
              donationType: "Zakat",
            });
          } catch (err) {
            alert("❌ Payment was successful but storing failed.");
          }
        },
        theme: {
          color: "#0f172a",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Donation Error:", err);
      alert("❌ Something went wrong while donating.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleDonate}
        className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">🕌 Donate to the Masjid</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email (optional)"
          className="w-full border p-2 rounded"
        />

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number (optional)"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount (₹)"
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="donationType"
          value={form.donationType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Zakat">Zakat</option>
          <option value="Masjid Repair">Masjid Repair</option>
          <option value="Fitrah">Fitrah</option>
          <option value="Charity">General Charity</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default Donate;
