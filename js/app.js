const scriptURL =
  "https://script.google.com/macros/s/AKfycbz9HvEll1Xkl9KMQAlA3jdhOU5uNV5BiaVU6G7RqerqsQiosek7t5-nqxWv00o-A26b/exec";

const form = document.getElementById("curhatForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");
const notif = document.getElementById("notif");
const textarea = form.querySelector("textarea");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Tombol loading
  submitBtn.disabled = true;
  btnText.textContent = "Mengirim...";
  spinner.classList.remove("hidden");

  const formData = new FormData(form);

  fetch(scriptURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      textarea.value = "";
      notif.classList.remove("hidden");
      submitBtn.disabled = false;
      btnText.textContent = "Kirim Curhatan";
      spinner.classList.add("hidden");

      ambilPesan();

      setTimeout(() => {
        notif.classList.add("hidden");
      }, 3000);
    })
    .catch((error) => {
      alert("Gagal mengirim curhatan.");
      submitBtn.disabled = false;
      btnText.textContent = "Kirim Curhatan";
      spinner.classList.add("hidden");
      console.error("Error!", error.message);
    });
});

function ambilPesan() {
  fetch(scriptURL)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("listPesan");
      container.innerHTML = "";

      // Ambil 10 pesan terakhir
      data
        .slice(-10)
        .reverse()
        .forEach((item) => {
          const el = document.createElement("div");
          el.className =
            "bg-white bg-opacity-80 p-3 rounded-lg shadow border-l-4 border-purple-400";
          el.innerHTML = `
                <div class="text-xs text-gray-500 mb-1">${item.waktu}</div>
                <div>${item.pesan}</div>
              `;
          container.appendChild(el);
        });
    })
    .catch((error) => {
      console.error("Error fetching messages:", error);
    });
}

ambilPesan();
setInterval(ambilPesan, 5000);
