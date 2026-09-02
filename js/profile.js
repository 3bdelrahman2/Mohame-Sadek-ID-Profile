document.addEventListener("DOMContentLoaded", async () => {
  const nameEl = document.getElementById("clientName");
  const descEl = document.getElementById("clientDescription");

  try {
    // NOTE: this fetch requires the page to be served over http(s)
    // (e.g. GitHub Pages, Netlify, any real host). Opening index.html
    // directly from the file system will fail due to browser CORS
    // restrictions on local file:// requests.
    const response = await fetch("data/client.json");

    if (!response.ok) {
      throw new Error(`Failed to load client data (status ${response.status})`);
    }

    const client = await response.json();

    // Basic information
    nameEl.textContent = client.name || "—";
    descEl.textContent = client.description || "";

    document.getElementById("phoneNumber").textContent = client.phone || "—";
    document.getElementById("whatsappNumber").textContent =
      client.whatsapp || "—";
    document.getElementById("emailAddress").textContent = client.email || "—";

    // Profile image (falls back to whatever is already in the src attribute
    // if not provided, instead of pointing at "undefined")
    if (client.image) {
      document.getElementById("profileImage").src = client.image;
    }

    // Phone
    if (client.phone) {
      document.getElementById("phoneLink").href =
        `tel:${client.phone.replace(/[^\d+]/g, "")}`;
    }

    // WhatsApp — strip everything except digits (wa.me does not accept "+" or dashes)
    if (client.whatsapp) {
      const whatsappNumber = client.whatsapp.replace(/\D/g, "");
      document.getElementById("whatsappLink").href =
        `https://wa.me/${whatsappNumber}`;
    }

    // Email
    if (client.email) {
      document.getElementById("emailLink").href = `mailto:${client.email}`;
    }
  } catch (error) {
    console.error("Error loading profile:", error);

    // Show the visitor something instead of leaving "جاري التحميل..." forever
    nameEl.textContent = "تعذر تحميل البيانات";
    nameEl.classList.add("error-state");
    descEl.textContent = "يرجى إعادة تحميل الصفحة أو المحاولة لاحقًا.";
  }
});
