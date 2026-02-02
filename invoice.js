/* ==============================
   INVOICE MODULE – BAPPATHOTA
   ============================== */

async function invoice(bookingId) {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const b = data.find(x => x.booking_id === bookingId);
    if (!b) {
      alert("Booking not found");
      return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    /* HEADER */
    pdf.setFontSize(18);
    pdf.text("BappaThota Homestay", 20, 20);

    pdf.setFontSize(11);
    pdf.text("Booking Invoice", 20, 30);

    pdf.line(20, 33, 190, 33);

    /* BODY */
    let y = 45;
    pdf.text(`Guest Name : ${b.guest_name}`, 20, y); y += 8;
    pdf.text(`Phone      : ${b.phone || "-"}`, 20, y); y += 8;
    pdf.text(`Room No    : ${b.room_no}`, 20, y); y += 8;
    pdf.text(`Guests     : ${b.no_of_guests}`, 20, y); y += 8;
    pdf.text(`Check-in   : ${formatDate(b.check_in)}`, 20, y); y += 8;
    pdf.text(`Check-out  : ${formatDate(b.check_out)}`, 20, y); y += 12;

    pdf.line(20, y, 190, y);
    y += 10;

    /* FOOTER */
    pdf.setFontSize(10);
    pdf.text("Thank you for choosing BappaThota Homestay", 20, y);
    y += 8;
    pdf.text("Contact: +91-XXXXXXXXXX", 20, y);

    /* SAVE */
    const fileName = `Invoice_${b.guest_name}_${b.booking_id.slice(0,6)}.pdf`;
    pdf.save(fileName);

  } catch (err) {
    console.error(err);
    alert("Failed to generate invoice");
  }
}

/* Date formatter (shared-safe) */
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
