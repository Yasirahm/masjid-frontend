import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return navigate("/");
    setUser(storedUser);
  }, []);

  const handleRazorpayPayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      Swal.fire("Invalid Amount", "Please enter a valid amount", "error");
      return;
    }

    const options = {
      key: "rzp_live_c4uFpJDvKhra3y",
      amount: Number(paymentAmount) * 100,
      currency: "INR",
      name: "Masjid Shareef",
      description: "Donation / Dues Payment",
      handler: async function (response) {
        try {
          const res = await axios.post(
            `https://masjid-backend-rt9x.onrender.com/api/users/pay/${user._id}`,
            {
              amount: Number(paymentAmount),
              razorpayId: response.razorpay_payment_id,
            }
          );

          setUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setPaymentAmount("");

          Swal.fire({
            icon: "success",
            title: "✅ Payment Successful!",
            html: `
              <div class="text-left">
                <b>🧾 Name:</b> ${res.data.user.name}<br/>
                <b>📧 Email:</b> ${res.data.user.email}<br/>
                <b>📱 Phone:</b> ${res.data.user.phone}<br/>
                <b>💸 Paid:</b> ₹${paymentAmount}<br/><br/>
                <b>📤 Kindly send a screenshot of this payment</b><br/>
                to <b>WhatsApp: 6005221991</b> for records.
              </div>
            `,
            confirmButtonText: "Done",
          });
        } catch (err) {
          Swal.fire("Error", "Payment failed to update on server.", "error");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: {
        color: "#38a169",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!user)
    return (
      <div className="p-10 flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );

  return (
  <div className="min-h-screen w-screen bg-gradient-to-r from-green-100 via-white to-blue-100 py-8 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-green-700">
        Welcome, {user.name} <br />
        <span className="text-xl text-gray-600 font-medium">(خوش آمدید)</span>
      </h2>

      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <p><strong>Email:</strong> {user.email} <br /> <span className="text-sm text-gray-500">ای میل</span></p>
        <p><strong>Phone:</strong> {user.phone} <br /> <span className="text-sm text-gray-500">فون نمبر</span></p>
        <p><strong>Family Members:</strong> {user.familyMembers} <br /> <span className="text-sm text-gray-500">افرادِ خانہ</span></p>
        <p><strong>Total Due:</strong> ₹{user.totalAmount} <br /> <span className="text-sm text-gray-500">کل واجب الادا</span></p>
        <p><strong>Paid:</strong> ₹{user.paidAmount} <br /> <span className="text-sm text-gray-500">ادا کردہ</span></p>
        <p><strong>Remaining:</strong> ₹{user.remainingAmount} <br /> <span className="text-sm text-gray-500">باقی رقم</span></p>
      </div>

      <div className="space-y-3">
        <input
          type="number"
          placeholder="Enter amount to pay / ادائیگی کی رقم درج کریں"
          className="w-full p-3 border rounded-lg"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
        <button
          onClick={handleRazorpayPayment}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Pay Now / ابھی ادائیگی کریں
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-700 mb-2">📜 Payment History / ادائیگی کی تفصیل</h3>
        {user.paymentHistory && user.paymentHistory.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-black text-sm">
            {user.paymentHistory.map((entry, i) => (
              <li key={i}>
                ₹{entry.amount} —{" "}
                {new Date(entry.date).toLocaleString("en-IN", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}{" "}
                {entry.razorpayId ? ` (ID: ${entry.razorpayId})` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800">No payments yet. / ابھی تک کوئی ادائیگی نہیں ہوئی</p>
        )}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
        className="text-red-500 underline w-full text-center pt-4"
      >
        Logout / لاگ آؤٹ
      </button>
    </div>
  </div>
);
  }

export default UserDashboard;
