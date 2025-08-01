document.addEventListener("DOMContentLoaded", () => {
  const curhatForm = document.getElementById("curhat-form");
  const curhatInput = document.getElementById("curhat-input");

  // Ganti dengan URL Web App yang sudah Anda deploy
  const API_URL =
    "https://script.google.com/macros/s/AKfycbzTsNCxgMcJh9ePXoA6-svNfmhNyWbnGccYrKGijbghQuH2Cg4UPcy8w__r55V2voyATA/exec";

  // Event listener saat formulir dikirim
  curhatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const curhatanText = curhatInput.value.trim();

    if (curhatanText !== "") {
      try {
        const submitButton = curhatForm.querySelector('button[type="submit"]');
        submitButton.textContent = "Mengirim...";
        submitButton.disabled = true;

        // Menggunakan FormData untuk pengiriman data yang lebih stabil
        const formData = new FormData();
        formData.append("curhatan", curhatanText);

        const response = await fetch(API_URL, {
          method: "POST",
          body: formData,
        });

        // Pastikan respons berhasil (kode 200)
        if (response.ok) {
          alert("Curhatan berhasil dikirim! Terima kasih.");
          curhatInput.value = "";
        } else {
          alert("Gagal mengirim curhatan. Kode kesalahan: " + response.status);
          console.error("Kesalahan API:", await response.text());
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan. Coba lagi nanti. (Detail di console)");
      } finally {
        const submitButton = curhatForm.querySelector('button[type="submit"]');
        submitButton.textContent = "Kirim";
        submitButton.disabled = false;
      }
    }
  });
});
