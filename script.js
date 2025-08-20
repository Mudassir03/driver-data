const scriptURL = "https://script.google.com/macros/s/AKfycbztf3qKhzIGAugO-_vrSrEfj03fra5Jrl_krY1ADjwujcr-Dd1G39sUIcEJY6a1MFPv/exec";


document.getElementById("depositForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  document.getElementById("msg").innerText = "⏳ Saving...";

  const file = document.getElementById("image").files[0];
  if (!file) {
    document.getElementById("msg").innerText = "⚠ Please upload an image";
    return;
  }

  const reader = new FileReader();
  reader.onloadend = async function() {
    const data = {
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      aadhar: document.getElementById("aadhar").value,
      deposit: document.getElementById("deposit").value,
      image: reader.result   // Base64 string
    };

    try {
      let res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      let result = await res.json();

      if (result.status === "exists") {
        document.getElementById("msg").innerText = "❌ User already exists!";
      } else if (result.status === "success") {
        document.getElementById("msg").innerText = "✅ Saved successfully!";
        document.getElementById("depositForm").reset();
      } else {
        document.getElementById("msg").innerText = "⚠ Error: " + (result.message || "Unknown");
      }
    } catch (err) {
      document.getElementById("msg").innerText = "⚠ Network Error: " + err.message;
    }
  };
  reader.readAsDataURL(file);
});
